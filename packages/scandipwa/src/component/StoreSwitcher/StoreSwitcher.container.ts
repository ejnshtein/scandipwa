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

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePersistedQuery } from 'src/hooks/use-persisted-query';

import { ConfigQuery, StoreListData } from 'Query/Config.query';
import { useDeviceContext } from 'Store/Device';
import { useNotificationStore } from 'Store/Notification';
import { BrowserDatabase } from 'Util/BrowserDatabase';
import { useStyles } from 'Util/CSS';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { FormattedStoreList, StoreSwitcherComponent, StoreSwitcherProps } from './StoreSwitcher.component';
import { STORE_CONFIG_KEY } from './StoreSwitcher.config';
import { StoreSwitcherStyleType, styles } from './StoreSwitcher.styles';

export interface StoreSwitcherSelectorType {
    currentStoreCode: string
}

/** @namespace Component/StoreSwitcher/Container/storeSwitcherSelector */
export const storeSwitcherSelector = (state: RootState): StoreSwitcherSelectorType => ({
    currentStoreCode: state.ConfigReducer.code as string
});

/** @namespace Component/StoreSwitcher/Container/formatStoreList */
export const formatStoreList = (
    storeList: StoreListData['storeList']
): FormattedStoreList[] => storeList
    .reduce<FormattedStoreList[]>(
        (acc, val) => {
            const {
                name,
                code,
                is_active,
                base_url,
                base_link_url
            } = val;

            if (!is_active) {
                return acc;
            }

            return [
                ...acc,
                {
                    id: `store_${ code }`,
                    value: code,
                    storeUrl: base_url,
                    storeLinkUrl: base_link_url,
                    label: name
                }
            ];
        }, []
    );

/** @namespace Component/StoreSwitcher/Container/useComponentStyles */
export const useComponentStyles = (): StoreSwitcherStyleType => useStyles(styles);

/** @namespace Component/StoreSwitcher/Container/storeSwitcherLogic */
export const storeSwitcherLogic = (): StoreSwitcherProps => {
    const { isMobile } = useDeviceContext();
    const { currentStoreCode = 'default' } = useSelector(storeSwitcherSelector);
    const [isOpen, setIsOpen] = useState(false);
    const [storeLabel, setStoreLabel] = useState('');
    const [storeList, setStoreList] = useState<FormattedStoreList[]>([]);
    const { showNotification } = useNotificationStore();
    const showErrorNotification = useCallback(
        (message: string) => showNotification('error', message),
        [showNotification]
    );
    const { data, request } = usePersistedQuery<StoreListData>();

    const handleStoreSelect = useCallback((storeCode: string) => {
        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            showErrorNotification(__('This store can not be opened!'));

            return;
        }

        BrowserDatabase.deleteItem(STORE_CONFIG_KEY);
        window.location = store.storeLinkUrl as unknown as Location;
    }, [storeList, showErrorNotification]);

    const onStoreSwitcherClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const onStoreSwitcherOutsideClick = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const setCurrentStoreLabel = useCallback((storeCode: string) => {
        const store = storeList.find(
            ({ value }) => value === storeCode
        );

        if (!store) {
            return;
        }

        const { label } = store;

        setStoreLabel(label);
    }, [storeList, setStoreLabel]);

    const getStoreList = () => request(ConfigQuery.getStoreList());

    useEffect(() => {
        getStoreList();
    }, []);

    useEffect(() => {
        if (currentStoreCode && !storeLabel) {
            setCurrentStoreLabel(currentStoreCode);
        }
    }, [currentStoreCode, storeList]);

    useEffect(() => {
        if (!data?.storeList) {
            return;
        }

        const { storeList } = data;

        setStoreList(formatStoreList(storeList));
    }, [data]);

    const css = useComponentStyles();

    return {
        isOpen,
        storeLabel,
        handleStoreSelect,
        currentStoreCode,
        onStoreSwitcherClick,
        onStoreSwitcherOutsideClick,
        isMobile,
        storeList,
        css
    };
};

export const StoreSwitcher = renderHOC(StoreSwitcherComponent, storeSwitcherLogic, 'StoreSwitcherContainer');
