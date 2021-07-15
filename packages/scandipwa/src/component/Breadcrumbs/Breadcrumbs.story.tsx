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
import * as React from 'react';

import { Story } from '@storybook/react'
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs.container';
import getStore from 'Util/Store';

const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

const Template: Story<BreadcrumbsProps> = (args) => (<Breadcrumbs { ...args } />);

export const DefaultBreadcrumb = Template.bind({});
DefaultBreadcrumb.args = {
    areBreadcrumbsVisible: {
        type: 'boolean',
    },
    breadcrumbs: []
}

const { dispatch } = getStore()

BreadcrumbsDispatcher.then(
    ({ default: dispatcher }) => dispatcher.update([{name: '1', url: '/1 '}], dispatch)
)

export default {
    title: 'Breadcrumbs',
    component: Breadcrumbs,
    argTypes: {
        breadcrumbs: {
            disable: true
        },
        areBreadcrumbsVisible: {
            disable: true
        }
    }
};
