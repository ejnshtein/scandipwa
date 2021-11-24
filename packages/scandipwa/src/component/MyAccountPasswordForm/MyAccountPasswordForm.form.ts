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
import { FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

/**
 * Returns password-change fields
 * @namespace Component/MyAccountPasswordForm/Form/myAccountPasswordForm
 */
export const myAccountPasswordForm = (): FieldSection[] => [
    {
        label: __('Current password'),
        type: FIELD_TYPE.password,
        attr: {
            id: 'my-account-currentPassword',
            name: 'currentPassword',
            placeholder: __('Your current password'),
            'aria-label': __('Current password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.password,
            isRequired: true
        }
    },
    {
        label: __('New password'),
        type: FIELD_TYPE.password,
        attr: {
            id: 'my-account-newPassword',
            name: 'newPassword',
            placeholder: __('Your new password'),
            'aria-label': __('New password')
        },
        addRequiredTag: true,
        validateOn: ['onChange'],
        validationRule: {
            inputType: VALIDATION_INPUT_TYPE.password,
            isRequired: true,
            match: (value) => {
                const password = document.getElementById('my-account-currentPassword') as HTMLInputElement;
                return Boolean(value && password?.value !== value);
            },
            customErrorMessages: {
                onMatchFail: __('New passwords can\'t be the same as old password!')
            },
            range: {
                min: 8
            }
        }
    }
];
