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

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
