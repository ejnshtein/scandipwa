import { ProductListQuery } from "Query/ProductList.query";
import { Field } from "Util/Query";
import { QueryDispatcher } from "Util/Request";

export class ProductDispatcher extends QueryDispatcher {
    onSuccess(data: unknown, dispatch: () => void)
    onError(data: unknown, dispatch: () => void)
    prepareRequest(options: unknown): Field
}

export default new ProductDispatcher();