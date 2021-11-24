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

import { Mutation, Query } from '@tilework/opus';

import { FieldValue } from 'Component/PureForm/Form';

/** @namespace Query/ContactForm/Query */
export class ContactFormQuery {
    static getSendContactFormMutation(fields: Record<string, FieldValue['value']>) {
        const mutation = new Mutation('contactForm');
        ContactFormQuery.addSendContactFormMutationArguments(mutation, fields);
        return mutation.addFieldList(
            ContactFormQuery.getSendContactFormMutationResponse()
        );
    }

    static getContactPageConfigQuery() {
        return new Query('contactPageConfig')
            .addFieldList(ContactFormQuery.getContactPageConfigFields());
    }

    static addSendContactFormMutationArguments<
        Name extends string,
        FieldReturnType,
        IsArray extends boolean
    >(
        mutation: Mutation<Name, FieldReturnType, IsArray>,
        fields: Record<string, FieldValue['value']>
    ) {
        return mutation.addArgument('contact', 'ContactForm!', fields);
    }

    static getSendContactFormMutationResponse() {
        return ['message'] as const;
    }

    static getContactPageConfigFields() {
        return ['enabled'] as const;
    }
}
