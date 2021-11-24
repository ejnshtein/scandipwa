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
import { FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';

/**
 * Returns fields for share wishlist form
 * @namespace Component/ShareWishlistForm/Form/shareWishlistForm
 */
export const shareWishlistForm = (): FieldSection[] => [
    {
        type: FIELD_TYPE.email,
        label: __('Email addresses, separated by commas'),
        attr: {
            name: 'emails',
            placeholder: __('Email addresses, separated by commas'),
            'aria-label': __('Email address')
        },
        validateOn: ['onChange'],
        validationRule: {
            isRequired: true
        },
        addRequiredTag: true
    },
    {
        label: __('Message'),
        type: FIELD_TYPE.textarea,
        attr: {
            name: 'message',
            placeholder: __('Message'),
            'aria-label': __('Message')
        }
    }
];
