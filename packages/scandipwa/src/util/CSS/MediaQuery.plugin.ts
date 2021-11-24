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

import {
    Element,
    MEDIA,
    Middleware,
    replace,
    serialize
} from 'stylis';

/* eslint-disable max-len */
export const mediaTypes: Record<string, string> = {
    desktop: '(min-width: 811px)',
    'ultra-narrow-desktop': '(min-width: 810px) and (max-width: 1160px)',
    'narrow-desktop': '(min-width: 1024px) and (max-width: 1280px)',
    'wide-desktop': '(min-width: 1280px)',
    tablet: '(min-width: 811px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 1)',
    'tablet-portrait': '(min-width: 811px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: portrait)',
    'tablet-landscape': '(min-width: 811px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: landscape)',
    mobile: '(max-width: 810px)',
    standalone: 'all and (display-mode: standalone)'
};
/* eslint-enable max-len */

/** @namespace Util/CSS/MediaQuery/Plugin/mediaQueryPlugin */
export const mediaQueryPlugin = (
    element: Element,
    _index: number,
    _children: Element[],
    callback: Middleware
): string | void => {
    if (element.type === MEDIA) {
        const [, mediaType] = element.value.split(' ');
        const mediaValue = mediaTypes[mediaType];

        if (mediaValue) {
            return serialize([{
                ...element,
                props: [mediaValue],
                return: replace(element.return, mediaType, mediaValue),
                value: replace(element.value, mediaType, mediaValue)
            }], callback);
        }
    }
};
