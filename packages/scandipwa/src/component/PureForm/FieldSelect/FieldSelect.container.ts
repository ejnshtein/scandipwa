/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { useCallback, useRef, useState } from 'react';

import {
    ALPHABET,
    SpecialKeys,
    UPPER_CASE_ALPHABET
} from 'Component/PureForm/Field/Keyboard.config';
import { useFormContext } from 'Store/Form/Form.context';
import { renderHOC } from 'Util/RenderHOC';

import { FormFieldAttribute } from '../Field/Field.component';
import { FIELD_TYPE } from '../Field/Field.config';
import { FieldSelectComponent, FieldSelectOption, FieldSelectProps } from './FieldSelect.component';

export type { FieldSelectOption } from './FieldSelect.component';

export interface FieldSelectExternalProps extends Pick<
    FieldSelectProps,
    'attr' | 'options' | 'isDisabled' // | 'selectRef'
> {
    events?: Record<string, (e: any) => void>
    onChange?: (value: string) => void
}

/** @namespace Component/PureForm/FieldSelect/Container/getSelectOptions */
export const getSelectOptions = (
    options: FieldSelectOption[],
    {
        id = 'select',
        selectPlaceholder = __('Select item...')
    }: Partial<FormFieldAttribute> = {}
): FieldSelectOption[] => [
    {
        id: `${id}-placeholder`,
        label: selectPlaceholder,
        value: '',
        sortOrder: -100,
        isPlaceholder: true
    },
    ...options
];

/** @namespace Component/PureForm/FieldSelect/Container/getSelectedValueIndex */
export const getSelectedValueIndex = (
    keyCode: string,
    options: FieldSelectOption[],
    {
        searchString: prevSearchString,
        valueIndex: prevValueIndex
    }: {
        searchString: string,
        valueIndex: number
    }
): { searchString?: string, valueIndex?: number } => {
    const pressedKeyValue = keyCode.toLowerCase();

    const searchString = (prevSearchString[prevSearchString.length - 1] !== pressedKeyValue)
        ? `${prevSearchString}${pressedKeyValue}`
        : pressedKeyValue;

    const nextValueIndex = options.findIndex(({ label }, i) => (
        label && label.toLowerCase().startsWith(searchString) && (
            i > prevValueIndex || prevSearchString !== searchString
        )
    ));

    if (nextValueIndex !== -1) {
        return { searchString, valueIndex: nextValueIndex };
    }

    // if no items were found, take only the latest letter of the search string
    const newSearchString = searchString[searchString.length - 1];

    const newValueIndex = options.findIndex(({ label }) => (
        label && label.toLowerCase().startsWith(newSearchString)
    ));

    if (newValueIndex !== -1) {
        return { searchString: newSearchString, valueIndex: newValueIndex };
    }

    // if there are no items starting with this letter
    return {};
};

/** @namespace Component/PureForm/FieldSelect/Container/fieldSelectLogic */
export const fieldSelectLogic = (props: FieldSelectExternalProps): FieldSelectProps => {
    const {
        attr,
        attr: {
            name
        },
        events = {},
        isDisabled,
        options,
        onChange
    } = props;

    const {
        formValues,
        handleFormChange
    } = useFormContext();

    const [isExpanded, setIsExpanded] = useState(false);
    const [valueIndex, setValueIndex] = useState(-1);
    const [searchString, setSearchString] = useState('');

    const selectRef = useRef<HTMLSelectElement>(null);

    const isSelectDisabled = options.length === 0;

    const handleSelectExpand = useCallback(() => {
        if (!isSelectDisabled) {
            setIsExpanded(!isExpanded);
        }
    }, [isExpanded]);

    const handleSelectExpandedExpand = useCallback(() => {
        if (isExpanded) {
            handleSelectExpand();
        }
    }, [isExpanded]);

    const handleSelectListOptionClick = useCallback((option: FieldSelectOption): void => {
        if (selectRef.current) {
            selectRef.current.value = option.value;
        }

        handleFormChange({
            name,
            type: FIELD_TYPE.select,
            // validate
            value: option.value
        });

        if (onChange) {
            onChange(option.value);
        }
    }, [selectRef.current, events]);

    const handleSelectListKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        const { key: keyCode } = event;

        // on Enter pressed
        if (keyCode === SpecialKeys.ENTER) {
            handleSelectExpand();

            return;
        }

        if (!isExpanded
            || !keyCode
            || ALPHABET.includes(keyCode)
            || UPPER_CASE_ALPHABET.includes(keyCode)
        ) {
            return;
        }

        const {
            searchString: nextSearchString,
            valueIndex: nextValueIndex
        } = getSelectedValueIndex(keyCode, options, {
            searchString,
            valueIndex
        });

        // valueIndex can be 0, so !valueIndex === true
        if (!nextSearchString || nextValueIndex === undefined) {
            return;
        }

        setSearchString(nextSearchString);
        setValueIndex(nextValueIndex);

        const { id, value } = options[valueIndex];

        handleFormChange({
            name,
            type: FIELD_TYPE.select,
            // validate
            value
        });

        // converting to string for avoiding the error with the first select option
        if (onChange && value) {
            onChange(value);
        }

        const selectedElement = document.getElementById(`o${id}`);

        if (selectedElement) {
            selectedElement.focus();
        }
    }, []);

    return {
        attr,
        events,
        options: getSelectOptions(options, attr),
        isExpanded,
        // selectRef,
        value: formValues[name] as string,
        isDisabled,
        handleSelectExpand,
        handleSelectExpandedExpand,
        handleSelectListOptionClick,
        handleSelectListKeyDown
    };
};

export const FieldSelect = renderHOC(FieldSelectComponent, fieldSelectLogic, 'FieldSelectContainer');
