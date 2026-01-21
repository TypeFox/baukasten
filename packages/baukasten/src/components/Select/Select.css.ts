import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Select container with fullWidth variant
 */
export const selectContainer = recipe({
    base: {
        position: 'relative',
        flexDirection: 'column',
        gap: 'var(--gap-xs)',
        minWidth: 'calc(var(--spacing-20) * 2.5)', // 200px equivalent
    },
    variants: {
        fullWidth: {
            true: {
                display: 'flex',
                width: '100%',
            },
            false: {
                display: 'inline-flex',
            },
        },
    },
    defaultVariants: {
        fullWidth: false,
    },
});

/**
 * Select trigger size variants
 */
const triggerSizes = styleVariants({
    xs: {
        padding: 'var(--spacing-0-5) var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
        minHeight: 'var(--size-xs)',
    },
    sm: {
        padding: 'var(--spacing-1) var(--spacing-2-5)',
        fontSize: 'var(--font-size-sm)',
        minHeight: 'var(--size-sm)',
    },
    md: {
        padding: 'var(--spacing-1-5) var(--spacing-3)',
        fontSize: 'var(--font-size-md)',
        minHeight: 'var(--size-md)',
    },
    lg: {
        padding: 'var(--spacing-2) var(--spacing-3-5)',
        fontSize: 'var(--font-size-base)',
        minHeight: 'var(--size-lg)',
    },
    xl: {
        padding: 'var(--spacing-2-5) var(--spacing-4)',
        fontSize: 'var(--font-size-lg)',
        minHeight: 'var(--size-xl)',
    },
});

/**
 * Select trigger button with variants
 */
export const selectTrigger = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--gap-sm)',
        backgroundColor: 'var(--color-dropdown-background)',
        color: 'var(--color-dropdown-foreground)',
        border: 'var(--border-width-1) solid var(--color-dropdown-border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'var(--transition-colors)',
        width: '100%',
        textAlign: 'left',

        selectors: {
            '&:hover:not(:disabled)': {
                borderColor: 'var(--color-border-hover)',
            },
            '&:focus': {
                outline: 'none',
                borderColor: 'var(--color-input-focus-border)',
            },
            '&:disabled': {
                opacity: 'var(--opacity-disabled)',
                cursor: 'not-allowed',
            },
        },
    },
    variants: {
        size: triggerSizes,
        isOpen: {
            true: {
                borderColor: 'var(--color-input-focus-border)',
            },
            false: {},
        },
        hasError: {
            true: {
                borderColor: 'var(--color-input-error)',
                selectors: {
                    '&:focus': {
                        borderColor: 'var(--color-input-error)',
                    },
                },
            },
            false: {},
        },
    },
    defaultVariants: {
        size: 'md',
        isOpen: false,
        hasError: false,
    },
});

/**
 * Select value display
 */
export const selectValue = style({
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

export const selectValuePlaceholder = style({
    color: 'var(--color-input-placeholder)',
});

/**
 * Select value content wrapper
 */
export const selectValueContent = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--gap-sm)',
});

/**
 * Chevron icon with rotation
 */
export const chevronIcon = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        transition: 'transform var(--transition-base)',
    },
    variants: {
        isOpen: {
            true: {
                transform: 'rotate(180deg)',
            },
            false: {},
        },
    },
});

/**
 * Dropdown menu with position variants (legacy - kept for backwards compatibility)
 */
export const dropdown = recipe({
    base: {
        position: 'absolute',
        left: 0,
        minWidth: '100%',
        maxWidth: 'calc(var(--spacing-20) * 5)', // 400px equivalent
        width: 'fit-content',
        backgroundColor: 'var(--color-dropdown-background)',
        border: 'var(--border-width-1) solid var(--color-input-focus-border)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-index-dropdown)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    variants: {
        position: {
            bottom: {
                top: '100%',
                borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
            },
            top: {
                bottom: '100%',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
            },
        },
    },
    defaultVariants: {
        position: 'bottom',
    },
});

/**
 * Dropdown menu portal (used with Floating UI)
 */
