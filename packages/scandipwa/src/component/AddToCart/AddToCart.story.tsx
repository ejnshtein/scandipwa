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

// import { TemplateProps } from '.storybook/base/template';
import AddToCart from './AddToCart.component';
import { sampleProduct } from '../../../.storybook/sample/product'
// import getStore from 'Util/Store';
// import ProductDispatcher from 'Store/Product/Product.dispatcher'

// const { dispatch, subscribe, getState } = getStore()

const Template: Story = (args) => (<AddToCart { ...args } />);

export const DefaultAddToCart = Template.bind({})

// const productSKU = 'CBI3105A'

// ProductDispatcher.handleData(dispatch, {
//     isSingleProduct: true,
//     args: { filter: { productSKU } }
// })

export default {
    title: 'Atoms/AddToCart',
    component: AddToCart,
    args: {
        isLoading: false,
        mix: {},
        buttonClick: () => console.log('Add to cart click'),
        product: sampleProduct
    },
    // parameters: { actions: { argTypesRegex: '^on.*' } },
    artTypes: {
        buttonClick: { action: 'clicked' }
    }
    // loaders: [
    //     async () => new Promise((resolve, reject) => {
    //         let resolved = false
    //         setTimeout(() => {
    //             if (!resolved) {
    //                 reject(new Error('hmmm'))
    //             }
    //         }, 10000)
    //         const unsub = subscribe(() => {
    //             const state = getState()

    //             if (state && state.ProductReducer && state.ProductReducer.product.sku === productSKU) {
    //                 unsub()
    //                 resolve({})
    //             }
    //         })
    //     })
    // ]
};
