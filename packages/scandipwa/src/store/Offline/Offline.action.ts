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

export const SHOW_OFFLINE_NOTICE = 'SHOW_OFFLINE_NOTICE';
export const SET_BIG_OFFLINE_NOTICE = 'SET_BIG_OFFLINE_NOTICE';

export interface ShowOfflineNoticeType {
    type: typeof SHOW_OFFLINE_NOTICE
    isOffline: boolean
}

export interface SetBigOfflineNoticeType {
    type: typeof SET_BIG_OFFLINE_NOTICE
    isBig: boolean
}

export type OfflineActionType = ShowOfflineNoticeType | SetBigOfflineNoticeType

/**
 * Show offline notice.
 * @namespace Store/Offline/Action/showOfflineNotice
 */
export const showOfflineNotice = (isOffline: boolean): ShowOfflineNoticeType => ({
    type: SHOW_OFFLINE_NOTICE,
    isOffline
});

/**
 * Set offline notice size to big.
 * @namespace Store/Offline/Action/setBigOfflineNotice
 */
export const setBigOfflineNotice = (isBig: boolean): SetBigOfflineNoticeType => ({
    type: SET_BIG_OFFLINE_NOTICE,
    isBig
});
