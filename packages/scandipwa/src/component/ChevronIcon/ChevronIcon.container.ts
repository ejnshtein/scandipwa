import { useStyles } from 'Util/CSS';
import { renderHOC } from 'Util/RenderHOC';

import { ChevronIconComponent, ChevronIconProps } from './ChevronIcon.component';
import { ChevronIconStyleType, styles } from './ChevronIcon.styles';

export const useComponentStyles = (): ChevronIconStyleType => useStyles(styles);

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
