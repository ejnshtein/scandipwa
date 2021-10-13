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

import { StylisPlugin } from '@emotion/cache';
import createEmotion from '@emotion/css/create-instance';
import { prefixer } from 'stylis';

import { mediaQueryPlugin } from './MediaQuery.plugin';
import { RTLPlugin } from './RTL.plugin';

export const {
    cache,
    css,
    cx,
    flush,
    getRegisteredStyles,
    hydrate,
    injectGlobal,
    keyframes,
    merge,
    sheet
} = createEmotion({
    key: 'spwa',
    stylisPlugins: [
        mediaQueryPlugin as StylisPlugin,
        RTLPlugin as StylisPlugin,
        prefixer as StylisPlugin
    ]
});
