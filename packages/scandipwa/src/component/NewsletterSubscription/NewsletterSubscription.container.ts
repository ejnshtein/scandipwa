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

import { useState } from 'react';
import { useSelector } from 'react-redux';

import { FormExternalProps } from 'Component/PureForm/Form';
import { useNewsletterSubscriptionStore } from 'Store/NewsletterSubscription';
import { NotificationMessageType, useNotificationStore } from 'Store/Notification';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import {
    NewsletterSubscriptionComponent,
    NewsletterSubscriptionProps
} from './NewsletterSubscription.component';

export interface NewsletterSelectorResult {
    allowGuestSubscribe: boolean
    isSignedIn: boolean
}

/** @namespace Component/NewsletterSubscription/Container/newsletterSelector */
export const newsletterSelector = (state: RootState): NewsletterSelectorResult => ({
    allowGuestSubscribe: state.ConfigReducer.newsletter_subscription_allow_guest_subscribe as boolean,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Component/NewsletterSubscription/Container/newsletterLogic */
export const newsletterLogic = (): NewsletterSubscriptionProps & FormExternalProps => {
    const {
        allowGuestSubscribe,
        isSignedIn
    } = useSelector(newsletterSelector);
    const { showNotification } = useNotificationStore();
    const { subscribeToNewsletter } = useNewsletterSubscriptionStore();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: FormExternalProps['onSubmit'] = async (_form, fields) => {
        const { value: email } = fields.find(({ name }) => name === 'newsletterEmail') || {};

        if (!allowGuestSubscribe && !isSignedIn) {
            showNotification(
                NotificationMessageType.ERROR,
                __('Guests can not subscribe to the newsletter. You must create an account or login to subscribe.')
            );

            return;
        }

        setIsLoading(true);

        try {
            await subscribeToNewsletter(email as string);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        onSubmit,
        attr: {
            name: 'newsletterEmail'
        }
    };
};

export const NewsletterSubscription = renderHOC(
    NewsletterSubscriptionComponent,
    newsletterLogic,
    'NewsletterSubscriptionContainer'
);
