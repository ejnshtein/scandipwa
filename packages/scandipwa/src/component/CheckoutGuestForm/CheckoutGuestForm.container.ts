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

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePrevious } from 'src/hooks/use-previous-value';

import { SHIPPING_STEP, UPDATE_EMAIL_CHECK_FREQUENCY } from 'Component/Checkout/Checkout.config';
import {
    AUTOFILL_CHECK_TIMER,
    GUEST_EMAIL_FIELD_ID
} from 'Component/CheckoutGuestForm/CheckoutGuestForm.config';
import {
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_SIGN_IN
} from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { useCheckoutDispatcher, useCheckoutStore } from 'Store/Checkout';
import { renderHOC } from 'Util/RenderHOC';
import { debounce } from 'Util/Request';
import { RootState } from 'Util/Store/type';

import { CheckoutGuestFormComponent, CheckoutGuestFormProps, SignInState } from './CheckoutGuestForm.component';

/** @namespace Component/CheckoutGuestForm/Container/checkoutGuestSelector */
export const checkoutGuestSelector = (state: RootState) => ({
    emailValue: state.CheckoutReducer.email,
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable
});

export interface CheckoutGuestFormExternalProps {
    isCreateUser: boolean
    isGuestEmailSaved?: boolean
    onCreateUserChange: () => void
    onPasswordChange: (password: string) => void
    onEmailChange: (email: string) => void
    onSignIn?: () => void
}

/** @namespace Component/CheckoutGuestForm/Container/checkoutGuestFormLogic */
export const checkoutGuestFormLogic = (props: CheckoutGuestFormExternalProps): CheckoutGuestFormProps => {
    const {
        isGuestEmailSaved = false,
        isCreateUser,
        onCreateUserChange,
        onEmailChange,
        onPasswordChange,
        onSignIn = () => {}
    } = props;

    const {
        emailValue = '',
        isEmailAvailable
    } = useSelector(checkoutGuestSelector);
    const {
        updateEmail,
        updateEmailAvailable
    } = useCheckoutStore();
    const {
        checkEmailAvailability
    } = useCheckoutDispatcher();

    // TODO probably redundant since in old version this has not been used at all.
    // isLoading prop was passed to component but component didn't used it at all
    const [_isLoading, setIsLoading] = useState(false);
    const [signInState, setSignInState] = useState<SignInState>('');

    const checkEmailAvailabilityDebounced = useCallback(
        debounce((email: string) => {
            checkEmailAvailability(email);
        }, UPDATE_EMAIL_CHECK_FREQUENCY),
        [checkEmailAvailability]
    );

    const onFormError = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleForgotPassword = useCallback((e: React.ChangeEvent) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        setSignInState(STATE_FORGOT_PASSWORD);
    }, [setSignInState]);

    const handleSignIn = useCallback((e: React.ChangeEvent) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        setSignInState(STATE_SIGN_IN);
    }, [setSignInState]);

    const handleCreateAccount = useCallback((e: React.ChangeEvent) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        setSignInState(STATE_CREATE_ACCOUNT);
    }, [setSignInState]);

    const handleEmailInput = useCallback((_event: any, field) => {
        const { value: email } = field;
        checkEmailAvailabilityDebounced(email);
        onEmailChange(email);

        if (isEmailAvailable) {
            updateEmail(email);
        }
    }, [isEmailAvailable, updateEmail, onEmailChange]);

    const handleCreateUser = useCallback(() => {
        onCreateUserChange();
    }, [onCreateUserChange]);

    const handlePasswordInput = useCallback((password: string) => {
        onPasswordChange(password);
    }, [onPasswordChange]);

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                const field = document.getElementById(GUEST_EMAIL_FIELD_ID);

                if (field) {
                    // handleEmailInput(field?.value);
                }
            },
            AUTOFILL_CHECK_TIMER
        );

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        // clear email status on mount
        updateEmailAvailable(true);
    }, []);

    const prevIsEmailAvailable = usePrevious(isEmailAvailable);

    useEffect(() => {
        if (!isEmailAvailable && prevIsEmailAvailable && signInState !== STATE_SIGN_IN) {
            setSignInState(STATE_SIGN_IN);
        }
    }, [isEmailAvailable]);

    return {
        attr: {
            name: 'checkoutGuestForm'
        },
        formId: SHIPPING_STEP,
        emailValue,
        isEmailAvailable,
        isGuestEmailSaved,
        isCreateUser,

        handleCreateUser,
        handleEmailInput,
        setSignInState,
        signInState,
        setLoadingState: setIsLoading,
        handleCreateAccount,
        handleForgotPassword,
        handlePasswordInput,
        handleSignIn,
        onError: onFormError,
        onSignIn
    };
};

export const CheckoutGuestForm = renderHOC(
    CheckoutGuestFormComponent,
    checkoutGuestFormLogic,
    'CheckoutGuestFormContainer'
);
