/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import ChevronIcon from 'Component/ChevronIcon';
import { BOTTOM, TOP } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import { Field } from 'Component/PureForm/Field';
import { FIELD_TYPE } from 'Component/PureForm/Field/Field.config';
import { FieldSelectOption } from 'Component/PureForm/FieldSelect';
import StoreItems from 'Component/StoreItems';
import { SimpleComponent } from 'Util/SimpleComponent';

import './StoreSwitcher.style';

export interface FormattedStoreList extends FieldSelectOption {
    storeUrl: string
    storeLinkUrl: string
}

export interface StoreSwitcherProps {
    storeList: FormattedStoreList[]
    isOpened: boolean
    currentStoreCode: string
    handleStoreSelect: (storeCode: string) => void
    onStoreSwitcherClick: () => void
    onStoreSwitcherOutsideClick: () => void
    storeLabel: string
    isMobile: boolean
}

/** @namespace Component/StoreSwitcher/Component */
export class StoreSwitcherComponent extends SimpleComponent<StoreSwitcherProps> {
    renderStoreList = (item: FormattedStoreList): JSX.Element => {
        const { handleStoreSelect } = this.props;
        const { value } = item;

        return (
            <StoreItems
              key={ value }
              item={ item }
              handleStoreSelect={ handleStoreSelect }
            />
        );
    };

    renderMobileStoreSwitcher(): JSX.Element {
        const {
            storeList,
            handleStoreSelect,
            currentStoreCode
        } = this.props;

        return (
            <div block="StoreSwitcher">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'StoreSwitcher',
                      name: 'StoreSwitcher',
                      defaultValue: currentStoreCode
                  } }
                  events={ {
                      onChange: handleStoreSelect
                  } }
                  options={ storeList }
                />
            </div>
        );
    }

    renderDesktopStoreSwitcher(): JSX.Element {
        const {
            storeList,
            onStoreSwitcherOutsideClick,
            onStoreSwitcherClick,
            isOpened,
            storeLabel
        } = this.props;

        const mods = { isOpen: isOpened };

        return (
            <div block="StoreSwitcher">
                <ClickOutside onClick={ onStoreSwitcherOutsideClick }>
                    <button
                      block="StoreSwitcher"
                      elem="Title"
                      mods={ mods }
                      onClick={ onStoreSwitcherClick }
                    >
                        { storeLabel }
                        <ChevronIcon direction={ isOpened ? TOP : BOTTOM } />
                    </button>

                    <div block="StoreSwitcher" elem="StoreList" mods={ mods }>
                        { storeList.map(this.renderStoreList) }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    render(): JSX.Element | null {
        const { storeList, isMobile } = this.props;

        if (storeList.length <= 1) {
            return null;
        }

        if (isMobile) {
            return this.renderMobileStoreSwitcher();
        }

        return this.renderDesktopStoreSwitcher();
    }
}
