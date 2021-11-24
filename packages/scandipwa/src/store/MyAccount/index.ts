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

import { useDispatch } from 'react-redux';

import { CustomerType } from 'Type/Account';

import {
    updateCustomerDetails,
    updateCustomerPasswordForgotStatus,
    updateCustomerPasswordResetStatus,
    updateCustomerSignInStatus,
    updateIsLoading
} from './MyAccount.action';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Store/MyAccount/Index/getDispatcher */
export const getDispatcher = () => MyAccountDispatcher.then(({ default: dispatcher }) => ({ dispatcher }));

/** @namespace Store/MyAccount/Index/useMyAccountStore */
export function useMyAccountStore() {
    const dispatch = useDispatch();

    return {
        updateCustomerSignInStatus(status: boolean) {
            dispatch(updateCustomerSignInStatus(status));
        },
        updateCustomerDetails(customer: CustomerType) {
            dispatch(updateCustomerDetails(customer));
        },
        updateCustomerPasswordResetStatus(status: boolean, message: string) {
            dispatch(updateCustomerPasswordResetStatus(status, message));
        },
        updateCustomerPasswordForgotStatus() {
            dispatch(updateCustomerPasswordForgotStatus());
        },
        updateIsLoading(isLoading: boolean) {
            dispatch(updateIsLoading(isLoading));
        }
    };
}

/** @namespace Store/MyAccount/Index/useMyAccountDispatcher */
export function useMyAccountDispatcher() {
    const dispatch = useDispatch();

    return {
        async requestCustomerData() {
            const { dispatcher } = await getDispatcher();
            dispatcher.requestCustomerData(dispatch);
        },
        async logout(authTokenExpired = false) {
            const { dispatcher } = await getDispatcher();
            dispatcher.logout(authTokenExpired, dispatch);
        },
        async forgotPassword(options?: { email: string }) {
            const { dispatcher } = await getDispatcher();
            dispatcher.forgotPassword(options, dispatch);
        },
        async resetPassword(options: {
            token: string,
            password: string,
            password_confirmation: string
        }) {
            const { dispatcher } = await getDispatcher();
            dispatcher.resetPassword(options, dispatch);
        },
        async createAccount(options: {
            customer: CustomerType,
            password: string
        }) {
            const { dispatcher } = await getDispatcher();
            dispatcher.confirmAccount(options, dispatch);
        },
        async confirmAccount(options: {
            key: string,
            email: string,
            password: string
        }) {
            const { dispatcher } = await getDispatcher();
            dispatcher.confirmAccount(options, dispatch);
        },
        async signIn(options: { email: string, password: string }) {
            const { dispatcher } = await getDispatcher();
            dispatcher.signIn(options, dispatch);
        },
        async handleCustomerDataOnInit() {
            const { dispatcher } = await getDispatcher();
            dispatcher.handleCustomerDataOnInit(dispatch);
        }
    };
}
