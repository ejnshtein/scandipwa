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
import { TemplateProps } from '.storybook/base/template';

const Template: Story<BreadcrumbProps> = (args) => (<Breadcrumb { ...args } />);

export const DefaultBreadcrumb = Template.bind({}) as TemplateProps<BreadcrumbProps>;

export default {
    title: 'Atoms/Breadcrumb',
    component: Breadcrumb,
    args: {
        index: 1,
        isDisabled: false,
        url: '/Home',
        name: 'Breadcrumb'
    },
    decorators: [
        (Story) => (
            <ul>
                <Story />
            </ul>
        )
    ]
};
