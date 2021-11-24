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

import { SimpleComponent } from 'Util/SimpleComponent';

import { StoreItemsStyleType } from './StoreItems.styles';

export interface StoreItemsProps {
    item: {
        label: string;
        value: string;
    };
    getStoreCode: () => void;
    css: StoreItemsStyleType
}

/** @namespace Component/StoreItems/Component */
export class StoreItemsComponent extends SimpleComponent<StoreItemsProps> {
    render(): JSX.Element {
        const {
            item: {
                label = ''
            } = {},
            getStoreCode,
            css
        } = this.props;

        return (
            <button
              className={ css.root }
              onClick={ getStoreCode }
            >
                { label }
            </button>
        );
    }
}