export const dropdownPortal = style({
    backgroundColor: 'var(--color-dropdown-background)',
    border: 'var(--border-width-1) solid var(--color-input-focus-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-index-dropdown)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

/**
 * Search input wrapper
 */
export const searchInputWrapper = style({
    padding: 'var(--spacing-2)',
    backgroundColor: 'var(--color-dropdown-background)',
    flexShrink: 0,
});

/**
 * Search input field
 */
export const searchInput = style({
    width: '100%',
    padding: 'var(--spacing-1) var(--spacing-2)',
    backgroundColor: 'var(--color-input-background)',
    color: 'var(--color-input-foreground)',
    border: 'var(--border-width-1) solid var(--color-input-border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',

    selectors: {
        '&:focus': {
            outline: 'none',
            borderColor: 'var(--color-input-focus-border)',
        },
        '&::placeholder': {
            color: 'var(--color-input-placeholder)',
        },
    },
});

/**
 * Options container
 */
export const optionsContainer = style({
    padding: 'var(--spacing-1) 0',
    minWidth: '100%',
    width: 'max-content',
    overflowY: 'auto',
    flex: '1 1 auto',
});

/**
 * Option size variants
 */
const optionSizes = styleVariants({
    xs: {
        padding: 'var(--spacing-0-5) var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
        minHeight: 'var(--size-xs)',
    },
    sm: {
        padding: 'var(--spacing-1) var(--spacing-2-5)',
        fontSize: 'var(--font-size-sm)',
        minHeight: 'var(--size-sm)',
    },
    md: {
        padding: 'var(--spacing-1) var(--spacing-3)',
        fontSize: 'var(--font-size-md)',
        minHeight: 'var(--size-md)',
    },
    lg: {
        padding: 'var(--spacing-1-5) var(--spacing-3-5)',
        fontSize: 'var(--font-size-base)',
        minHeight: 'var(--size-lg)',
    },
    xl: {
        padding: 'var(--spacing-2) var(--spacing-4)',
        fontSize: 'var(--font-size-lg)',
        minHeight: 'var(--size-xl)',
    },
});

/**
 * Option with variants for selection, highlight, and disabled states
 */
export const option = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--gap-sm)',
        cursor: 'pointer',
        transition: 'var(--transition-colors)',
    },
    variants: {
        size: optionSizes,
        isHighlighted: {
            true: {
                backgroundColor: 'var(--color-list-active)',
                color: 'var(--color-list-active-foreground)',
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
    compoundVariants: [
        {
            variants: {
                isHighlighted: true,
                isDisabled: true,
            },
            style: {
                backgroundColor: 'transparent',
                color: 'inherit',
            },
        },
    ],
    defaultVariants: {
        size: 'md',
        isHighlighted: false,
        isDisabled: false,
    },
});

/**
 * Option label
 */
export const optionLabel = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

/**
 * Option default label (e.g., "default", "recommended")
 */
export const optionDefaultLabel = style({
    flexShrink: 0,
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-foreground-muted)',
    marginLeft: 'var(--spacing-2)',
});

/**
 * Empty message when no options
 */
export const emptyMessage = style({
    padding: 'var(--spacing-4) var(--spacing-3)',
    textAlign: 'center',
    color: 'var(--color-foreground-muted)',
    fontSize: 'var(--font-size-sm)',
});

/**
 * Description panel at bottom of dropdown
 */
export const descriptionPanel = style({
    padding: 'var(--spacing-2) var(--spacing-3)',
    backgroundColor: 'var(--color-dropdown-background)',
    borderTop: 'var(--border-width-1) solid var(--color-dropdown-border)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-foreground-muted)',
    lineHeight: 'var(--line-height-relaxed)',
    minHeight: 'calc(var(--line-height-relaxed) * var(--font-size-xs) * 3)', // ~3 lines of text
    display: 'flex',
    alignItems: 'center',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    width: '100%',
    flexShrink: 0,
});

/**
 * Error text
 */
export const errorText = style({
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-input-error)',
});