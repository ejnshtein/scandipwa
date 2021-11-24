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

import { SimpleComponent, SimpleProps } from 'Util/SimpleComponent';

import { FormFieldAttribute } from '../Field/Field.component';

import './FieldGroup.style';

export interface FieldGroupProps extends SimpleProps {
    // Group attributes
    attr: FormFieldAttribute
    events: Record<string, (e: unknown) => void>
    groupRef: React.RefObject<HTMLDivElement>

    // Validation
    showErrorAsLabel: boolean
    // validationResponse?: ValidationResult | boolean
    isValid: boolean
    errorMessages?: string[]

    // Labels
    label: string
    subLabel: string

    mods: Record<string, string>
}

/**
 * Field Group
 * @namespace Component/PureForm/FieldGroup/Component
 */
export class FieldGroupComponent extends SimpleComponent<FieldGroupProps> {
    // Renders validation error messages under group
    renderErrorMessage = (message: string): JSX.Element => (
        <div block="Field" elem="ErrorMessage">{ message }</div>
    );

    renderErrorMessages(): JSX.Element | null {
        const {
            showErrorAsLabel,
            isValid,
            errorMessages
        } = this.props;

        if (!showErrorAsLabel || isValid || !errorMessages) {
            return null;
        }

        return (
            <div block="FieldGroup" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage) }
            </div>
        );
    }

    // Renders group label above field
    renderLabel(): JSX.Element | null {
        const { label } = this.props;

        if (!label) {
            return null;
        }

        return <>{ label }</>;
    }

    // Renders group label under field
    renderSubLabel(): JSX.Element | null {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return <>{ subLabel }</>;
    }

    render(): JSX.Element {
        const {
            children,
            groupRef,
            attr,
            events,
            mods,
            isValid,
            errorMessages = []
        } = this.props;

        return (
            <div block="FieldGroup" elem="Wrapper" mods={ mods }>
                { this.renderLabel() }
                <div
                  { ...attr }
                  { ...events }
                  ref={ groupRef }
                  block="FieldGroup"
                  mods={ {
                      isValid,
                      hasError: isValid !== true && errorMessages.length !== 0
                  } }
                >
                    { children }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}
