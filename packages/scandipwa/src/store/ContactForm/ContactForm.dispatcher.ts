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

import { client } from '@tilework/opus';
import { Dispatch } from 'redux';

import { FieldValue } from 'Component/PureForm/Form';
import { ContactFormQuery } from 'Query/ContactForm.query';
import { NotificationAction, showNotification } from 'Store/Notification/Notification.action';
import { getErrorMessage } from 'Util/Request';

import { ContactFormAction, updateContactForm } from './ContactForm.action';

/**
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ContactForm/Dispatcher
 */
export class ContactFormDispatcher {
    prepareRequest(
        options: {
            form: HTMLFormElement | null
            fields: Record<string, FieldValue['value']>
        },
        dispatch: Dispatch<ContactFormAction | NotificationAction>
    ): Promise<void> {
        const { form, fields } = options;

        const mutation = ContactFormQuery.getSendContactFormMutation(fields);

        dispatch(
            updateContactForm({
                isLoading: true
            })
        );

        return client.post(mutation)
            .then(
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/post/then */
                (data) => {
                    dispatch(showNotification('success', data.contactForm.message));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));

                    // Clears form
                    if (form && typeof form.reset === 'function') {
                        form.reset();
                    }
                },
                /** @namespace Store/ContactForm/Dispatcher/ContactFormDispatcher/prepareRequest/post/then/catch */
                (error) => {
                    dispatch(showNotification('error', getErrorMessage(error)));
                    dispatch(updateContactForm({
                        isLoading: false
                    }));
                }
            );
    }
}

export default new ContactFormDispatcher();
