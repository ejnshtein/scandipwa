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

import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator';

import './NewsletterSubscription.style';

export interface NewsletterSubscriptionProps {
    isLoading: boolean
}

/**
 * Newsletter Subscription form
 * @namespace Component/NewsletterSubscription/Component
 */
export class NewsletterSubscriptionComponent extends FieldFormComponent<NewsletterSubscriptionProps> {
    get fieldMap(): FieldSection[] {
        return [
            {
                type: FIELD_TYPE.email,
                attr: {
                    name: 'newsletterEmail',
                    placeholder: __('Enter your email address'),
                    'aria-label': __('Email address')
                },
                validateOn: ['onChange'],
                validationRule: {
                    inputType: VALIDATION_INPUT_TYPE.email,
                    isRequired: true
                }
            }
        ];
    }

    renderActions(): JSX.Element {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mods={ { isHollow: true } }
              aria-label={ __('Submit') }
            >
                { __('Subscribe') }
            </button>
        );
    }

    renderFormBody(): JSX.Element {
        const { isLoading } = this.props;

        return (
            <div block="FieldForm" elem="Fieldset" mods={ { isLoading } }>
                { super.renderFormBody() }
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div block="NewsletterSubscription">
                { super.render() }
            </div>
        );
    }
}
