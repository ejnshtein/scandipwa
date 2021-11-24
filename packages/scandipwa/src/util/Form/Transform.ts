/**
 * Returns name: value pair object for form output
 * @namespace Util/Form/Transform/transformToNameValuePair
 */
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

export const transformToNameValuePair = <T>(fields: any | any[]): T => {
    const filteredFields: Record<string, unknown> = {};
    const arrayFormat = !Array.isArray(fields) ? Object.values(fields) : fields;

    arrayFormat.forEach(({ value, name }) => {
        filteredFields[name] = value;
    });

    return filteredFields as unknown as T;
};

export default transformToNameValuePair;
