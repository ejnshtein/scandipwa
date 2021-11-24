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

import { useFormContext } from 'Store/Form/Form.context';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';
import { renderHOC } from 'Util/RenderHOC';

import { FormFieldAttribute } from '../Field/Field.component';
import { FIELD_TYPE } from '../Field/Field.config';
import { FieldNumberComponent, FieldNumberProps } from './FieldNumber.component';

export interface FieldNumberExternalProps extends Partial<Pick<
    FieldNumberProps,
    'events' | 'isDisabled'
>> {
    attr: FormFieldAttribute
    onChange?: (value: number) => void
}

/** @namespace Component/PureForm/FieldNumber/Container/fieldNumberLogic */
export const fieldNumberLogic = (props: FieldNumberExternalProps): FieldNumberProps => {
    const {
        attr,
        attr: {
            name
        },
        events = {},
        isDisabled = false,
        onChange
    } = props;

    const {
        formValues,
        handleFormChange
    } = useFormContext();

    const formValue = formValues[name] as number || 0;

    const handleValueChange = (value: number): void => {
        const { min: minAttr, max: maxAttr } = attr;

        const min = typeof minAttr === 'number' ? minAttr : 0;
        const max = typeof maxAttr === 'number' ? maxAttr : DEFAULT_MAX_PRODUCTS;

        // eslint-disable-next-line no-nested-ternary
        const rangedValue = value < min
            ? min
            : value > max
                ? max
                : value;

        if (typeof onChange === 'function') {
            onChange(rangedValue);
        }

        handleFormChange({
            name,
            type: FIELD_TYPE.number,
            value: rangedValue
        });
    };

    return {
        attr,
        events,
        handleValueChange,
        isDisabled,
        value: formValue
    };
};

export const FieldNumber = renderHOC(FieldNumberComponent, fieldNumberLogic, 'FieldNumberContainer');
