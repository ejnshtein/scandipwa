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

import { useEffect, useRef } from 'react';

/** @namespace Hooks/UsePreviousValue/usePrevious */
export function usePrevious<T>(value: T): T {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current as T;
}
