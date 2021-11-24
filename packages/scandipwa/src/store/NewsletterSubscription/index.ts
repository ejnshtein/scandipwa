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

export const NewsletterSubscriptionDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    './NewsletterSubscription.dispatcher'
);

/** @namespace Store/NewsletterSubscription/Index/useNewsletterSubscriptionStore */
export const useNewsletterSubscriptionStore = () => {
    const dispatch = useDispatch();

    return {
        async subscribeToNewsletter(email: string) {
            const { default: dispatcher } = await NewsletterSubscriptionDispatcher;
            return dispatcher.subscribeToNewsletter(dispatch, email);
        }
    };
};
