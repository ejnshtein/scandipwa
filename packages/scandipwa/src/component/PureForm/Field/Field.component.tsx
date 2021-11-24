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

import { AriaAttributes, ChangeEvent, HTMLAttributes } from 'react';

import { FieldFile } from 'Component/PureForm/FieldFile';
import { FieldNumber } from 'Component/PureForm/FieldNumber';
import { FieldSelect, FieldSelectOption } from 'Component/PureForm/FieldSelect';
import { SimpleComponent } from 'Util/SimpleComponent';

import { FIELD_TYPE } from './Field.config';

import './Field.style';

export interface FormFieldAttribute extends AriaAttributes, HTMLAttributes<HTMLElement> {
    id?: string
    name: string
    value?: string
    multiple?: boolean
    accept?: string
    max?: number
    min?: number
    selectPlaceholder?: string
    placeholder?: string
}

export interface FieldProps {
    type: FIELD_TYPE
    attr: FormFieldAttribute
    events: Record<string, (e: any) => Promise<void> | void>
    isDisabled: boolean
    // inputRef?: React.RefObject<HTMLInputElement>
    // buttonRef?: React.RefObject<HTMLButtonElement>
    // textAreaRef?: React.RefObject<HTMLTextAreaElement>
    // selectRef?: React.RefObject<HTMLSelectElement>
    options: FieldSelectOption[]
    showErrorAsLabel: boolean
    // validationResponse?: ValidationResult | boolean
    isValid: boolean
    errorMessages?: string[]
    value: string | number
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

    label: string
    subLabel: string
    addRequiredTag: boolean

    mix: Record<string, unknown>
}

/** @namespace Component/PureForm/Field/Component */
export class FieldComponent extends SimpleComponent<FieldProps> {
    renderMap: Record<FIELD_TYPE, () => JSX.Element> = {
        // Checkboxes & Radio
        [FIELD_TYPE.radio]: this.renderCheckboxOrRadio.bind(this),
        [FIELD_TYPE.checkbox]: this.renderCheckboxOrRadio.bind(this),
        [FIELD_TYPE.multi]: this.renderCheckboxOrRadio.bind(this),

        // Default input
        [FIELD_TYPE.email]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.text]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.time]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.dateTime]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.date]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.password]: this.renderDefaultInput.bind(this),
        [FIELD_TYPE.submit]: this.renderDefaultInput.bind(this),

        // Custom fields
        [FIELD_TYPE.file]: this.renderFile.bind(this),
        [FIELD_TYPE.select]: this.renderSelect.bind(this),
        [FIELD_TYPE.textarea]: this.renderTextArea.bind(this),
        [FIELD_TYPE.button]: this.renderButton.bind(this),
        [FIELD_TYPE.number]: this.renderNumber.bind(this)

    };

    // #region INPUT TYPE RENDER
    renderDefaultInput(): JSX.Element {
        const {
            type,
            // inputRef,
            attr,
            events,
            isDisabled,
            value,
            onChange
        } = this.props;

        return (
            <input
            //   ref={ inputRef }
              disabled={ isDisabled }
              type={ type }
              value={ value }
              onChange={ onChange }
              { ...attr }
              { ...events }
            />
        );
    }

    renderFile(): JSX.Element {
        const {
            attr,
            events
        } = this.props;

        return (
            <FieldFile
              attr={ attr }
              events={ events }
            />
        );
    }

    renderNumber(): JSX.Element {
        const {
            attr,
            events,
            isDisabled = false
        } = this.props;

        return (
            <FieldNumber
              attr={ attr }
              events={ events }
              isDisabled={ isDisabled }
            />
        );
    }

    renderSelect(): JSX.Element {
        const {
            attr,
            events,
            options,
            isDisabled = false
        } = this.props;

        return (
            <FieldSelect
              attr={ attr }
              events={ events }
              options={ options }
              isDisabled={ isDisabled }
            />
        );
    }

    renderButton(): JSX.Element {
        const {
            attr,
            events,
            isDisabled
        } = this.props;
        const { value = __('Submit') } = attr;

        return (
            <button
              disabled={ isDisabled }
              { ...attr }
              { ...events }
            >
                { value }
            </button>
        );
    }

    renderCheckboxOrRadio(): JSX.Element {
        const {
            type,
            attr,
            attr: { id = '' } = {},
            events,
            isDisabled,
            label,
            onChange
        } = this.props;

        return (
            <label htmlFor={ id } block="Field" elem="CheckboxLabel">
                <input
                  disabled={ isDisabled }
                  type={ type }
                  onChange={ onChange }
                  { ...attr }
                  { ...events }
                />
                <div block="input-control" />
                { label }
            </label>
        );
    }

    renderTextArea(): JSX.Element {
        const {
            attr,
            events,
            isDisabled,
            value,
            onChange
        } = this.props;

        return (
            <textarea
              disabled={ isDisabled }
              value={ value }
              onChange={ onChange }
              { ...attr }
              { ...events }
            />
        );
    }
    // #endregion

    // #region LABEL/TEXT RENDER
    // Renders validation error messages under field
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
            <div block="Field" elem="ErrorMessages">
                { errorMessages.map(this.renderErrorMessage) }
            </div>
        );
    }

    // Renders fields label above field
    renderLabel(): JSX.Element | null {
        const { type, label, attr: { name } } = this.props;

        if (!label) {
            return null;
        }

        return (
            <div block="Field" elem="LabelContainer">
                <label block="Field" elem="Label" htmlFor={ name || `input-${type}` }>
                    { label }
                    { this.renderRequiredTag() }
                </label>
            </div>
        );
    }

    // Renders * for required fields
    renderRequiredTag(): JSX.Element | null {
        const { addRequiredTag } = this.props;

        if (!addRequiredTag) {
            return null;
        }

        return (
            <span block="Field" elem="Label" mods={ { isRequired: true } }>
                { ' *' }
            </span>
        );
    }

    // Renders fields label under field
    renderSubLabel(): JSX.Element | null {
        const { subLabel } = this.props;

        if (!subLabel) {
            return null;
        }

        return (
            <div block="Field" elem="SubLabelContainer">
                <div block="Field" elem="SubLabel">
                    { subLabel }
                </div>
            </div>
        );
    }
    // #endregion

    render(): JSX.Element {
        const {
            type,
            isValid,
            errorMessages = [],
            mix
        } = this.props;
        const inputRenderer = this.renderMap[type];

        return (
            <div block="Field" elem="Wrapper" mods={ { type } }>
                <div
                  block="Field"
                  mods={ {
                      type,
                      isValid,
                      hasError: isValid !== true && errorMessages.length !== 0
                  } }
                  mix={ mix }
                >
                    { type !== FIELD_TYPE.checkbox && type !== FIELD_TYPE.radio && this.renderLabel() }
                    { inputRenderer && inputRenderer() }
                </div>
                { this.renderErrorMessages() }
                { this.renderSubLabel() }
            </div>
        );
    }
}
