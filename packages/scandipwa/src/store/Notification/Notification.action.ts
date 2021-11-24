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

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export interface ShowNotificationType {
    type: typeof SHOW_NOTIFICATION
    msgType: string
    msgText: string
    msgDebug?: unknown
}

export interface HideNotificationType {
    type: typeof HIDE_NOTIFICATION
    id: number
}

export type NotificationAction = ShowNotificationType | HideNotificationType

/**
 * Show notification (append to notification to global notification map).
 * @namespace Store/Notification/Action/showNotification
 */
export const showNotification = (
    msgType: string,
    msgText: string,
    msgDebug?: unknown
): ShowNotificationType => ({
    type: SHOW_NOTIFICATION,
    msgType,
    msgText,
    msgDebug
});

/**
 * Hide notification with specific id (drop notification from global list).
 * @namespace Store/Notification/Action/hideNotification
 */
export const hideNotification = (id: number): HideNotificationType => ({
    type: HIDE_NOTIFICATION,
    id
});
