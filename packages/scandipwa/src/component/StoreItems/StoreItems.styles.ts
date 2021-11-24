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

import { css, InferStyleType } from 'Util/CSS';

/** @namespace Component/StoreItems/Styles/root */
export const root = (): string => css`
    font-size: 12px;
    padding: 6px 12px;
    white-space: nowrap;
    width: 100%;

    @media mobile {
        font-size: 14px;
    }

    &:hover {
        background: var(--secondary-base-color);
    }
`;

export const styles = {
    root
};

export type StoreItemsStyleType = InferStyleType<typeof styles>;
