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
    createContext,
    useContext
} from 'react';

export type ThemeValueType = string | number | boolean | null;

export type ThemeType = Record<string, ThemeValueType>;

export interface ThemeContextType {
    theme: ThemeType;
    setTheme(k: string, v: string): void;
    setTheme(theme: ThemeType): void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: {},
    setTheme: () => {}
});

ThemeContext.displayName = 'ThemeContext';

/** @namespace Component/ThemeProvider/Theme/Context/useTheme */
export const useTheme = (): ThemeContextType => useContext(ThemeContext);
