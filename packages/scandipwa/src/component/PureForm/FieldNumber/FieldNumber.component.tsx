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

import AddIcon from 'Component/AddIcon';
import MinusIcon from 'Component/MinusIcon';
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';
import { SimpleComponent } from 'Util/SimpleComponent';

import { FormFieldAttribute } from '../Field/Field.component';

export interface FieldNumberProps {
    attr: FormFieldAttribute
    events: Record<string, (e: unknown) => void>
    value: number
    handleValueChange: (value: number) => void
    isDisabled: boolean
}

/**
 * Field Number
 * @namespace Component/PureForm/FieldNumber/Component
 */
export class FieldNumberComponent extends SimpleComponent<FieldNumberProps> {
    renderInput(): JSX.Element {
        const {
            attr,
            events,
            value,
            isDisabled
        } = this.props;

        return (
            <input
              { ...attr }
              { ...events }
              type={ FIELD_TYPE.number }
              readOnly
              aria-label={ __('Value') }
              value={ value }
              disabled={ isDisabled }
            />
        );
    }

    incrementValue(): void {
        const {
            handleValueChange,
            value
        } = this.props;

        handleValueChange(value + 1);
    }

    decrementValue(): void {
        const {
            handleValueChange,
            value
        } = this.props;

        handleValueChange(value - 1);
    }

    renderSubtractButton(): JSX.Element {
        const {
            value,
            attr: { max = DEFAULT_MAX_PRODUCTS },
            isDisabled
        } = this.props;

        return (
            <button
              disabled={ value === max || isDisabled }
              onClick={ this.incrementValue }
              aria-label={ __('Add') }
              type={ FIELD_TYPE.button }
            >
                <AddIcon block="SubtractButton" isPrimary />
            </button>
        );
    }

    renderAddButton(): JSX.Element {
        const {
            attr: { min = 1 },
            value,
            isDisabled
        } = this.props;

        return (
            <button
              disabled={ value === min || isDisabled }
              onClick={ this.decrementValue }
              aria-label={ __('Subtract') }
              type={ FIELD_TYPE.button }
            >
                <MinusIcon block="AddButton" isPrimary />
            </button>
        );
    }

    render(): JSX.Element {
        return (
            <>
                { this.renderInput() }
                { this.renderSubtractButton() }
                { this.renderAddButton() }
            </>
        );
    }
}
