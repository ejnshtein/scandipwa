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

import ProductCard, { ProductCardProps } from './ProductCard.component';
import { sampleProduct } from '.storybook/sample/product';

const Template: Story<ProductCardProps> = (args) => (<ProductCard { ...args } />);

export const DefaultBreadcrumb = Template.bind({})

export default {
    title: 'Molecules/ProductCard',
    component: ProductCard,
    args: {
        product: sampleProduct,
        productOrVariant: sampleProduct,
        getAttribute: () => {},
        device: {
            isMobile: false
        },
        availableVisualOptions: []
    },
    decorators: [
        (Story) => (
            <ul>
                <Story />
            </ul>
        )
    ]
};
