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

import { MyAccountPasswordFormComponent, MyAccountPasswordFormProps } from './MyAccountPasswordForm.component';

export interface MyAccountPasswordFormExternalProps {
    onPasswordChange: (password: string) => void;
}

/** @namespace Component/MyAccountPasswordForm/Container/myAccountPasswordFormLogic */
export const myAccountPasswordFormLogic = (props: MyAccountPasswordFormExternalProps): MyAccountPasswordFormProps => {
    const {
        onPasswordChange
    } = props;

    const onSubmit = useCallback<FormExternalProps['onSubmit']>((_form, fields) => {
        onPasswordChange(transformToNameValuePair(fields));
    }, [onPasswordChange]);

    return {
        attr: {
            name: 'myAccountPasswordForm'
        },
        onSubmit
    };
};

export const MyAccountPasswordForm = renderHOC(
    MyAccountPasswordFormComponent,
    myAccountPasswordFormLogic,
    'MyAccountPasswordFormContainer'
);
