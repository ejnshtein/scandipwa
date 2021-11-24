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

import { useStyles } from 'Util/CSS';
import { renderHOC } from 'Util/RenderHOC';

import { ChevronIconComponent, ChevronIconProps } from './ChevronIcon.component';
import { ChevronIconStyleType, styles } from './ChevronIcon.styles';

/** @namespace Component/ChevronIcon/Container/useComponentStyles */
export const useComponentStyles = (): ChevronIconStyleType => useStyles(styles);

/** @namespace Component/ChevronIcon/Container/chevronIconLogic */
export const chevronIconLogic = (props: Omit<ChevronIconProps, 'css'>): ChevronIconProps => {
    const { direction } = props;

    const css = useComponentStyles();

    return {
        direction,
        css
    };
};

export const ChevronIcon = renderHOC(
    ChevronIconComponent,
    chevronIconLogic,
    'ChevronIcon'
);

// ? For old components
// TODO remove this
export default ChevronIcon;
