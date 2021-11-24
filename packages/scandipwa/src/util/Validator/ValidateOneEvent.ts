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

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';

import { ValidationData } from './type';
import { ValidationResult } from './Validator';

/** @namespace Util/Validator/ValidateOneEvent/validateOnEvent */
export const validateOnEvent = (
    hook: (...hookArgs: any[]) => void,
    validate: (data?: ValidationData) => boolean | ValidationResult,
    formRef: HTMLElement | null,
    {
        attr,
        type
    }: {
        attr: Record<string, string>,
        type: FIELD_TYPE
    }
) => (): void => {
    if (hook) {
        const { value } = formRef as unknown as { value: string } || {};
        hook(...[{
            ...attr, formRef, value, type
        }]);
    }
    validate();
};
