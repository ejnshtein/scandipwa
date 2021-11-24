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

import { MyAccountCustomerFormProps } from './MyAccountCustomerForm.component';

/**
 * Returns customer forms fields
 * @namespace Component/MyAccountCustomerForm/Form/myAccountCustomerForm
 */
export const myAccountCustomerForm = (props: MyAccountCustomerFormProps): FieldSection[] => {
    const {
        customer: {
            firstname = '',
            lastname = '',
            taxvat = ''
        },
        showTaxVatNumber
    } = props;

    return [
        {
            type: FIELD_TYPE.text,
            label: __('First name'),
            attr: {
                name: 'firstname',
                defaultValue: firstname,
                placeholder: __('Your first name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        {
            type: FIELD_TYPE.text,
            label: __('Last name'),
            attr: {
                name: 'lastname',
                defaultValue: lastname,
                placeholder: __('Your last name')
            },
            addRequiredTag: true,
            validateOn: ['onChange'],
            validationRule: {
                isRequired: true
            }
        },
        ...(showTaxVatNumber ? [
            {
                type: FIELD_TYPE.text,
                label: __('Tax/VAT Number'),
                attr: {
                    name: 'taxvat',
                    defaultValue: taxvat,
                    placeholder: __('Your tax/VAT number')
                },
                addRequiredTag: true,
                validateOn: ['onChange'],
                validationRule: {
                    isRequired: true
                }
            }
        ] : [])
    ];
};
