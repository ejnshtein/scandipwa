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

import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import {
    STATE_CONFIRM_EMAIL,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import { FieldFormComponent, FieldSection } from 'Component/PureForm/FieldForm/FieldForm.component';
import { FormExternalProps } from 'Component/PureForm/Form';
import { isSignedIn } from 'Util/Auth';

import checkoutGuestForm from './CheckoutGuestForm.form';

import './CheckoutGuestForm.style';

export type SignInState = typeof STATE_CONFIRM_EMAIL
    | typeof STATE_CREATE_ACCOUNT
    | typeof STATE_FORGOT_PASSWORD
    | typeof STATE_FORGOT_PASSWORD_SUCCESS
    | typeof STATE_LOGGED_IN
    | typeof STATE_SIGN_IN
    | ''

export interface CheckoutGuestFormProps extends FormExternalProps {
    formId: string
    isEmailAvailable: boolean
    isGuestEmailSaved: boolean
    isCreateUser: boolean
    emailValue: string
    signInState: SignInState

    handleEmailInput: (event: any, field: any) => void
    handleCreateUser: () => void
    setSignInState: (signInState: SignInState) => void
    handlePasswordInput: (password: string) => void
    handleForgotPassword: (e: React.ChangeEvent) => void
    handleSignIn: (e: React.ChangeEvent) => void
    handleCreateAccount: (e: React.ChangeEvent) => void
    setLoadingState: (isLoading: boolean) => void

    onSignIn: () => void
}

/** @namespace Component/CheckoutGuestForm/Component */
export class CheckoutGuestFormComponent extends FieldFormComponent<CheckoutGuestFormProps> {
    renderMap: Record<string, { render?: () => JSX.Element | void, title?: string }> = {
        [STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: __('Sign in to your account')
        },
        [STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: __('Get password link')
        },
        [STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess()
        },
        [STATE_LOGGED_IN]: {
            render: () => {}
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email')
        },
        '': {
            title: __('Enter personal information')
        }
    };

    get fieldMap(): FieldSection[] {
        const {
            handleEmailInput,
            handlePasswordInput,
            emailValue
            // isCreateUser
        } = this.props;

        return checkoutGuestForm({
            isCreateUser: true,
            emailValue,
            handleEmailInput,
            handlePasswordInput
        });
    }

    renderHeading(): JSX.Element {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    renderSignIn(): JSX.Element {
        const {
            signInState,
            onError: onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            onSignIn,
            emailValue,
            handleEmailInput,
            setSignInState
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout
              handleEmailInput={ handleEmailInput }
              setSignInState={ setSignInState }
              emailValue={ emailValue }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    renderConfirmEmail(): JSX.Element {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword(): JSX.Element {
        const {
            signInState,
            onError: onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState
        } = this.props;

        return (
            <MyAccountForgotPassword
              state={ signInState }
              onFormError={ onFormError }
              handleSignIn={ handleSignIn }
              handleCreateAccount={ handleCreateAccount }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              isCheckout
            />
        );
    }

    renderForgotPasswordSuccess(): JSX.Element {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderSignInForm(): JSX.Element {
        const {
            signInState,
            onError: onFormError,
            handleForgotPassword,
            handleCreateAccount,
            // isCheckout,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              // TODO investigate why this prop was even present
            //   isCheckout={ isCheckout }
              isCheckout
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    renderFormBody(): JSX.Element {
        return (
            <>
                { super.renderFormBody() }
                <span>{ __('You can create an account after checkout') }</span>
            </>
        );
    }

    renderForm(): JSX.Element {
        const { signInState } = this.props;
        const { render } = this.renderMap[signInState] || {};

        return (
            <>{ typeof render === 'function' ? render() : super.render() }</>
        );
    }

    render(): JSX.Element | null {
        const { isGuestEmailSaved } = this.props;

        if (isSignedIn() || isGuestEmailSaved) {
            return null;
        }

        return (
            <div
              block="CheckoutGuestForm"
              mix={ { block: 'FieldForm' } }
            >
                { this.renderForm() }
            </div>
        );
    }
}
