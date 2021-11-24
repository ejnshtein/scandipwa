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

import { useCallback } from 'react';

import { useStyles } from 'Util/CSS';
import { renderHOC } from 'Util/RenderHOC';

import { StoreItemsComponent, StoreItemsProps } from './StoreItems.component';
import { StoreItemsStyleType, styles } from './StoreItems.styles';

export interface StoreItemsLogicProps {
    item: {
        label: string,
        value: string;
    };
    handleStoreSelect: (value: string) => void;
}

/** @namespace Component/StoreItems/Container/useComponentStyles */
export const useComponentStyles = (): StoreItemsStyleType => useStyles(styles);

/** @namespace Component/StoreItems/Container/storeItemsLogic */
export const storeItemsLogic = (props: StoreItemsLogicProps): StoreItemsProps => {
    const {
        item: { value = '' } = {},
        item,
        handleStoreSelect
    } = props;

    const getStoreCode = useCallback(() => {
        handleStoreSelect(value);
    }, [handleStoreSelect, value]);

    const css = useComponentStyles();

    return {
        item,
        getStoreCode,
        css
    };
};

export const StoreItems = renderHOC(
    StoreItemsComponent,
    storeItemsLogic,
    'StoreItems'
);
