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

import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FormExternalProps } from 'Component/PureForm/Form';

import { myAccountPasswordForm } from './MyAccountPasswordForm.form';

export interface MyAccountPasswordFormProps extends FormExternalProps {}

/** @namespace Component/MyAccountPasswordForm/Component */
export class MyAccountPasswordFormComponent extends FieldFormComponent<MyAccountPasswordFormProps> {
    get fieldMap(): FieldSection[] {
        return myAccountPasswordForm();
    }

    renderActions(): JSX.Element {
        return (
            <button block="Button" mix={ { block: 'MyAccount', elem: 'Button' } }>
                { __('Change password') }
            </button>
        );
    }
}
