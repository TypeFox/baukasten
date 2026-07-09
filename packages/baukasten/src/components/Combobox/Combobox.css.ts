import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Combobox container with fullWidth variant
 */
export const comboboxContainer = recipe({
    base: {
        position: 'relative',
        flexDirection: 'column',
        gap: 'var(--bk-gap-xs)',
        minWidth: 'calc(var(--bk-spacing-20) * 2.5)', // 200px equivalent
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
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
 * Control (outer focusable box, used as the Floating UI reference) size variants
 */
const controlSizes = styleVariants({
    xs: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
        minHeight: 'var(--bk-size-xs)',
    },
    sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
        minHeight: 'var(--bk-size-sm)',
    },
    md: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3)',
        minHeight: 'var(--bk-size-md)',
    },
    lg: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-3-5)',
        minHeight: 'var(--bk-size-lg)',
    },
    xl: {
        padding: 'var(--bk-spacing-2-5) var(--bk-spacing-4)',
        minHeight: 'var(--bk-size-xl)',
    },
});

/**
 * Control box - the outer, focusable, container that hosts the inline chips, the inline input, and the indicator cluster.
 */
export const control = recipe({
    base: {
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: 'var(--bk-color-input-background)',
        color: 'var(--bk-color-input-foreground)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
        borderRadius: 'var(--bk-radius-sm)',
        fontFamily: 'inherit',
        cursor: 'text',
        transition: 'var(--bk-transition-colors)',
        flex: '1 1 0%',

        selectors: {
            '&:hover': {
                borderColor: 'var(--bk-color-border-hover)',
            },
            '&:focus-within': {
                outline: 'none',
                borderColor: 'var(--bk-color-input-focus-border)',
            },
        },
    },
    variants: {
        size: controlSizes,
        fullWidth: {
            true: {
                width: '100%',
            },
            false: {},
        },
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
                    '&:focus-within': {
                        borderColor: 'var(--bk-color-input-error)',
                    },
                },
            },
            false: {},
        },
        disabled: {
            true: {
                opacity: 'var(--bk-opacity-disabled)',
                cursor: 'not-allowed',
                selectors: {
                    '&:hover': {
                        borderColor: 'var(--bk-color-input-border)',
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
        disabled: false,
    },
});

/**
 * Inner wrap row holding chips + the inline input
 */
export const controlInner = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    flex: '1 1 auto',
    minWidth: 0,
});

/**
 * Chip wrapper (applied alongside Tag's own className)
 */
export const chip = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    maxWidth: '100%',
});

/**
 * Chip remove button
 */
export const chipRemoveButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    padding: 0,
    marginLeft: 'var(--bk-spacing-0-5)',
    color: 'inherit',
    cursor: 'pointer',
    borderRadius: 'var(--bk-radius-full)',
    lineHeight: 0,

    selectors: {
        '&:hover:not(:disabled)': {
            opacity: 'var(--bk-opacity-hover)',
        },
        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 'var(--bk-opacity-disabled)',
        },
    },
});

/**
 * Inline input size variants (typography only - box model comes from `control`)
 */
const inputSizes = styleVariants({
    xs: { fontSize: 'var(--bk-font-size-xs)' },
    sm: { fontSize: 'var(--bk-font-size-sm)' },
    md: { fontSize: 'var(--bk-font-size-md)' },
    lg: { fontSize: 'var(--bk-font-size-base)' },
    xl: { fontSize: 'var(--bk-font-size-lg)' },
});

/**
 * Wrapper around the inline input, used to position the single-value
 * overlay (for custom `renderValue`) above the (then-empty) input.
 */
export const inputWrapper = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    minWidth: 0,
});

/**
 * Overlay showing a custom-rendered single value while the combobox is
 * closed. Sits on top of the (empty) input; pointer events pass through so
 * clicking still focuses/opens the control.
 */
export const singleValue = style({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
});

/**
 * Inline (transparent, borderless) input
 */
export const input = recipe({
    base: {
        flex: '1 1 auto',
        minWidth: 'var(--bk-spacing-10)',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: 'inherit',
        fontFamily: 'inherit',
        padding: 0,

        selectors: {
            '&:disabled': {
                cursor: 'not-allowed',
            },
        },
    },
    variants: {
        size: inputSizes,
    },
    defaultVariants: {
        size: 'md',
    },
});

/**
 * Placeholder text color (wired to the inline input's ::placeholder pseudo-element)
 */
export const placeholder = style({
    color: 'var(--bk-color-input-placeholder)',
});

globalStyle(`${input.classNames.base}::placeholder`, {
    color: 'var(--bk-color-input-placeholder)',
});

/**
 * Right-side indicator cluster (spinner / clear button / chevron)
 */
export const indicators = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    flexShrink: 0,
    marginLeft: 'var(--bk-gap-xs)',
});

/**
 * Clear button layout
 */
export const clearButton = style({
    flexShrink: 0,
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
 * Scrollable listbox container
 */
export const listContainer = style({
    padding: 'var(--bk-spacing-1) 0',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    flex: '1 1 auto',
});

/**
 * Virtualized list spacer (sized to the virtualizer's total size)
 */
export const virtualSpacer = style({
    position: 'relative',
    width: '100%',
});

/**
 * Virtualized row wrapper (positioned via inline transform)
 */
export const virtualRow = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
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
 * Option with variants for highlight and disabled states
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
 * Group heading size variants
 */
const groupHeadingSizes = styleVariants({
    xs: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-xs)',
    },
    sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-xs)',
    },
    md: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-xs)',
    },
    lg: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3-5)',
        fontSize: 'var(--bk-font-size-sm)',
    },
    xl: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-4)',
        fontSize: 'var(--bk-font-size-sm)',
    },
});

/**
 * Group heading - muted, non-interactive, presentational row
 */
export const groupHeading = recipe({
    base: {
        fontWeight: 'var(--bk-font-weight-medium)',
        color: 'var(--bk-color-foreground-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        cursor: 'default',
        userSelect: 'none',
    },
    variants: {
        size: groupHeadingSizes,
    },
    defaultVariants: {
        size: 'md',
    },
});

/**
 * Creatable "create option" row with a leading "+" affordance
 */
export const createOption = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--bk-gap-sm)',
        cursor: 'pointer',
        color: 'var(--bk-color-primary)',
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
    },
    defaultVariants: {
        size: 'md',
        isHighlighted: false,
    },
});

/**
 * Empty message when no options match
 */
export const emptyMessage = style({
    padding: 'var(--bk-spacing-4) var(--bk-spacing-3)',
    textAlign: 'center',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

/**
 * Loading message
 */
export const loadingMessage = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-spacing-4) var(--bk-spacing-3)',
    textAlign: 'center',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

/**
 * Error text
 */
export const errorText = style({
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-input-error)',
});
