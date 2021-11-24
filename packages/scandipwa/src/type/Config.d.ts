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

export * from './Config.js';

export interface RegionType {
    id: number
    code: string
    name: string
}
export interface CountryType {
    id: string
    label: string
    available_regions: RegionType[]
    is_state_required?: boolean
}

// export type CountriesType = CountryType[]
