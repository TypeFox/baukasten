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
                gap: 'var(--gap-xs)',
                fontSize: 'var(--font-size-xs)',
            },
            sm: {
                gap: 'var(--gap-sm)',
                fontSize: 'var(--font-size-sm)',
            },
            md: {
                gap: 'var(--gap-md)',
                fontSize: 'var(--font-size-md)',
            },
            lg: {
                gap: 'var(--gap-md)',
                fontSize: 'var(--font-size-base)',
            },
            xl: {
                gap: 'var(--gap-lg)',
                fontSize: 'var(--font-size-lg)',
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
    color: 'var(--color-foreground-muted)',
    whiteSpace: 'nowrap',
});

/**
 * Page button size variants
 */
const pageButtonSizes = styleVariants({
    xs: {
        minWidth: 'var(--size-xs)',
        height: 'var(--size-xs)',
        padding: '0 var(--spacing-1)',
    },
    sm: {
        minWidth: 'var(--size-sm)',
        height: 'var(--size-sm)',
        padding: '0 var(--spacing-1-5)',
    },
    md: {
        minWidth: 'var(--size-md)',
        height: 'var(--size-md)',
        padding: '0 var(--spacing-2)',
    },
    lg: {
        minWidth: 'var(--size-lg)',
        height: 'var(--size-lg)',
        padding: '0 var(--spacing-2-5)',
    },
    xl: {
        minWidth: 'var(--size-xl)',
        height: 'var(--size-xl)',
        padding: '0 var(--spacing-3)',
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
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-secondary-foreground)',
        border: 'var(--border-width-1) solid transparent',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'var(--font-weight-medium)',
        cursor: 'pointer',
        transition: 'var(--transition-colors)',
        userSelect: 'none',

        selectors: {
            '&:hover:not(:disabled)': {
                backgroundColor: 'var(--color-secondary-hover)',
            },
            '&:active:not(:disabled)': {
                backgroundColor: 'var(--color-secondary-active)',
            },
            '&:focus-visible': {
                outline: 'var(--border-width-2) solid var(--color-focus)',
                outlineOffset: 'var(--spacing-0-5)',
            },
        },
    },
    variants: {
        size: pageButtonSizes,
        isActive: {
            true: {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                borderColor: 'transparent',

                selectors: {
                    '&:hover:not(:disabled)': {
                        backgroundColor: 'var(--color-primary-hover)',
                    },
                },
            },
            false: {},
        },
        isDisabled: {
            true: {
                opacity: 'var(--opacity-disabled)',
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
    color: 'var(--color-foreground-muted)',
    padding: '0 var(--spacing-1)',
    userSelect: 'none',
});

/**
 * Container for page size selector
 */
export const pageSizeContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-sm)',
    color: 'var(--color-foreground-muted)',
    whiteSpace: 'nowrap',
});
