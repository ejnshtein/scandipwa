import { root as chevronIcon } from 'Component/ChevronIcon/ChevronIcon.styles';
import { ThemeType } from 'Component/ThemeProvider';
import { css, InferStyleType } from 'Util/CSS';

/** @namespace Component/StoreSwitcher/Styles/root */
export const root = (theme: ThemeType): string => css`
    border-block-end: 1px solid var(--primary-divider-color);
    background-color: ${theme.primaryColor};

    @media desktop {
        border-block-end: none;
        margin-inline-start: 24px;
    }

    @media mobile {
        margin: 0 16px;
    }

    .Field {
        margin-block-start: 0;

        &Select {
            &-Select {
                border: none;
                font-size: 14px;
                font-weight: 400;
                opacity: 1;
                padding-inline-start: 0;
                line-height: 23px;
            }

            &::after {
                height: 13px;
                inset-inline-end: 0;
                width: 13px;
            }
        }
    }
`;

export const rootWithChevron = (): string => css({
    [`.${chevronIcon()}`]: {
        width: '14px',
        height: '14px',
        marginInlineStart: '10px',
        insetInlineEnd: 0,
        background: 'red'
    }
});

export const title = (): string => css`
    color: var(--input-color);
    cursor: pointer;
    display: flex;
    align-items: center;

    @include desktop {
        font-size: 12px;
    }
`;

export const list = (): string => css`
    background-color: var(--store-switcher-list-background);
    border: 1px solid var(--input-border-color);
    display: none;
    inset-inline-end: -20px;
    position: absolute;
    inset-block-start: 25px;
    z-index: 2;

    &_isOpen {
        display: block;
    }
`;

export const styles = {
    root,
    rootWithChevron,
    title,
    list
};

export type StoreSwitcherStyleType = InferStyleType<typeof styles>;
