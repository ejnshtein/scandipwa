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

import React from 'react';

import { ThemeContextType } from 'Store/Theme/Theme.context';

export interface SimpleProps {
  children?: React.ReactNode;
}

export type SimpleStyles<P, S> = (props: P, theme: ThemeContextType) => S;

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/use-namespace, @scandipwa/scandipwa-guidelines/derived-class-names
export class SimpleComponent<P extends Record<any, any>, S = any> {
    constructor(props: P, styles?: S)

    __construct(props: P, styles?: S): void

  readonly props: Readonly<P> & { children?: React.ReactNode };

  render(): JSX.Element | null;
}

export interface SimpleComponentConstructor<
  P extends Record<any, any>,
  S = any
> {
  new (props: P, styles?: S): SimpleComponentD<P, S>;

  styles?: SimpleStyles<P, S>;
}
