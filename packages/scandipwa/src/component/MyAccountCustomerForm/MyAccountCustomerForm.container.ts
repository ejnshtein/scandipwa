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

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { SHOW_VAT_NUMBER_REQUIRED } from 'Component/MyAccountCreateAccount/MyAccountCreateAccount.config';
import { FormExternalProps } from 'Component/PureForm/Form';
import { CustomerType } from 'Type/Account';
import transformToNameValuePair from 'Util/Form/Transform';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { MyAccountCustomerFormComponent, MyAccountCustomerFormProps } from './MyAccountCustomerForm.component';

/** @namespace Component/MyAccountCustomerForm/Container/myAccountCustomerFormSelector */
export const myAccountCustomerFormSelector = (state: RootState) => ({
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number as string
});

export interface MyAccountCustomerFormExternalProps {
    customer: CustomerType
    onSave: (...args: any[]) => void
}

/** @namespace Component/MyAccountCustomerForm/Container/myAccountCustomerFormLogic */
export const myAccountCustomerFormLogic = (props: MyAccountCustomerFormExternalProps): MyAccountCustomerFormProps => {
    const {
        customer,
        onSave
    } = props;
    const { showTaxVatNumber } = useSelector(myAccountCustomerFormSelector);

    const onFormSuccess = useCallback<FormExternalProps['onSubmit']>((_form, fields) => {
        onSave(transformToNameValuePair(fields));
    }, [onSave]);

    return {
        attr: {
            name: 'customerForm'
        },
        customer,
        showTaxVatNumber: showTaxVatNumber === SHOW_VAT_NUMBER_REQUIRED,
        onSubmit: onFormSuccess
    };
};

export const MyAccountCustomerForm = renderHOC(
    MyAccountCustomerFormComponent,
    myAccountCustomerFormLogic,
    'MyAccountCustomerFormContainer'
);
