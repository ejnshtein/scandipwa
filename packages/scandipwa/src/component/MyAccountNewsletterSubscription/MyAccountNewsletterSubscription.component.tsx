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
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FormExternalProps } from 'Component/PureForm/Form';

import './MyAccountNewsletterSubscription.style.scss';

export interface MyAccountNewsletterSubscriptionProps extends FormExternalProps {
    isSubscriptionSelected: boolean
    setSubscriptionStatus: (e: React.ChangeEvent<HTMLInputElement>) => void
    isLoading: boolean
}

/** @namespace Component/MyAccountNewsletterSubscription/Component */
export class MyAccountNewsletterSubscriptionComponent extends FieldFormComponent<MyAccountNewsletterSubscriptionProps> {
    // shouldComponentUpdate(nextProps) {
    //     const { isSubscriptionSelected } = this.props;
    //     const { isSubscriptionSelected: nextIsSubscriptionSelected } = nextProps;

    //     return isSubscriptionSelected !== nextIsSubscriptionSelected;
    // }

    get fieldMap(): FieldSection[] {
        const { setSubscriptionStatus, isSubscriptionSelected } = this.props;

        return [
            {
                type: FIELD_TYPE.checkbox,
                attr: {
                    name: 'isSubscribed',
                    defaultChecked: isSubscriptionSelected
                },
                events: {
                    onChange: setSubscriptionStatus
                },
                label: __('General subscription')
            }
        ];
    }

    renderFormBody(): JSX.Element {
        return (
            <div
              block="FieldForm"
              elem="Fields"
              mix={ { block: 'MyAccountNewsletterSubscription' } }
            >
                { super.renderFormBody() }
            </div>
        );
    }

    renderActions(): JSX.Element {
        return (
            <button
              type={ FIELD_TYPE.submit }
              block="Button"
              mix={ { block: 'MyAccountNewsletterSubscription', elem: 'Button' } }
              aria-label={ __('Submit') }
            >
                { __('Save changes') }
            </button>
        );
    }

    render(): JSX.Element {
        const { isLoading } = this.props;

        return (
            <>
                <Loader isLoading={ isLoading } />
                { super.render() }
            </>
        );
    }
}
