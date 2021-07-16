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
import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs.component';

const Template: Story<BreadcrumbsProps> = (args) => (<Breadcrumbs { ...args } />);

export const DefaultBreadcrumbs = Template.bind({});

export default {
    title: 'Molecules/Breadcrumbs',
    component: Breadcrumbs,
    args: {
        areBreadcrumbsVisible: true,
        breadcrumbs: [
            {
                name: 'Breadcrumb name',
                url: '/breadcrumb-url'
            }
        ]
    }
};
