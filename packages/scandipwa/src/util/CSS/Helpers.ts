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

import { ThemeType, useTheme } from 'Component/ThemeProvider';

import { cx } from './Emotion';

export type InferStyleType<T> = Record<keyof T, string>;

/** @namespace Util/CSS/Helpers/useStyles */
export const useStyles = <
    T extends Record<string, (theme: ThemeType) => string>,
    R extends Record<keyof T, string>
>(styles: T): R => {
    const { theme } = useTheme();

    return Object.entries(styles).reduce((result, [k, v]) => ({
        ...result,
        [k]: v(theme)
    }), {} as R);
};

/** @namespace Util/CSS/Helpers/styleMods */
export const styleMods = (
    cls: string,
    mods: Record<string, unknown>
): string[] => Object.entries(mods).map(([k, v]) => {
    if (typeof v === 'string' && v) {
        return `${cls}_${k}_${v}`;
    }

    if (v) {
        return `${cls}_${k}`;
    }

    return '';
});

/** @namespace Util/CSS/Helpers/classWithMods */
export const classWithMods = (cls: string, mods: Record<string, unknown>): string => cx(
    cls,
    styleMods(cls, mods)
);
