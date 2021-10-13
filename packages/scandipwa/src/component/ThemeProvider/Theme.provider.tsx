import {
    FC,
    PropsWithChildren,
    useCallback,
    useState
} from 'react';

import {
    ThemeContext,
    ThemeType,
    ThemeValueType
} from './Theme.context';

export const ThemeProvider: FC<PropsWithChildren<unknown>> = (props) => {
    const { children } = props;
    const [theme, setTheme] = useState<ThemeType>({
        primaryColor: 'lime'
    });
    const updateTheme = useCallback((k: string | ThemeType, v: ThemeValueType = null) => {
        if (typeof k === 'string') {
            setTheme({
                ...theme,
                [k]: v
            });
        } else {
            setTheme(k);
        }
    },
    [theme, setTheme]);

    return (
        <ThemeContext.Provider value={ { theme, setTheme: updateTheme } }>
            { children }
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
