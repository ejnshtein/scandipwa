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

import Loader from 'Component/Loader';
import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FormExternalProps } from 'Component/PureForm/Form';

import { contactForm } from './ContactForm.form';

import './ContactForm.style';

export interface ContactFormProps extends FormExternalProps {
    isLoading: boolean
    onFormSubmit: FormExternalProps['onSubmit']
}

/** @namespace Component/ContactForm/Component */
export class ContactFormComponent extends FieldFormComponent<ContactFormProps> {
    get fieldMap(): FieldSection[] {
        return contactForm();
    }

    getFormProps(): FormExternalProps {
        const { onFormSubmit } = this.props;

        return {
            ...super.getFormProps(),
            onSubmit: onFormSubmit
        };
    }

    renderActions(): JSX.Element {
        const { isLoading } = this.props;

        return (
            <>
                <Loader isLoading={ isLoading } />
                <button type="submit" block="Button">
                    { __('Send Your message') }
                </button>
            </>
        );
    }

    render(): JSX.Element {
        return (
            <div block="ContactForm">
                { super.render() }
            </div>
        );
    }
}
