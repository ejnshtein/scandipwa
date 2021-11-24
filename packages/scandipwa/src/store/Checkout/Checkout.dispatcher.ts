/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { Dispatch } from 'redux';

import { CheckEmailQuery } from 'Query/CheckEmail.query';
import { QueryDispatcher } from 'Util/Request';

import { updateEmailAvailable } from './Checkout.action';

/**
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 */
export class CheckoutDispatcher extends QueryDispatcher {
    __construct(): void {
        super.__construct('Checkout');
    }

    onSuccess(data: { isEmailAvailable: { is_email_available: boolean } }, dispatch: Dispatch): void {
        const { isEmailAvailable: { is_email_available } } = data;
        dispatch(updateEmailAvailable(is_email_available));
    }

    onError(error: Error, dispatch: Dispatch): Error {
        dispatch(updateEmailAvailable(true));

        return error;
    }

    prepareRequest(email: string): ReturnType<typeof CheckEmailQuery.getIsEmailAvailableQuery> {
        return CheckEmailQuery.getIsEmailAvailableQuery(email);
    }
}

export default new CheckoutDispatcher();
