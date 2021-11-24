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

/** @namespace Component/ThemeProvider/Theme/Provider/ThemeProvider */
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
