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

import { shareWishlistForm } from './ShareWishlistForm.form';

export interface ShareWishlistFormProps extends FormExternalProps {}

/** @namespace Component/ShareWishlistForm/Component */
export class ShareWishlistFormComponent extends FieldFormComponent<ShareWishlistFormProps> {
    get fieldMap(): FieldSection[] {
        return shareWishlistForm();
    }

    renderActions(): JSX.Element {
        return (
            <button type="submit" block="Button">
                { __('Share Wishlist') }
            </button>
        );
    }
}
