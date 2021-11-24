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

import { useCallback, useEffect, useState } from 'react';

import { FormFieldAttribute } from 'Component/PureForm/Field/Field.component';
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import getFieldsData from 'Util/Form/Extract';
import {
    ValidationData,
    ValidationResult,
    ValidationRule
} from 'Util/Validator';

export interface FormValidationOptions {
    ref: React.RefObject<HTMLElement>
    validationRule?: ValidationRule
    validateOn: string[]
    attr: FormFieldAttribute
    events: Record<string, (e: any) => void>,
    getFieldsDataArguments?: {
        excludeEmpty: boolean
        ignoreTypes: FIELD_TYPE[]
        asObject?: boolean
    }
    validate: (data?: ValidationData) => boolean | ValidationResult
}

export interface EventHook {
    (...hookArks: any[]): void
}

export interface UseFormValidationReturnType {
    validationResponse: ValidationResult | boolean | undefined
    events: Record<string, (e: unknown) => void>
}

/** @namespace Hooks/UseFormValidation/useFormValidation */
export function useFormValidation({
    ref,
    validationRule,
    validateOn,
    attr,
    events,
    getFieldsDataArguments,
    validate
}: FormValidationOptions): UseFormValidationReturnType {
    const [validationResponse, setValidationResponse] = useState<ValidationResult | boolean | undefined>(undefined);

    const validateEvent = useCallback((data?: ValidationData) => {
        setValidationResponse(validate(data));
    }, [validate, setValidationResponse]);

    useEffect(() => {
        if (validationRule && Object.keys(validationRule).length > 0) {
            ref.current?.removeEventListener('validate', validateEvent);
            ref.current?.addEventListener('validate', validateEvent);
        }

        return () => {
            ref.current?.removeEventListener('validate', validateEvent);
        };
    }, [ref.current, validationRule]);

    const surroundEvent = useCallback((hook: EventHook, ...args: any[]) => {
        const {
            excludeEmpty,
            ignoreTypes,
            asObject = false
        } = getFieldsDataArguments || {};
        const fields = getFieldsData(
            ref.current,
            excludeEmpty,
            ignoreTypes,
            asObject
        );

        hook(...[...args, { ...attr, formRef: ref, fields }]);
    }, [getFieldsDataArguments]);

    const validateOnEvent = useCallback((hook: EventHook, ...args: any[]) => {
        validate();

        if (typeof hook === 'function') {
            surroundEvent(hook, ...args);
        }
    }, [surroundEvent, validate]);

    // Surrounds events with validation
    const wrappedEvents: Record<string, (e: unknown) => void> = {};
    Object.entries(events).forEach(([eventName, event]) => {
        wrappedEvents[eventName] = () => surroundEvent(event);
    });

    validateOn.forEach((eventName) => {
        const { [eventName]: baseEvent } = events;
        if (baseEvent) {
            wrappedEvents[eventName] = () => validateOnEvent(baseEvent);
        }
    });

    return {
        validationResponse,
        events: wrappedEvents
    };
}
