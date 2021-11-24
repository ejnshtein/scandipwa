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

import { ErrorInfo, PureComponent } from 'react';

import { ErrorCatcherContext, ErrorCatcherContextType } from 'Store/ErrorCatcher/ErrorCatcher.context';

/** @namespace Component/ErrorCatcher/Provider */
export class ErrorCatcherProvider extends PureComponent {
    state = {
        hasError: false,
        error: undefined,
        errorInfo: undefined
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    setHasError = (hasError: boolean): void => {
        this.setState({
            hasError
        });
    };

    getContextValue(): ErrorCatcherContextType {
        const { hasError, error, errorInfo } = this.state;
        const contextValue = {
            hasError,
            error,
            errorInfo,
            setHasError: this.setHasError
        };

        return contextValue;
    }

    render(): JSX.Element {
        const { children } = this.props;
        const contextValue = this.getContextValue();

        return (
            <ErrorCatcherContext.Provider value={ contextValue }>
                { children }
            </ErrorCatcherContext.Provider>
        );
    }
}
