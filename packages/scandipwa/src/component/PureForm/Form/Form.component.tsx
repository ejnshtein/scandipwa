/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { FormContext, FormContextType } from 'Store/Form/Form.context';
import { SimpleComponent, SimpleProps } from 'Util/SimpleComponent';

import { FormFieldAttribute } from '../Field/Field.component';

export interface FormProps extends SimpleProps {
    attr: FormFieldAttribute
    events: Record<string, (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void>
    showErrorAsLabel: boolean
    label: string
    subLabel: string
    formRef: React.RefObject<HTMLFormElement>

    mix: Record<string, unknown>

    formValues: Record<string, unknown>
    handleFormChange: FormContextType['handleFormChange']
    isValid: boolean
    errorMessages?: string[]
}

/** @namespace Component/PureForm/Form/Component */
export class FormComponent extends SimpleComponent<FormProps> {
    /**
     * Renders validation error messages under form
     */
    renderErrorMessage = (message: string): JSX.Element => (
        <div block="Field" elem="ErrorMessage">{ message }</div>
    );

    renderErrorMessages(): JSX.Element | null {
        const {
            showErrorAsLabel,
            isValid,
            errorMessages
        } = this.props;

        if (!showErrorAsLabel || isValid === true || !errorMessages) {
            return null;
        }

        return (
            <div block="Form" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage) }
            </div>
        );
    }

    // Renders group label above form
    renderLabel(): JSX.Element | null {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return <>{ label }</>;
    }

    // Renders group label under form
    renderSubLabel() : JSX.Element | null {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return <>{ subLabel }</>;
    }

    getFormContextValue = (): FormContextType => {
        const {
            formValues,
            handleFormChange,
            isValid,
            errorMessages
        } = this.props;

        return {
            formValues,
            handleFormChange,
            isValid,
            errorMessages
        };
    };

    render(): JSX.Element {
        const {
            children,
            attr,
            events,
            mix,
            formRef,
            isValid,
            errorMessages = []
        } = this.props;

        return (
            <>
                { this.renderLabel() }
                <form
                  ref={ formRef }
                  { ...attr }
                  { ...events }
                  block="Form"
                  mix={ mix }
                  mods={ {
                      isValid,
                      hasError: isValid !== true && errorMessages.length !== 0
                  } }
                >
                    <FormContext.Provider value={ this.getFormContextValue() }>
                        { children }
                    </FormContext.Provider>
                </form>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </>
        );
    }
}
