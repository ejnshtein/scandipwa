import React from "react";
import { DeviceType } from "Type/Device";
import { ProductType } from "Type/ProductList";

export interface ProductCardProps {
    lintTo?: Record<string, unknown>
    product: typeof ProductType
    device: typeof DeviceType
    productOrVariant: typeof ProductType
    thumbnail?: string
    availableVisualOptions: {
        label?: string
        value?: string
        type?: string
    }[]
    getAttribute: () => void
    registerSharedElement: () => void
    isLoading?: boolean
    mix?: Record<string, string>
    renderContent?: () => void | boolean
    isConfigurableProductOutOfStock: () => boolean
    isBundleProductOutOfStock: () => boolean
    hideWishlistButton?: boolean
    isWishlistEnabled: boolean
    hideCompareButton?: boolean
    siblingsHaveBrands?: boolean
    setSiblingsHaveBrands?: (value: boolean) => void
}

export class ProductCard extends React.Component<ProductCardProps> {}

export default ProductCard