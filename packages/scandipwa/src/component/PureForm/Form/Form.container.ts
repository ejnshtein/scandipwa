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

import {
    useCallback, useRef,
    useState
} from 'react';
import { useFormValidation } from 'src/hooks/use-form-validation';

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { FormContextType } from 'Store/Form/Form.context';
import getFieldsData from 'Util/Form/Extract';
import { renderHOC } from 'Util/RenderHOC';
import {
    validateGroup, ValidationData, ValidationResult, ValidationRule
} from 'Util/Validator';

import { FormFieldAttribute } from '../Field/Field.component';
import { FormComponent, FormProps } from './Form.component';

export interface FieldValue {
    name: string
    type: FIELD_TYPE
    value: string | number
}

/**
 * TODO use object of values when submitting fields
 */
export interface FormExternalProps extends Partial<Pick<
    FormProps,
    'events' | 'label' | 'mix' | 'showErrorAsLabel' | 'subLabel'
>> {
    attr: FormFieldAttribute
    returnAsObject?: boolean
    validationRule?: ValidationRule
    validateOn?: string[]
    onError?: (
        formRef: HTMLFormElement | null,
        fields: FieldValue[],
        isValid: ReturnType<typeof validateGroup>
    ) => void
    onSubmit: (
        formRef: HTMLFormElement | null,
        fields: FieldValue[]
    ) => void
}

/** @namespace Component/PureForm/Form/Container/formLogic */
export const formLogic = (props: FormExternalProps): FormProps => {
    const {
        validateOn = [],
        attr,
        events = {},
        label = '',
        mix = {},
        returnAsObject = false,
        showErrorAsLabel = true,
        subLabel = '',
        validationRule,
        onError = null,
        onSubmit
    } = props;

    // const [validationResponse, setValidationResponse] = useState<ValidationResult | boolean | undefined>(undefined);
    const [formValues, setFormValues] = useState<Record<string, unknown>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const validate = useCallback((data?: ValidationData): boolean | ValidationResult => {
        const output = validateGroup(formRef.current, validationRule);

        // If validation is called from different object you can pass object
        // to store validation error values
        if (data && data.detail && output !== true) {
            // eslint-disable-next-line no-param-reassign
            data.detail.errors = data.detail.errors || [];
            data.detail.errors.push(output);
        }

        return output;
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields = getFieldsData(
            formRef.current,
            false,
            [FIELD_TYPE.number, FIELD_TYPE.button],
            returnAsObject
        );
        const isValid = validateGroup(formRef.current);

        if (isValid !== true) {
            if (typeof onError === 'function') {
                onError(formRef.current, fields, isValid);
            }

            return;
        }

        if (typeof onSubmit === 'function') {
            onSubmit(formRef.current, fields);
        }
    };

    // const surroundEvent = (hook: (...hookArks: any[]) => void, ...args: any[]) => {
    //     const fields = getFieldsData(
    //         formRef,
    //         false,
    //         [FIELD_TYPE.number, FIELD_TYPE.button],
    //         returnAsObject
    //     );

    //     hook(...[...args, { ...attr, formRef, fields }]);
    // };

    // const validateOnEvent = (hook: (...hookArgs: any[]) => void, ...args: any[]) => {
    //     validate();

    //     if (typeof hook === 'function') {
    //         surroundEvent(hook, ...args);
    //     }
    // };

    const handleFormChange: FormContextType['handleFormChange'] = (options) => {
        /**
         * TODO add validation here, some checks
         */
        setFormValues({
            ...formValues,
            [options.name]: options.value
        });
    };

    // useEffect(() => {
    //     if (validationRule && Object.keys(validationRule).length > 0) {
    //         formRef.current?.removeEventListener('validate', validate);
    //         formRef.current?.addEventListener('validate', validate);
    //     }

    //     return () => {
    //         formRef.current?.removeEventListener('validate', validate);
    //     };
    // }, [formRef, validationRule]);

    // const newEvents: Record<string, (e: unknown) => void> = {};
    // Object.keys(events).forEach((eventName) => {
    //     const { [eventName]: event } = events;
    //     newEvents[eventName] = () => surroundEvent(event);
    // });

    // // Surrounds events with validation
    // validateOn.forEach((eventName) => {
    //     const { [eventName]: baseEvent } = events;
    //     newEvents[eventName] = baseEvent
    //         ? () => validateOnEvent(baseEvent)
    //         : (e) => validate(e as any);
    // });

    const {
        events: newEvents,
        validationResponse
    } = useFormValidation({
        ref: formRef,
        attr,
        events,
        getFieldsDataArguments: {
            excludeEmpty: false,
            ignoreTypes: [FIELD_TYPE.number, FIELD_TYPE.button],
            asObject: returnAsObject
        },
        validateOn,
        validationRule,
        validate
    });

    const isValid = validationResponse === true;

    const errorMessages = typeof validationResponse !== 'boolean'
        ? validationResponse?.errorMessages
        : undefined;

    return {
        attr,
        showErrorAsLabel,
        label,
        formRef,
        subLabel,
        mix,
        events: {
            ...newEvents,
            onSubmit: handleSubmit
        },
        handleFormChange,
        formValues,
        isValid,
        errorMessages
    };
};

export const Form = renderHOC(FormComponent, formLogic, 'FormContainer');
