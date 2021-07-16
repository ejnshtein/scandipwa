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

import CartItemPrice from './CartItemPrice.component';
import { TemplateProps } from '.storybook/base/template';
import BrowserDatabase from 'Util/BrowserDatabase';

const Template: Story = (args) => (<CartItemPrice { ...args } />);

export const DefaultCartItemPrice = Template.bind({})

const { currencyData } = BrowserDatabase.getItem('config')

export default {
    title: 'Atoms/CartItemPrice',
    component: CartItemPrice,
    args: {
        currency_code: currencyData.current_currency_code,
        price: 10,
        subPrice: 0,
        mix: {}
    },
    argTypes: {
        currency_code: {
            type: 'select',
            options: currencyData.available_currencies_data.map(({ value }) => value)
        }
    }
};
