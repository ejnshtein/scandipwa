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

import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FormExternalProps } from 'Component/PureForm/Form';
import { CustomerType } from 'Type/Account';

import { myAccountCustomerForm } from './MyAccountCustomerForm.form';

export interface MyAccountCustomerFormProps extends FormExternalProps {
    showTaxVatNumber: boolean
    customer: CustomerType
}

/** @namespace Component/MyAccountCustomerForm/Component */
export class MyAccountCustomerFormComponent extends FieldFormComponent<MyAccountCustomerFormProps> {
    get fieldMap(): FieldSection[] {
        return myAccountCustomerForm(this.props);
    }

    renderActions(): JSX.Element {
        return (
            <button
              type="submit"
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
            >
                { __('Save customer') }
            </button>
        );
    }
}
