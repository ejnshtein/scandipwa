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

import { createContext, useContext } from 'react';

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';

export interface HandleFormChangeOptions<T = any> {
    name: string
    type: FIELD_TYPE
    required?: boolean
    validate?: (value: unknown) => boolean
    value?: number | string | boolean | T | T[]
}

export interface FormContextType {
    isValid: boolean
    errorMessages?: string[]
    formValues: Record<string, unknown>
    handleFormChange: (options: HandleFormChangeOptions) => void
}

export const FormContext = createContext<FormContextType>({
    isValid: true,
    formValues: {},
    handleFormChange: () => () => {}
});

/** @namespace Store/Form/Context/useFormContext */
export const useFormContext = (): FormContextType => useContext(FormContext);
