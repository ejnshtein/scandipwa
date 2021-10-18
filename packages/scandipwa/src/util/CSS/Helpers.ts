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
