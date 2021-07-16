import React from "react";
import { MixType } from "Type/Common";

export interface MixPropType {
    block: string
    elem: string
    mods: Record<string, string | boolean>
}

export interface CartItemPriceProps {
    price: number
    subPrice: number
    currency_code: string
    mix: MixPropType
}

export class CartItemPrice extends React.Component<BreadcrumbProps> {}

export default CartItemPrice