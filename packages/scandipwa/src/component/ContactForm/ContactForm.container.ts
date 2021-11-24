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

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { FieldValue } from 'Component/PureForm/Form';
import { useContactFormStore } from 'Store/ContactForm';
import { renderHOC } from 'Util/RenderHOC';
import { RootState } from 'Util/Store/type';

import { ContactFormComponent, ContactFormProps } from './ContactForm.component';

/** @namespace Component/ContactForm/Container/contactFormSelector */
export const contactFormSelector = (state: RootState) => ({
    isLoading: state.ContactFormReducer.isLoading
});

export interface ContactFormExternalProps {}

/** @namespace Component/ContactForm/Container/contactFormLogic */
export const contactFormLogic = (_props: ContactFormExternalProps): ContactFormProps => {
    const { isLoading } = useSelector(contactFormSelector);
    const { sendMessage } = useContactFormStore();

    const onFormSubmit = useCallback((form: HTMLFormElement | null, fields: FieldValue[]) => {
        const filteredFields: Record<string, FieldValue['value']> = {};
        fields.forEach(({ name, value }) => {
            filteredFields[name] = value;
        });

        sendMessage({ form, fields: filteredFields });
    }, [sendMessage]);

    return {
        isLoading,
        onFormSubmit,
        attr: {
            name: 'contactForm'
        }
    };
};

export const ContactForm = renderHOC(
    ContactFormComponent,
    contactFormLogic,
    'ContactFormContainer'
);
