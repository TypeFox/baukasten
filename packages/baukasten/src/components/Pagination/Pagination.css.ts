import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Pagination container with size variants
 */
export const paginationContainer = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    variants: {
        size: {
            xs: {
                gap: 'var(--bk-gap-xs)',
                fontSize: 'var(--bk-font-size-xs)',
            },
            sm: {
                gap: 'var(--bk-gap-sm)',
                fontSize: 'var(--bk-font-size-sm)',
            },
            md: {
                gap: 'var(--bk-gap-md)',
                fontSize: 'var(--bk-font-size-md)',
            },
            lg: {
                gap: 'var(--bk-gap-md)',
                fontSize: 'var(--bk-font-size-base)',
            },
            xl: {
                gap: 'var(--bk-gap-lg)',
                fontSize: 'var(--bk-font-size-lg)',
            },
        },
    },
});

/**
 * Section for page buttons
 */
export const paginationSection = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'inherit',
});

/**
 * Range text (e.g., "1-10 of 100")
 */
export const rangeText = style({
    color: 'var(--bk-color-foreground-muted)',
    whiteSpace: 'nowrap',
});

/**
 * Page button size variants
 */
const pageButtonSizes = styleVariants({
    xs: {
        minWidth: 'var(--bk-size-xs)',
        height: 'var(--bk-size-xs)',
        padding: '0 var(--bk-spacing-1)',
    },
    sm: {
        minWidth: 'var(--bk-size-sm)',
        height: 'var(--bk-size-sm)',
        padding: '0 var(--bk-spacing-1-5)',
    },
    md: {
        minWidth: 'var(--bk-size-md)',
        height: 'var(--bk-size-md)',
        padding: '0 var(--bk-spacing-2)',
    },
    lg: {
        minWidth: 'var(--bk-size-lg)',
        height: 'var(--bk-size-lg)',
        padding: '0 var(--bk-spacing-2-5)',
    },
    xl: {
        minWidth: 'var(--bk-size-xl)',
        height: 'var(--bk-size-xl)',
        padding: '0 var(--bk-spacing-3)',
    },
});

/**
 * Page button with variants for size, active state, and disabled state
 */
export const pageButton = recipe({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bk-color-secondary)',
        color: 'var(--bk-color-secondary-foreground)',
        border: 'var(--bk-border-width-1) solid transparent',
        borderRadius: 'var(--bk-radius-sm)',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'var(--bk-font-weight-medium)',
        cursor: 'pointer',
        transition: 'var(--bk-transition-colors)',
        userSelect: 'none',

        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: 'var(--bk-color-secondary-hover)',
            },
            '&:active:not(:disabled)': {
                backgroundColor: 'var(--bk-color-secondary-active)',
            },
            '&:focus-visible': {
                outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
                outlineOffset: 'var(--bk-spacing-0-5)',
            },
        },
    },
    variants: {
        size: pageButtonSizes,
        isActive: {
            true: {
                backgroundColor: 'var(--bk-color-primary)',
                color: 'var(--bk-color-primary-foreground)',
                borderColor: 'transparent',

                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--bk-color-primary-hover)',
                    },
                },
            },
            false: {},
        },
        isDisabled: {
            true: {
                opacity: 'var(--bk-opacity-disabled)',
                cursor: 'not-allowed',
            },
            false: {},
        },
    },
});

/**
 * Ellipsis indicator
 */
export const ellipsis = style({
    color: 'var(--bk-color-foreground-muted)',
    padding: '0 var(--bk-spacing-1)',
    userSelect: 'none',
});

/**
 * Container for page size selector
 */
export const pageSizeContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    color: 'var(--bk-color-foreground-muted)',
    whiteSpace: 'nowrap',
});
