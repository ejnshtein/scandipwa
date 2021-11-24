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

export const UPDATE_CONTACT_FORM = 'UPDATE_CONTACT_FORM';

export interface UpdateContactFormType {
    type: typeof UPDATE_CONTACT_FORM
    data: any
}

export type ContactFormAction = UpdateContactFormType

/**
 * Send message
 * @namespace Store/ContactForm/Action/updateContactForm
 */
export const updateContactForm = (data: any): UpdateContactFormType => ({
    type: UPDATE_CONTACT_FORM,
    data
});
