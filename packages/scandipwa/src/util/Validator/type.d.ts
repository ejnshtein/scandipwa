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

import { VALIDATION_INPUT_TYPE } from './Config';
import { ValidationResult } from './Validator';

export interface ValidationRule {
    isRequired?: boolean
    inputType?: keyof VALIDATION_INPUT_TYPE
    match?: ((value?: string | boolean | { name: string; value: string | boolean, type: string }[]) => boolean) | RegExp
    range?: {
        min: number
        max?: number
    }
    customErrorMessages?: {
        onRequirementFail?: string
        onInputTypeFail?: string
        onMatchFail?: string
        onRangeFailMin?: string
        onRangeFailMax?: string
        onGroupFail?: string
    }
    selector?: string
}

export interface ValidationData {
    errors: {
        name: string
        value: string
        type: string
    }[]
    detail?: {
        errors: (ValidationResult | boolean)[]
    }
}
