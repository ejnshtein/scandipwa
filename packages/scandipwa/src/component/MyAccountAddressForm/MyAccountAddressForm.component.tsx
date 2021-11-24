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
import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FieldValue, FormExternalProps } from 'Component/PureForm/Form';
import { AddressType } from 'Type/Account';
import { RegionType } from 'Type/Config';
import { CountryOption } from 'Util/Store/Transform';

import { myAccountAddressForm } from './MyAccountAddressForm.form';

export interface MyAccountAddressFormProps extends FormExternalProps {
    address: AddressType
    countries: CountryOption[]
    defaultCountry?: string
    addressLinesQty: number
    showVatNumber: boolean
    regionDisplayAll: boolean

    countryId: string

    availableRegions: RegionType[]
    isStateRequired: boolean
    getCountry: (country?: string) => CountryOption | undefined
    onCountryChange: (field: FieldValue) => void
    onZipcodeBlur: (field: FieldValue) => void
}

/** @namespace Component/MyAccountAddressForm/Component */
export class MyAccountAddressFormComponent extends FieldFormComponent<MyAccountAddressFormProps> {
    // #region GETTERS
    get fieldMap(): FieldSection[] {
        return myAccountAddressForm(this.props);
    }

    // getFormProps(): FormExternalProps {
    //     const { onSubmit } = this.props;
    //     return {
    //         ...super.getFormProps(),
    //         onSubmit: this.onSubmit.bind(this)
    //     };
    // }

    // #endregion

    // #region RENDERERS
    renderActions(): JSX.Element {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mix={ { block: 'MyAccount', elem: 'Button' } }
              mods={ { isHollow: true } }
            >
                { __('Save address') }
            </button>
        );
    }
    // #endregion
}
