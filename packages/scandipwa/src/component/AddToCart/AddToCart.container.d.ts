import React from "react";
import { ProductType } from "Type/ProductList";

export interface AddToCartProps {
    isLoading?: boolean
    product: typeof ProductType
    quantity?: number
    configurableVariantIndex?: number
    groupedProductQuantity: {
        [x: string]: number
    }
    setQuantityToDefault?: () => void
    onProductValidationError?: (error: unknown) => void
    productOptionsData: Record<string, unknown>
    disableHandler?: boolean
}

export class AddToCart extends React.Component<BreadcrumbProps> {}

export default AddToCart