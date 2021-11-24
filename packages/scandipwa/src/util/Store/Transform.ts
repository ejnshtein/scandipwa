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

import { CountryType } from 'Type/Config';

export interface CountryOption extends CountryType {
    value: CountryType['id']
    name: CountryType['id']
}

/**
 * Transforms countries list into select options
 * @namespace Util/Store/Transform/transformCountriesToOptions
 */
export const transformCountriesToOptions = (countries: CountryType[]): CountryOption[] => (
    countries.map((country) => {
        const { id } = country;
        return {
            value: id,
            name: id,
            ...country
        };
    })
);

export default transformCountriesToOptions;
