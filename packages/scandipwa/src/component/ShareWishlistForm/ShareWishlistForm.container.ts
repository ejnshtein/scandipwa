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

import { FormExternalProps } from 'Component/PureForm/Form';
import transformToNameValuePair from 'Util/Form/Transform';
import { renderHOC } from 'Util/RenderHOC';

import { ShareWishlistFormComponent, ShareWishlistFormProps } from './ShareWishlistForm.component';

export interface ShareWishlistFormExternalProps {
    onSave: (...args: any[]) => void
}

/** @namespace Component/ShareWishlistForm/Container/shareWishlistFormLogic */
export const shareWishlistFormLogic = (
    props: ShareWishlistFormExternalProps
): ShareWishlistFormProps => {
    const {
        onSave
    } = props;

    const onSubmit = useCallback<FormExternalProps['onSubmit']>((_form, fields) => {
        onSave(transformToNameValuePair(fields));
    }, [onSave]);

    return {
        attr: {
            name: 'shareWishlistForm'
        },
        onSubmit
    };
};

export const ShareWishlistForm = renderHOC(
    ShareWishlistFormComponent,
    shareWishlistFormLogic,
    'ShareWishlistFormContainer'
);
