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

import { updateEmail, updateEmailAvailable, updateShippingFields } from './Checkout.action';

export const CheckoutDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    './Checkout.dispatcher'
);
/** @namespace Store/Checkout/Index/getDispatcher */
export const getDispatcher = () => CheckoutDispatcher.then(({ default: dispatcher }) => ({ dispatcher }));

/** @namespace Store/Checkout/Index/useCheckoutStore */
export function useCheckoutStore() {
    const dispatch = useDispatch();

    return {
        updateEmail(email: string) {
            dispatch(updateEmail(email));
        },
        updateEmailAvailable(isEmailAvailable: boolean) {
            dispatch(updateEmailAvailable(isEmailAvailable));
        },
        updateShippingFields(shippingFields: Record<string, string>) {
            dispatch(updateShippingFields(shippingFields));
        }
    };
}

/** @namespace Store/Checkout/Index/useCheckoutDispatcher */
export function useCheckoutDispatcher() {
    const dispatch = useDispatch();

    return {
        async checkEmailAvailability(email: string) {
            const { dispatcher } = await getDispatcher();
            dispatcher.handleData(dispatch, email);
        }
    };
}
