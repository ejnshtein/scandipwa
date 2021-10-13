/* eslint-disable max-len */
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

import { classWithMods } from 'Util/CSS';
import { SimpleComponent } from 'Util/SimpleComponent';

import { ChevronDirection, ChevronDirectionType } from './ChevronIcon.config';
import { ChevronIconStyleType } from './ChevronIcon.styles';

export interface ChevronIconProps {
    direction: ChevronDirectionType;
    css: ChevronIconStyleType;
}

export class ChevronIconComponent extends SimpleComponent<ChevronIconProps> {
    render(): JSX.Element {
        const {
            direction = ChevronDirection.RIGHT,
            css
        } = this.props;

        return (
            <svg
              className={ classWithMods(css.root, { direction }) }
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.8535 13.707L11.5605 7.99997L5.8535 2.29297L4.4395 3.70697L8.7325 7.99997L4.4395 12.293L5.8535 13.707Z" />
            </svg>
        );
    }
}
