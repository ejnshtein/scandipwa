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

/** @namespace Component/ChevronIcon/Styles/root */
export const root = (): string => css`
    fill: var(--color-black);
    cursor: pointer;
    background-color: orange;

    &_direction {
        &_left {
            transform: rotate(180deg);

            [dir="rtl"] & {
                transform: none;
            }
        }

        &_right {
            [dir="rtl"] & {
                transform: rotate(180deg);
            }
        }

        &_bottom {
            transform: rotate(90deg);
        }

        &_top {
            transform: rotate(-90deg);
        }
    }
`;

export const styles = {
    root
};

export type ChevronIconStyleType = InferStyleType<typeof styles>;
