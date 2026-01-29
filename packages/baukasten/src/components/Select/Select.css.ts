import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Select container with fullWidth variant
 */
export const selectContainer = recipe({
    base: {
        position: 'relative',
        flexDirection: 'column',
        gap: 'var(--bk-gap-xs)',
        minWidth: 'calc(var(--bk-spacing-20) * 2.5)', // 200px equivalent
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
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
    },
    sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
    },
    md: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
    },
    lg: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-3-5)',
        fontSize: 'var(--bk-font-size-base)',
        minHeight: 'var(--bk-size-lg)',
    },
    xl: {
        padding: 'var(--bk-spacing-2-5) var(--bk-spacing-4)',
        fontSize: 'var(--bk-font-size-lg)',
        minHeight: 'var(--bk-size-xl)',
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
        gap: 'var(--bk-gap-sm)',
        backgroundColor: 'var(--bk-color-dropdown-background)',
        color: 'var(--bk-color-dropdown-foreground)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
        borderRadius: 'var(--bk-radius-sm)',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'var(--bk-transition-colors)',
        width: '100%',
        textAlign: 'left',

        selectors: {
            '&:hover:not(:disabled)': {
                borderColor: 'var(--bk-color-border-hover)',
            },
            '&:focus': {
                outline: 'none',
                borderColor: 'var(--bk-color-input-focus-border)',
            },
            '&:disabled': {
                opacity: 'var(--bk-opacity-disabled)',
                cursor: 'not-allowed',
            },
        },
    },
    variants: {
        size: triggerSizes,
        isOpen: {
            true: {
                borderColor: 'var(--bk-color-input-focus-border)',
            },
            false: {},
        },
        hasError: {
            true: {
                borderColor: 'var(--bk-color-input-error)',
                selectors: {
                    '&:focus': {
                        borderColor: 'var(--bk-color-input-error)',
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
    color: 'var(--bk-color-input-placeholder)',
});

/**
 * Select value content wrapper
 */
export const selectValueContent = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
});

/**
 * Chevron icon with rotation
 */
export const chevronIcon = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        transition: 'transform var(--bk-transition-base)',
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
        maxWidth: 'calc(var(--bk-spacing-20) * 5)', // 400px equivalent
        width: 'fit-content',
        backgroundColor: 'var(--bk-color-dropdown-background)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-input-focus-border)',
        boxShadow: 'var(--bk-shadow-lg)',
        zIndex: 'var(--bk-z-index-dropdown)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    variants: {
        position: {
            bottom: {
                top: '100%',
                borderRadius: '0 0 var(--bk-radius-sm) var(--bk-radius-sm)',
            },
            top: {
                bottom: '100%',
                borderRadius: 'var(--bk-radius-sm) var(--bk-radius-sm) 0 0',
            },
        },
    },
    defaultVariants: {
        position: 'bottom',
    },
});

/**
 * Floating wrapper for dropdown (receives Floating UI positioning)
 * z-index is set here so it can be overridden via dropdownClassName
 */
export const floatingWrapper = style({
    zIndex: 'var(--bk-z-index-popover)',
});

/**
 * Dropdown menu portal (used with Floating UI)
 */
export const dropdownPortal = style({
    backgroundColor: 'var(--bk-color-dropdown-background)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-focus-border)',
    borderRadius: 'var(--bk-radius-sm)',
    boxShadow: 'var(--bk-shadow-lg)',
    zIndex: 'var(--bk-z-index-dropdown)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

/**
 * Search input wrapper
 */
export const searchInputWrapper = style({
    padding: 'var(--bk-spacing-2)',
    backgroundColor: 'var(--bk-color-dropdown-background)',
    flexShrink: 0,
});

/**
 * Search input field
 */
export const searchInput = style({
    width: '100%',
    padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
    backgroundColor: 'var(--bk-color-input-background)',
    color: 'var(--bk-color-input-foreground)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-sm)',

    selectors: {
        '&:focus': {
            outline: 'none',
            borderColor: 'var(--bk-color-input-focus-border)',
        },
        '&::placeholder': {
            color: 'var(--bk-color-input-placeholder)',
        },
    },
});

/**
 * Options container
 */
export const optionsContainer = style({
    padding: 'var(--bk-spacing-1) 0',
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
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
    },
    sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
    },
    md: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
    },
    lg: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3-5)',
        fontSize: 'var(--bk-font-size-base)',
        minHeight: 'var(--bk-size-lg)',
    },
    xl: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-4)',
        fontSize: 'var(--bk-font-size-lg)',
        minHeight: 'var(--bk-size-xl)',
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
        gap: 'var(--bk-gap-sm)',
        cursor: 'pointer',
        transition: 'var(--bk-transition-colors)',
    },
    variants: {
        size: optionSizes,
        isHighlighted: {
            true: {
                backgroundColor: 'var(--bk-color-list-active)',
                color: 'var(--bk-color-list-active-foreground)',
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
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    marginLeft: 'var(--bk-spacing-2)',
});

/**
 * Empty message when no options
 */
export const emptyMessage = style({
    padding: 'var(--bk-spacing-4) var(--bk-spacing-3)',
    textAlign: 'center',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

/**
 * Description panel at bottom of dropdown
 */
export const descriptionPanel = style({
    padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
    backgroundColor: 'var(--bk-color-dropdown-background)',
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    lineHeight: 'var(--bk-line-height-relaxed)',
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
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-input-error)',
});