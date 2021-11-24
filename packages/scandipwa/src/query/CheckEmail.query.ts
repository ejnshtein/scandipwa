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

import { Query } from '@tilework/opus';

/**
 * Email availability check Query
 * @namespace Query/CheckEmail/Query */
export class CheckEmailQuery {
    static getIsEmailAvailableQuery(email: string) {
        const query = new Query('isEmailAvailable')
            .addArgument('email', 'String!', email)
            .addField('is_email_available');

        return query;
    }
}
