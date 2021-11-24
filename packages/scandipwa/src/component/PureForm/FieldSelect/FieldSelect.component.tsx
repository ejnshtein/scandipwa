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

import ChevronIcon from 'Component/ChevronIcon';
import { BOTTOM, TOP } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import { SimpleComponent } from 'Util/SimpleComponent';

import { FormFieldAttribute } from '../Field/Field.component';

import './FieldSelect.style';

export interface FieldSelectOption {
    id: string
    value: string
    disabled?: boolean
    label: string
    subLabel?: string
    isPlaceholder?: boolean
    sortOrder?: number
}

export interface FieldSelectProps {
    attr: FormFieldAttribute
    events: Record<string, (e: unknown) => void>
    options: FieldSelectOption[]
    // selectRef: React.RefObject<HTMLSelectElement>
    value: string
    isExpanded: boolean
    handleSelectListOptionClick: (option: FieldSelectOption) => void
    handleSelectListKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
    handleSelectExpandedExpand: () => void
    handleSelectExpand: () => void
    isDisabled: boolean
}

/**
 * Field Select
 * @namespace Component/PureForm/FieldSelect/Component
 */
export class FieldSelectComponent extends SimpleComponent<FieldSelectProps> {
    renderNativeOption = (option: FieldSelectOption): JSX.Element => {
        const {
            id,
            value,
            disabled,
            label,
            subLabel = ''
        } = option;

        const { isDisabled } = this.props;

        return (
            <option
              key={ id }
              id={ id }
              value={ value }
              disabled={ disabled || isDisabled }
            >
                { `${label} ${subLabel}` }
            </option>
        );
    };

    renderNativeSelect(): JSX.Element {
        const {
            // selectRef,
            attr,
            events,
            isDisabled,
            options,
            value
        } = this.props;

        return (
            <select
              block="FieldSelect"
              elem="Select"
            //   ref={ selectRef }
              disabled={ isDisabled }
              value={ value }
              { ...attr }
              { ...events }
            >
                { options.map(this.renderNativeOption) }
            </select>
        );
    }

    selectOption = (option: FieldSelectOption) => (): void => {
        const {
            handleSelectListOptionClick
        } = this.props;

        handleSelectListOptionClick(option);
    };

    renderOption = (option: FieldSelectOption): JSX.Element => {
        const {
            id,
            label,
            subLabel,
            isPlaceholder = false
        } = option;

        const { isExpanded } = this.props;

        return (
            <li
              block="FieldSelect"
              elem="Option"
              mods={ { isExpanded, isPlaceholder } }
              key={ id }
              /**
               * Added 'o' as querySelector does not work with
               * ids, that consist of numbers only
               */
              id={ `o${id}` }
              role="menuitem"
              onClick={ this.selectOption(option) }
              onKeyPress={ this.selectOption(option) }
              tabIndex={ isExpanded ? 0 : -1 }
            >
                { label }
                { subLabel && (
                    <strong>
                        { ` ${subLabel}` }
                    </strong>
                ) }
            </li>
        );
    };

    renderOptions(): JSX.Element {
        const {
            options,
            isExpanded
        } = this.props;

        return (
            <ul
              block="FieldSelect"
              elem="Options"
              role="menu"
              mods={ { isExpanded } }
            >
                { options.map(this.renderOption) }
            </ul>
        );
    }

    render(): JSX.Element {
        const {
            attr: { id = '' } = {},
            isExpanded,
            handleSelectExpand,
            handleSelectListKeyDown,
            handleSelectExpandedExpand
        } = this.props;

        return (
            <ClickOutside onClick={ handleSelectExpandedExpand }>
                <div
                  id={ `${ id }_wrapper` }
                  block="FieldSelect"
                  mods={ { isExpanded } }
                  onClick={ handleSelectExpand }
                  // use keyDown as keyPress is deprecated
                  onKeyDown={ handleSelectListKeyDown }
                  role="button"
                  tabIndex={ 0 }
                  aria-label="Select dropdown"
                  aria-expanded={ isExpanded }
                >
                    <div block="FieldSelect" elem="Clickable">
                        { this.renderNativeSelect() }
                        <ChevronIcon direction={ isExpanded ? TOP : BOTTOM } />
                    </div>
                    { this.renderOptions() }
                </div>
            </ClickOutside>
        );
    }
}
