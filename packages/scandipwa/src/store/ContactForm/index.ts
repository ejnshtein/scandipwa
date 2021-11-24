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

import { useDispatch } from 'react-redux';

import { FieldValue } from 'Component/PureForm/Form';

export const ContactFormDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ContactForm/ContactForm.dispatcher'
);

/** @namespace Store/ContactForm/Index/useContactFormStore */
export const useContactFormStore = () => {
    const dispatch = useDispatch();

    return {
        sendMessage(options: {
            form: HTMLFormElement | null
            fields: Record<string, FieldValue['value']>
        }) {
            return ContactFormDispatcher.then(
                ({ default: dispatcher }) => dispatcher.prepareRequest(options, dispatch)
            );
        }
    };
};
