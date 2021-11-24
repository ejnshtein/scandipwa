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

import { Reducer } from 'redux';

import { CustomerType } from 'Type/Account';
import { isInitiallySignedIn } from 'Util/Auth';

import {
    MyAccountActionType,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_CUSTOMER_IS_LOADING,
    UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
    UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    UPDATE_CUSTOMER_SIGN_IN_STATUS
} from './MyAccount.action';

export interface MyAccountStore {
    isSignedIn: boolean
    passwordResetStatus: boolean
    isPasswordForgotSend: boolean
    isLoading: boolean
    customer: Partial<CustomerType>
    message: string
}

declare module 'Util/Store/type' {
    export interface RootState {
        MyAccountReducer: MyAccountStore
    }
}

/** @namespace Store/MyAccount/Reducer/getInitialState */
export const getInitialState = (): MyAccountStore => ({
    isSignedIn: isInitiallySignedIn(),
    passwordResetStatus: false,
    isPasswordForgotSend: false,
    isLoading: false,
    customer: {},
    message: ''
});

/** @namespace Store/MyAccount/Reducer/MyAccountReducer */
export const MyAccountReducer: Reducer<
    MyAccountStore,
    MyAccountActionType
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_CUSTOMER_SIGN_IN_STATUS: {
        const { status } = action;
        return {
            ...state,
            isSignedIn: status
        };
    }
    case UPDATE_CUSTOMER_PASSWORD_RESET_STATUS: {
        const { status, message } = action;
        return {
            ...state,
            passwordResetStatus: status,
            passwordResetMessage: message
        };
    }
    case UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS: {
        return {
            ...state,
            isPasswordForgotSend: !state.isPasswordForgotSend
        };
    }
    case UPDATE_CUSTOMER_DETAILS: {
        const { customer } = action;
        return {
            ...state,
            customer
        };
    }
    case UPDATE_CUSTOMER_IS_LOADING: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }
    default:
        return state;
    }
};

export default MyAccountReducer;
