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

import { useCallback, useRef } from 'react';
import { useFormValidation } from 'src/hooks/use-form-validation';

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { useFormContext } from 'Store/Form/Form.context';
import { renderHOC } from 'Util/RenderHOC';
import { validateGroup, ValidationData, ValidationRule } from 'Util/Validator';

import { FormFieldAttribute } from '../Field/Field.component';
import { FieldGroupComponent, FieldGroupProps } from './FieldGroup.component';

export interface FieldGroupExternalProps extends Partial<Pick<
    FieldGroupProps,
   'events' | 'label' |'subLabel' | 'mods' | 'showErrorAsLabel'
>> {
    attr: FormFieldAttribute
    validationRule?: ValidationRule
    validateOn?: string[]
}

/** @namespace Component/PureForm/FieldGroup/Container/fieldGroupLogic */
export const fieldGroupLogic = (props: FieldGroupExternalProps): FieldGroupProps => {
    const {
        attr,
        events = {},
        label = '',
        subLabel = '',
        mods = {},
        showErrorAsLabel = true,
        validateOn = [],
        validationRule
    } = props;

    const groupRef = useRef<HTMLDivElement>(null);

    const {
        isValid,
        errorMessages
    } = useFormContext();

    const validate = useCallback((data?: ValidationData) => {
        const output = validateGroup(groupRef.current, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
            // eslint-disable-next-line no-param-reassign
            data.detail.errors = data.detail.errors || [];
            data.detail.errors.push(output);
        }

        return output;
    }, []);

    // const surroundEvent = (hook: (...hookArks: any[]) => void, ...args: any[]) => {
    //     const fields = getFieldsData(
    //         groupRef,
    //         false,
    //         [FIELD_TYPE.number, FIELD_TYPE.button]
    //     );

    //     hook(...[...args, { ...attr, formRef: groupRef, fields }]);
    // };

    // const validateOnEvent = (hook: (...hookArgs: any[]) => void, ...args: any[]) => {
    //     validate();

    //     if (typeof hook === 'function') {
    //         surroundEvent(hook, ...args);
    //     }
    // };

    // useEffect(() => {
    //     if (validationRule && Object.keys(validationRule).length > 0) {
    //         groupRef.current?.removeEventListener('validate', validate);
    //         groupRef.current?.addEventListener('validate', validate);
    //     }

    //     return () => {
    //         groupRef.current?.removeEventListener('validate', validate);
    //     };
    // }, [groupRef, validationRule]);

    // const newEvents: Record<string, () => void> = {};
    // Object.keys(events).forEach((eventName) => {
    //     const { [eventName]: event } = events;
    //     newEvents[eventName] = () => surroundEvent(event);
    // });

    // validateOn.forEach((eventName) => {
    //     const { [eventName]: baseEvent } = events;
    //     newEvents[eventName] = baseEvent
    //         ? () => validateOnEvent(baseEvent)
    //         : validate;
    // });

    const { events: newEvents } = useFormValidation({
        attr,
        events,
        validate,
        getFieldsDataArguments: {
            excludeEmpty: false,
            ignoreTypes: [FIELD_TYPE.number, FIELD_TYPE.button]
        },
        ref: groupRef,
        validateOn,
        validationRule
    });

    return {
        attr,
        events: newEvents,
        groupRef,
        label,
        mods,
        showErrorAsLabel,
        subLabel,
        isValid,
        errorMessages
    };
};

export const FieldGroup = renderHOC(FieldGroupComponent, fieldGroupLogic, 'FieldGroupContainer');
