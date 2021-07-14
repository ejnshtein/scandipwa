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

import { TemplateProps } from '../../../.storybook/base/template'

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs.container';

const Template: Story<BreadcrumbsProps> = (args) => (<Breadcrumbs { ...args } />);

export const DefaultBreadcrumb = Template.bind({}) as TemplateProps<BreadcrumbsProps>;

DefaultBreadcrumb.args = {};

export default {
    title: 'Breadcrumbs',
    component: Breadcrumbs
};
