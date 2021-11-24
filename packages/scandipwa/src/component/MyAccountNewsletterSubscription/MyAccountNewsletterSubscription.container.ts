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

import { DataType } from '@tilework/opus';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormExternalProps } from 'Component/PureForm/Form';
import { MyAccountQuery } from 'Query/MyAccount.query';
import { useMyAccountStore } from 'Store/MyAccount';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import { NotificationMessageType, useNotificationStore } from 'Store/Notification';
import { CustomerType } from 'Type/Account';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { renderHOC } from 'Util/RenderHOC';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { RootState } from 'Util/Store/type';

import { useQuery } from '../../hooks/use-query';
import {
    MyAccountNewsletterSubscriptionComponent,
    MyAccountNewsletterSubscriptionProps
} from './MyAccountNewsletterSubscription.component';

/** @namespace Component/MyAccountNewsletterSubscription/Container/myAccountNewsletterSubscriptionSelector */
export const myAccountNewsletterSubscriptionSelector = (state: RootState) => ({
    customer: state.MyAccountReducer.customer,
    newsletterConfirmStatus: state.ConfigReducer.newsletter_subscription_confirm as boolean
});

/** @namespace Component/MyAccountNewsletterSubscription/Container/myAccountNewsletterSubscriptionLogic */
export const myAccountNewsletterSubscriptionLogic = (): MyAccountNewsletterSubscriptionProps => {
    const {
        customer,
        newsletterConfirmStatus
    } = useSelector(myAccountNewsletterSubscriptionSelector);
    const {
        showNotification
    } = useNotificationStore();
    const {
        updateCustomerDetails
    } = useMyAccountStore();
    const {
        isLoading,
        request
    } = useQuery<DataType<ReturnType<typeof MyAccountQuery.getUpdateInformationMutation>>>();

    const { is_subscribed = false } = customer;
    const [isSubscriptionSelected, setIsSubscriptionSelected] = useState(is_subscribed);

    const setSubscriptionStatus = useCallback(() => {
        setIsSubscriptionSelected(!isSubscriptionSelected);
    }, [setIsSubscriptionSelected]);

    const showSubscriptionUpdateNotification = useCallback((isSubscribed, wasSubscribed) => {
        if (!isSubscribed && wasSubscribed) {
            showNotification(NotificationMessageType.SUCCESS, __('We have removed your newsletter subscription.'));
        } else if (isSubscribed && !newsletterConfirmStatus && !wasSubscribed) {
            showNotification(NotificationMessageType.SUCCESS, __('We have saved your subscription'));
        } else if (!isSubscribed && newsletterConfirmStatus) {
            showNotification(NotificationMessageType.SUCCESS, __('A subscription confirmation email has been sent!'));
        } else {
            showNotification(NotificationMessageType.SUCCESS, __('We have updated your subscription.'));
        }
    }, [showNotification, newsletterConfirmStatus]);

    const onError = useCallback(() => {
        showNotification(NotificationMessageType.ERROR, __('We are experiencing issues, please try again later'));
    }, [showNotification]);

    const onSubmit = useCallback<FormExternalProps['onSubmit']>(async (_form, fields) => {
        const {
            is_subscribed: wasSubscribed
        } = customer;

        const {
            isSubscribed: {
                value = false
            }
            // TODO do something with these typings
        } = fields as unknown as { isSubscribed: { value?: boolean } };

        const mutation = MyAccountQuery.getUpdateInformationMutation({ is_subscribed: value });

        if (!isSignedIn()) {
            return null;
        }

        const data = await request(mutation);
        if (data && data.updateCustomer) {
            const {
                customer: updatedCustomer
            } = data.updateCustomer;

            BrowserDatabase.setItem(updatedCustomer, CUSTOMER, ONE_MONTH_IN_SECONDS);
            const { is_subscribed } = updatedCustomer;
            updateCustomerDetails(updatedCustomer as CustomerType);
            showSubscriptionUpdateNotification(is_subscribed, wasSubscribed);
        }
    }, []);

    return {
        attr: {
            name: 'myAccountNewsletterSubscription'
        },
        returnAsObject: true,
        onError,
        onSubmit,
        isSubscriptionSelected,
        setSubscriptionStatus,
        isLoading
    };
};

export const MyAccountNewsletterSubscription = renderHOC(
    MyAccountNewsletterSubscriptionComponent,
    myAccountNewsletterSubscriptionLogic,
    'MyAccountNewsletterSubscriptionContainer'
);
