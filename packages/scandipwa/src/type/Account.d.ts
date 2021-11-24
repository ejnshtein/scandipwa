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

export * from './Account.js';

export interface RegionType {
    region_code: string | null
    region: string | null
    region_id: number
}

export interface AddressType {
    city: string
    country_id: string
    region_id?: number
    customer_id: number
    default_billing: boolean
    default_shipping: boolean
    firstname: string
    id: number
    lastname: string
    middlename: string
    postcode: string
    prefix: string
    region?: RegionType
    region_string?: string
    street: string | string[]
    suffix: string
    telephone: string
    vat_id: number | null
    company: string | null
}

export interface TrimAddressKeys {
    company: unknown
    default_shipping: unknown
    default_billing: unknown
    city: unknown
    country_id: unknown
    firstname: unknown
    lastname: unknown
    middlename: unknown
    postcode: unknown
    street: unknown
    telephone: unknown
    region: unknown
    prefix: unknown
    suffix: unknown
    vat_id: unknown
}

export interface TrimmedAddressType extends Pick<
    AddressType,
    keyof TrimAddressKeys
> {}

export type AddressesType = AddressType[];

export interface CustomerType {
    addressesType: AddressesType
    created_at: string
    default_billing: string
    default_shipping: string
    dob: Date
    email: string
    firstname: string
    group_id: number
    id: number
    is_subscribed: boolean
    lastname: string
    middlename: string
    prefix: string
    suffix: string
    taxvat: string
}

export interface BaseOrderInfoType {
    id: number
    increment_id: string
    created_at: string
    status_label: string
    grand_total: number
    subtotal: string
}

export interface OrderType {
    base_order_info: BaseOrderInfoType
    order_products: string[]
    payment_info: Record<string, unknown>
    shipping_info: Record<string, unknown>
}

export type OrdersType = OrderType[];

export interface DownloadableType {
    id: number
    order_id: string
    status_label: string
    downloads: string
    download_url: string
    created_at: string
    title: string
}

export interface TabType {
    url: string
    name: string
}

export type TabMapType = Record<string, TabType>
