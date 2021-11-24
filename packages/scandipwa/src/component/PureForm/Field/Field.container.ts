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

import { ChangeEvent } from 'react';

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { useFormContext } from 'Store/Form/Form.context';
import { renderHOC } from 'Util/RenderHOC';
import { ValidationRule } from 'Util/Validator';

import { FieldComponent, FieldProps, FormFieldAttribute } from './Field.component';

export interface FieldPickProps {
    type: unknown
    events: unknown
    mix: unknown
    options: unknown
    showErrorAsLabel: unknown
    isDisabled: unknown
    addRequiredTag: unknown
    label: unknown
    subLabel: unknown
}

export interface FieldExternalProps extends Partial<
    Pick<
        FieldProps,
        keyof FieldPickProps
    >
> {
    attr: FormFieldAttribute
    validationRule?: ValidationRule
    validateOn?: string[]
}

/** @namespace Component/PureForm/Field/Container/fieldLogic */
export const fieldLogic = (props: FieldExternalProps): FieldProps => {
    const {
        type = FIELD_TYPE.text,
        attr,
        attr: {
            name
        },
        events = {},
        mix = {},
        // validationRule,
        // validateOn = [],
        options = [],
        showErrorAsLabel = true,
        isDisabled = false,
        addRequiredTag = false,
        label = '',
        subLabel = ''
    } = props;

    // const buttonRef = useRef<HTMLButtonElement>(null);
    // const inputRef = useRef<HTMLInputElement>(null);
    // const selectRef = useRef<HTMLSelectElement>(null);
    // const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const {
        formValues,
        handleFormChange,
        isValid,
        errorMessages
    } = useFormContext();

    // const validate = useCallback((data?: ValidationData): boolean | ValidationResult => {
    //     const { name } = attr;
    //     const value = (type === FIELD_TYPE.checkbox || type === FIELD_TYPE.radio)
    //         ? !!inputRef.current?.checked
    //         : inputRef.current?.value;
    //     const response = validateParameters(value, validationRule);
    //     const output = typeof response !== 'boolean' ? { ...response, type, name } : response;

    //     // If validation is called from different object you can pass object
    //     // to store validation error values
    //     if (data && data.detail && typeof response !== 'boolean') {
    //         if (!data.detail.errors) {
    //             // eslint-disable-next-line no-param-reassign
    //             data.detail.errors = [];
    //         }
    //         data.detail.errors.push(output);
    //     }

    //     return output;
    // }, []);

    // const validateOnEvent = (hook: (...args: any[]) => void, ...args: any[]) => {
    //     if (hook) {
    //         const value = inputRef.current?.value;
    //         hook(...[...args, {
    //             ...attr, fieldRef: inputRef.current, value, type
    //         }]);
    //     }
    //     validate();
    // };

    // useEffect(() => {
    //     if (!validationRule || Object.keys(validationRule).length === 0) {
    //         return;
    //     }
    //     inputRef.current?.addEventListener('validate', validate);
    //     buttonRef.current?.addEventListener('validate', validate);
    //     textAreaRef.current?.addEventListener('validate', validate);

    //     return () => {
    //         inputRef.current?.removeEventListener('validate', validate);
    //         buttonRef.current?.removeEventListener('validate', validate);
    //         textAreaRef.current?.removeEventListener('validate', validate);
    //     };
    // }, [validationRule]);

    // Surrounds events with validation
    // const newEvents: Record<string, (e: unknown) => void> = { ...events };
    // validateOn.forEach((eventName) => {
    //     const { [eventName]: baseEvent } = events;
    //     newEvents[eventName] = baseEvent
    //         ? () => validateOnEvent(baseEvent)
    //         : () => validate();
    // });

    // const {
    //     events: inputEvents,
    //     validationResponse: inputValidationResponse
    // } = useFormValidation({
    //     attr,
    //     events,
    //     ref: inputRef,
    //     validate,
    //     validateOn,
    //     validationRule
    // });

    // const {
    //     events: selectEvents,
    //     validationResponse: selectValidationsResponse
    // } = useFormValidation({
    //     attr,
    //     events,
    //     ref: selectRef,
    //     validate,
    //     validateOn,
    //     validationRule
    // });

    // const {
    //     events: textAreaEvents,
    //     validationResponse: textAreaValidationsResponse
    // } = useFormValidation({
    //     attr,
    //     events,
    //     ref: textAreaRef,
    //     validate,
    //     validateOn,
    //     validationRule
    // });

    // let validationResponse: boolean | ValidationResult | undefined;
    // let newEvents: Record<string, (e: unknown) => void>;

    // switch (type) {
    // case FIELD_TYPE.select: {
    //     validationResponse = textAreaValidationsResponse;
    //     newEvents = selectEvents;
    //     break;
    // }
    // case FIELD_TYPE.textarea: {
    //     validationResponse = selectValidationsResponse;
    //     newEvents = textAreaEvents;
    //     break;
    // }
    // default: {
    //     validationResponse = inputValidationResponse;
    //     newEvents = inputEvents;
    //     break;
    // }
    // }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleFormChange({
            name,
            type,
            value: e.target.value
        });
    };

    return {
        type,
        attr,
        isDisabled,
        mix,
        options,
        showErrorAsLabel,
        label,
        subLabel,
        addRequiredTag,
        events,
        // events: newEvents,
        isValid,
        errorMessages,
        value: formValues[name] as string | number,
        onChange
    };
};

export const Field = renderHOC(FieldComponent, fieldLogic, 'FieldContainer');
