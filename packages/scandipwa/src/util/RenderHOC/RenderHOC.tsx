/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { useTheme } from 'Component/ThemeProvider/Theme.context';
// import { Constructable } from 'Type/Constructable';
import { SimpleComponentConstructor } from 'Util/SimpleComponent';

/** @namespace Util/RenderHOC/renderHOC */
export const renderHOC = <
    P extends Record<string, any> & { children?: React.ReactNode },
    T extends Record<string, any>,
    S,
    N extends string
>(
        Component: SimpleComponentConstructor<T, S>,
        logicHook: (props: P) => T,
        displayName?: N
    ): React.FC<P> => {
    const FunctionalComponent: React.FC<P> = (props): JSX.Element | null => {
        const componentProps = logicHook(props);
        const theme = useTheme();
        if (!(componentProps as { children?: React.ReactNode }).children) {
            (componentProps as { children?: React.ReactNode }).children = props.children;
        }

        if (Component.styles) {
            if (typeof Component.styles === 'function') {
                const componentClasses = Component.styles(componentProps, theme);

                const renderComponent = new Component(componentProps, componentClasses);

                return renderComponent.render();
            }

            const renderComponent = new Component(componentProps, Component.styles);

            return renderComponent.render();
        }
        const renderComponent = new Component(componentProps);

        return renderComponent.render();
    };

    if (displayName) {
        FunctionalComponent.displayName = displayName;
    }

    /**
     * For react to understand that this should be treated like any other component component
     * we need to execute it like this.
     * */
    return (props: P) => <FunctionalComponent { ...props } />;
};
