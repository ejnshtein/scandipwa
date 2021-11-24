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

import { CheckoutGuestFormProps } from './CheckoutGuestForm.component';

export interface CheckoutGuestFormOptions {
    emailValue: CheckoutGuestFormProps['emailValue']
    isCreateUser: boolean
    handleEmailInput: CheckoutGuestFormProps['handleEmailInput']
    handlePasswordInput: CheckoutGuestFormProps['handlePasswordInput']
}

/**
 * Form for guest checkout
 * @namespace Component/CheckoutGuestForm/Form/checkoutGuestForm
 */
export const checkoutGuestForm = (
    {
        emailValue,
        isCreateUser,
        handleEmailInput,
        handlePasswordInput
    }: CheckoutGuestFormOptions
): FieldSection[] => {
    const formFields: FieldSection[] = [
        {
            type: FIELD_TYPE.email,
            // label: __('Email'),
            attr: {
                name: 'guest_email',
                placeholder: __('Your email'),
                defaultValue: emailValue,
                'aria-label': __('Your email')
            },
            events: {
                onChange: handleEmailInput
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.email,
                isRequired: true
            }
        }
    ];

    if (isCreateUser) {
        formFields.push({
            type: FIELD_TYPE.password,
            // label: __('Create Password'),
            attr: {
                name: 'guest_password',
                placeholder: __('Create Password'),
                'aria-label': __('Create Password')
            },
            addRequiredTag: true,
            events: {
                onChange: handlePasswordInput
            },
            validateOn: ['onChange'],
            validationRule: {
                inputType: VALIDATION_INPUT_TYPE.password,
                isRequired: true
            }
        });
    }

    return formFields;
};

export default checkoutGuestForm;
