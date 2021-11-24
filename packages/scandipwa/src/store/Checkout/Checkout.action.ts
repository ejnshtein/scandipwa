/** * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
export const UPDATE_SHIPPING_FIELDS = 'UPDATE_SHIPPING_FIELDS';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_EMAIL_AVAILABLE = 'UPDATE_EMAIL_AVAILABLE';

export interface UpdateShippingFieldsType {
    type: typeof UPDATE_SHIPPING_FIELDS
    shippingFields: Record<string, string>
}

export interface UpdateEmailType {
    type: typeof UPDATE_EMAIL
    email: string
}

export interface UpdateEmailAvailableType {
    type: typeof UPDATE_EMAIL_AVAILABLE
    isEmailAvailable: boolean
}

export type CheckoutActionType = UpdateShippingFieldsType
    | UpdateEmailType
    | UpdateEmailAvailableType

/** @namespace Store/Checkout/Action/updateShippingFields */
export const updateShippingFields = (shippingFields: Record<string, string>): UpdateShippingFieldsType => ({
    type: UPDATE_SHIPPING_FIELDS,
    shippingFields
});

/** @namespace Store/Checkout/Action/updateEmail */
export const updateEmail = (email: string): UpdateEmailType => ({
    type: UPDATE_EMAIL,
    email
});

/** @namespace Store/Checkout/Action/updateEmailAvailable */
export const updateEmailAvailable = (isEmailAvailable: boolean): UpdateEmailAvailableType => ({
    type: UPDATE_EMAIL_AVAILABLE,
    isEmailAvailable
});
