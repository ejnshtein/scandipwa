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

import { AddressType, TrimmedAddressType } from 'Type/Account';
import { CountryType, RegionType } from 'Type/Config';

/** @namespace Util/Address/Index/trimCustomerAddress */
export const trimCustomerAddress = (customerAddress: AddressType): TrimmedAddressType => {
    const {
        default_shipping = false,
        default_billing = false,
        company = null,
        city = '',
        country_id = '1',
        firstname = '',
        lastname = '',
        middlename = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code = null,
            region = null,
            region_id = 1
        } = {},
        prefix = '',
        suffix = '',
        vat_id = null
    } = customerAddress;

    return {
        company,
        default_shipping,
        default_billing,
        city,
        country_id,
        firstname,
        lastname,
        middlename,
        postcode,
        street,
        telephone,
        region: {
            region_code,
            region,
            region_id
        },
        prefix,
        suffix,
        vat_id
    };
};

/** @namespace Util/Address/Index/trimCheckoutCustomerAddress */
export const trimCheckoutCustomerAddress = (customerAddress: AddressType): Partial<TrimmedAddressType> => {
    const {
        company = null,
        city = '',
        country_id = '1',
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code = null,
            region = null,
            region_id = 1
        } = {},
        vat_id = null
    } = customerAddress;

    return {
        company,
        city,
        country_id,
        firstname,
        lastname,
        postcode,
        street,
        telephone,
        region: {
            region_code,
            region,
            region_id
        },
        vat_id
    };
};

/** @namespace Util/Address/Index/trimCheckoutAddress */
export const trimCheckoutAddress = (customerAddress: AddressType): Partial<TrimmedAddressType> => {
    const {
        company = null,
        city = '',
        country_id = '1',
        firstname = '',
        lastname = '',
        postcode = '',
        street = [''],
        telephone = '',
        region: {
            region_code = null,
            region = null,
            region_id = 1
        } = {},
        vat_id = null
    } = customerAddress;

    return {
        company,
        city,
        country_id,
        firstname,
        lastname,
        postcode,
        street,
        telephone,
        region: {
            region_code,
            region,
            region_id
        },
        vat_id
    };
};

export function removeEmptyStreets(street: string): string
export function removeEmptyStreets(street: string[]): string[]
/**
 * Removes null values from address.street
 * @namespace Util/Address/Index/removeEmptyStreets
 */
export function removeEmptyStreets(street: string | string[]): string | string[] {
    return (
        Array.isArray(street) ? street.filter((line) => Boolean(line)) : street
    );
}

/** @namespace Util/Address/Index/trimAddressFields */
export const trimAddressFields = (fields: AddressType): AddressType => {
    const {
        region_string: region,
        ...fieldsData
    } = fields;

    return { ...fieldsData, region };
};

/** transforming "street[index]" entries into a single "street" object
    for checkout/billing/myAccoutAddress form fields object */
/** @namespace Util/Address/Index/setAddressesInFormObject */
export const setAddressesInFormObject = (fields, numberOfLines) => {
    const addressKeys = new Array(numberOfLines)
        .fill('')
        .map((_, index) => `street${index}`);

    const addressValues = addressKeys.map((key) => fields[key]);

    // removing street related fields from the form object
    const newFields = Object.keys(fields)
        .filter((key) => !addressKeys.includes(key))
        .reduce(
            (acc, key) => {
                acc[key] = fields[key];

                return acc;
            }, {}
        );

    // setting single street entry to the form object
    newFields.street = removeEmptyStreets(addressValues);

    return newFields;
};

// get Form Fields object depending on addressLinesQty
/** @namespace Util/Address/Index/getFormFields */
export const getFormFields = (fields, addressLinesQty) => {
    if (addressLinesQty === 1) {
        return fields;
    }

    return setAddressesInFormObject(fields, addressLinesQty);
};

/** @namespace Util/Address/Index/getCityAndRegionFromZipcode */
export const getCityAndRegionFromZipcode = async (countryId: string, value: string): Promise<(string | null)[]> => {
    const response = await fetch(`https://api.zippopotam.us/${countryId}/${value.split(' ')[0]}`);
    const data = await response.json();

    return data && Object.entries(data).length > 0
        ? [
            data.places[0]['place name'],
            data.places[0]['state abbreviation']
        ]
        : [null, null];
};

/** @namespace Util/Address/Index/getDefaultAddressLabel */
export const getDefaultAddressLabel = (address: AddressType): string => {
    const { default_billing, default_shipping } = address;

    if (!default_billing && !default_shipping) {
        return '';
    }

    if (default_billing && default_shipping) {
        return __(' (default shipping & billing)');
    }

    if (default_billing) {
        return __(' (default billing address)');
    }

    return __(' (default shipping address)');
};

/** @namespace Util/Address/Index/getAvailableRegions */
export const getAvailableRegions = (countryId: string, countries: CountryType[]): RegionType[] => {
    const country = countries.find(({ id }) => id === countryId);
    if (!country) {
        return [];
    }
    const { available_regions } = country;

    // need to handle null value
    return available_regions || [];
};
