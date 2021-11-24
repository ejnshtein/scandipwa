/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormExternalProps } from 'Component/PureForm/Form';
import { AddressType, TrimmedAddressType } from 'Type/Account';
import {
    getAvailableRegions as getAvailableCountryRegions,
    getCityAndRegionFromZipcode,
    trimCustomerAddress
} from 'Util/Address';
import transformToNameValuePair from 'Util/Form/Transform';
import { renderHOC } from 'Util/RenderHOC';
import transformCountriesToOptions from 'Util/Store/Transform';
import { RootState } from 'Util/Store/type';

import {
    MyAccountAddressFormComponent,
    MyAccountAddressFormProps
} from './MyAccountAddressForm.component';

/** @namespace Component/MyAccountAddressForm/Container/myAccountAddressFormSelector */
export const myAccountAddressFormSelector = (state: RootState) => ({
    countries: transformCountriesToOptions(state.ConfigReducer.countries || []),
    defaultCountry: state.ConfigReducer.default_country as string,
    addressLinesQty: state.ConfigReducer.address_lines_quantity as number,
    showVatNumber: state.ConfigReducer.show_vat_number_on_storefront as boolean,
    regionDisplayAll: state.ConfigReducer.region_display_all as boolean
});

export interface MyAccountAddressFormExternalProps {
    address: AddressType
    onSave: (address: TrimmedAddressType) => void
}

/** @namespace Component/MyAccountAddressForm/Container/myAccountAddressFormLogic */
export const myAccountAddressFormLogic = (props: MyAccountAddressFormExternalProps): MyAccountAddressFormProps => {
    const { address, onSave } = props;
    const {
        addressLinesQty,
        countries,
        defaultCountry = 'US',
        regionDisplayAll,
        showVatNumber
    } = useSelector(myAccountAddressFormSelector);

    const getCountry = useCallback((countryId?: string) => {
        const { country_id: countryIdAddress } = address;
        const countryIdFixed = countryId || countryIdAddress || defaultCountry;

        return countries.find(({ value }) => value === countryIdFixed);
    }, [address, countries]);

    /**
     * Returns available regions based on country and zip
     */
    const getAvailableRegions = useCallback(async (countryId?: string, zipCode?: string) => {
        if (countryId && zipCode) {
            return getCityAndRegionFromZipcode(countryId, zipCode);
        }

        const { value: currCountryId = defaultCountry } = getCountry(countryId) || {};

        return getAvailableCountryRegions(currCountryId, countries);
    }, [getCountry, defaultCountry]);

    const [countryId, setCountryId] = useState(getCountry()?.value || 'US');
    const getInitialIsStateRequired = useCallback(() => {
        const { country_id: countryIdAddress } = address;
        const countryIdFixed = countryIdAddress || defaultCountry;

        return countries.find(({ value }) => value === countryIdFixed);
    }, [address, defaultCountry, countries]);

    const getInitialAvailableRegions = useCallback(() => {
        const { value: currCountryId = defaultCountry } = getCountry(countryId) || {};

        return getAvailableCountryRegions(currCountryId, countries);
    }, [countryId, getCountry]);
    const [availableRegions, setAvailableRegions] = useState(getInitialAvailableRegions() || []);
    const [isStateRequired, setIsStateRequired] = useState<boolean>(
        getInitialIsStateRequired()?.is_state_required || true
    );
    // #region EVENTS
    /**
     * Creates / Updates address from entered data
     */
    const onSubmit = useCallback<FormExternalProps['onSubmit']>((_form, fields) => {
        const newAddress = transformToNameValuePair<AddressType & { street?: string[] }>(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            newAddress.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if ((newAddress as unknown as Record<string, string>)[`street_${i}`]) {
                    newAddress.street.push((newAddress as unknown as Record<string, string>)[`street_${i}`]);
                }
            }
        }

        // Fixes region variable format
        const { region_id = 0, region_string: region = '', region: { region_code = '' } = {} } = newAddress;
        newAddress.region = { region_id, region, region_code };

        // Filters out non-required options and save address
        onSave(trimCustomerAddress(newAddress));
    }, []);

    const onCountryChange = useCallback((field) => {
        const country = countries.find(({ value }) => value === field);
        if (!country) {
            return;
        }
        const {
            available_regions: availableRegions = [],
            is_state_required: isStateRequired = true,
            value: countryId
        } = country;

        setAvailableRegions(availableRegions);
        setIsStateRequired(isStateRequired);
        setCountryId(countryId);
    }, [setAvailableRegions, setIsStateRequired, setCountryId, countries]);

    const onZipcodeBlur = useCallback(async (field) => {
        const { value: zipCode = '' } = field || {};
        getAvailableRegions(countryId, zipCode);
    }, [getAvailableRegions]);

    // #endregion
    return {
        attr: {
            name: 'myAccountAddressForm'
        },
        addressLinesQty,
        address,
        countries,
        defaultCountry,
        regionDisplayAll,
        showVatNumber,
        countryId,

        isStateRequired,
        availableRegions,

        getCountry,

        onZipcodeBlur,
        onCountryChange,
        onSubmit
    };
};

export const MyAccountAddressForm = renderHOC(
    MyAccountAddressFormComponent,
    myAccountAddressFormLogic,
    'MyAccountAddressFormContainer'
);
