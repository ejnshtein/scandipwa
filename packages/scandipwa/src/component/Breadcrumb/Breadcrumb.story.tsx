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

import Breadcrumb, { BreadcrumbProps } from './Breadcrumb.component';

const Template: Story<BreadcrumbProps> = (args) => (<Breadcrumb { ...args } />);

export const DefaultBreadcrumb = Template.bind({})

export default {
    title: 'Atoms/Breadcrumb',
    component: Breadcrumb,
    args: {
        url: '/Home',
        name: 'Breadcrumb',
        index: 1,
        isDisabled: false
    },
    decorators: [
        (Story) => (
            <ul>
                <Story />
            </ul>
        )
    ]
};
