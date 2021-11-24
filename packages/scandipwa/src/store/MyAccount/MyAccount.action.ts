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

import { CustomerType } from 'Type/Account';

export const UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS' as const;
export const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
export const UPDATE_CUSTOMER_PASSWORD_RESET_STATUS = 'UPDATE_CUSTOMER_PASSWORD_RESET_STATUS';
export const UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS';
export const UPDATE_CUSTOMER_IS_LOADING = 'UPDATE_CUSTOMER_IS_LOADING';

export interface UpdateCustomerSignInStatusType {
    type: typeof UPDATE_CUSTOMER_SIGN_IN_STATUS
    status: boolean
}

export interface UpdateCustomerDetailsType {
    type: typeof UPDATE_CUSTOMER_DETAILS
    customer: CustomerType
}

export interface UpdateCustomerPasswordResetStatusType {
    type: typeof UPDATE_CUSTOMER_PASSWORD_RESET_STATUS
    status: boolean
    message: string
}

export interface UpdateCustomerPasswordForgotStatusType{
    type: typeof UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
}

export interface UpdateCustomerLoadingStatusType {
    type: typeof UPDATE_CUSTOMER_IS_LOADING
    isLoading: boolean
}

export type MyAccountActionType = UpdateCustomerSignInStatusType
 | UpdateCustomerDetailsType
 | UpdateCustomerPasswordResetStatusType
 | UpdateCustomerPasswordForgotStatusType
 | UpdateCustomerLoadingStatusType

/** @namespace Store/MyAccount/Action/updateCustomerSignInStatus */
export const updateCustomerSignInStatus = (status: boolean): UpdateCustomerSignInStatusType => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

/** @namespace Store/MyAccount/Action/updateCustomerDetails */
export const updateCustomerDetails = (customer: CustomerType): UpdateCustomerDetailsType => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordResetStatus */
export const updateCustomerPasswordResetStatus = (
    status: boolean,
    message: string
): UpdateCustomerPasswordResetStatusType => ({
    type: UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status,
    message
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotStatus */
export const updateCustomerPasswordForgotStatus = (): UpdateCustomerPasswordForgotStatusType => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
});

/** @namespace Store/MyAccount/Action/updateIsLoading */
export const updateIsLoading = (isLoading: boolean): UpdateCustomerLoadingStatusType => ({
    type: UPDATE_CUSTOMER_IS_LOADING,
    isLoading
});
