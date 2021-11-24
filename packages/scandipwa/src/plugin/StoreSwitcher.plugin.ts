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

import { StoreSwitcherStyleType } from 'Component/StoreSwitcher/StoreSwitcher.styles';
import { css, cx } from 'Util/CSS';

/** @namespace Plugin/StoreSwitcher/Plugin/useComponentStyles */
export const useComponentStyles = (args: [], callback: () => StoreSwitcherStyleType): StoreSwitcherStyleType => {
    const result = callback(...args);
    const newTitleStyle = css`
        color: crimson;
    `;

    return {
        ...result,
        title: cx(result.title, newTitleStyle)
    };
};

/** @namespace Plugin/StoreSwitcher/Plugin/root */
export const root = (args: [], callback: () => string): string => {
    const baseStyle = callback(...args);
    const newStyle = css`
        border: 2px solid purple;
    `;

    return cx(baseStyle, newStyle);
};

export default {
    'Component/StoreSwitcher/Container/useComponentStyles': {
        function: useComponentStyles
    },
    'Component/StoreSwitcher/Styles/root': {
        function: root
    }
};
