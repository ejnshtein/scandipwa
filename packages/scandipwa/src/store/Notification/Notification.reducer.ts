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

import { HIDE_NOTIFICATION, NotificationAction, SHOW_NOTIFICATION } from './Notification.action';

export interface NotificationType {
    msgType: string
    msgText: string
    msgDebug: unknown
}

export interface NotificationStore {
    notifications: Record<number, NotificationType>
}

declare module 'Util/Store/type' {
    export interface RootState {
        NotificationReducer: NotificationType
    }
}

/** @namespace Store/Notification/Reducer/getInitialState */
export const getInitialState = (): NotificationStore => ({
    notifications: {}
});

/** @namespace Store/Notification/Reducer/NotificationReducer */
export const NotificationReducer: Reducer<
    NotificationStore,
    NotificationAction
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case SHOW_NOTIFICATION:
        const { msgType, msgText, msgDebug } = action;
        const timestamp = Date.now();
        const notification: NotificationType = {
            msgType,
            msgText,
            msgDebug
        };

        return {
            ...state,
            notifications: {
                ...state.notifications,
                [timestamp]: notification
            }
        };

    case HIDE_NOTIFICATION:
        const {
            [action.id]: id,
            ...shownNotifications
        } = state.notifications;

        return {
            ...state,
            notifications: shownNotifications
        };

    default:
        return state;
    }
};

export default NotificationReducer;
