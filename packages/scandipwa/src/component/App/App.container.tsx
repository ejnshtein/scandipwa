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

import { ErrorCatcherProvider } from 'Component/ErrorCatcher';
import { useErrorCatcherContext } from 'Store/ErrorCatcher/ErrorCatcher.context';
import { renderHOC } from 'Util/RenderHOC';

import { AppComponent, AppProps } from './App.component';

/** @namespace Component/App/Container/appLogic */
export const appLogic = (): AppProps => {
    const {
        hasError,
        setHasError,
        errorInfo,
        error
    } = useErrorCatcherContext();

    return {
        error,
        hasError,
        setHasError,
        errorInfo
    };
};

export const AppContainer = renderHOC(AppComponent, appLogic, 'AppContainer');

/** @namespace Component/App/Container/App */
export const App = (): JSX.Element => (
    <ErrorCatcherProvider>
        <AppContainer />
    </ErrorCatcherProvider>
);
