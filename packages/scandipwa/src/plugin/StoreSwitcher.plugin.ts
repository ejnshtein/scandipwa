import { StoreSwitcherStyleType } from 'Component/StoreSwitcher/StoreSwitcher.styles';
import { css, cx } from 'Util/CSS';

export const useComponentStyles = (args: [], callback: () => StoreSwitcherStyleType): StoreSwitcherStyleType => {
    const result = callback(...args);
    const newTitleStyle = css`
        color: crimson;
    `;

    return {
        ...result,
        title: cx(result.title, newTitleStyle)
    };
};

export const root = (args: [], callback: () => string): string => {
    const baseStyle = callback(...args);
    const newStyle = css`
        border: 2px solid purple;
    `;

    return cx(baseStyle, newStyle);
};

export default {
    'Component/StoreSwitcher/Container/useComponentStyles': {
        function: useComponentStyles
    },
    'Component/StoreSwitcher/Styles/root': {
        function: root
    }
};
