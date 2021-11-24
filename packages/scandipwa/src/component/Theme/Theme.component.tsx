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

import { ThemeContext, ThemeContextType } from 'Store/Theme/Theme.context';
import { SimpleComponent } from 'Util/SimpleComponent';

export interface ThemeProps {
  accentColor: string;
  setTheme(theme: Partial<ThemeContextType>): void;
}

/** @namespace Component/Theme/Component */
export class ThemeComponent extends SimpleComponent<ThemeProps> {
    getContextValue(): ThemeContextType {
        const { accentColor } = this.props;
        return {
            accentColor
        };
    }

    render(): JSX.Element {
        const { children } = this.props;
        return (
            <ThemeContext.Provider value={ this.getContextValue() }>
                { children }
            </ThemeContext.Provider>
        );
    }
}
