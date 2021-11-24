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

import { ContactFormAction, UPDATE_CONTACT_FORM } from './ContactForm.action';

export interface ContactFormStore {
    isLoading: boolean
    [key: string]: any
}

declare module 'Util/Store/type' {
    export interface RootState {
        ContactFormReducer: ContactFormStore
    }
}

/** @namespace Store/ContactForm/Reducer/getInitialState */
export const getInitialState = (): ContactFormStore => ({
    isLoading: false
});

/** @namespace Store/ContactForm/Reducer/ContactFormReducer */
export const ContactFormReducer: Reducer<
    ContactFormStore,
    ContactFormAction
> = (state = getInitialState(), action) => {
    const {
        type,
        data
    } = action;

    switch (type) {
    case UPDATE_CONTACT_FORM:
        return {
            ...state,
            ...data
        };

    default:
        return state;
    }
};
