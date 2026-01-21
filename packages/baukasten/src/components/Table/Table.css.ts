import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Main table with variants
 */
export const table = recipe({
    base: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        color: 'var(--color-foreground)',
        fontFamily: 'inherit',
        backgroundColor: 'var(--color-background)',
    },
    variants: {
        fullWidth: {
            true: {
                width: '100%',
            },
            false: {
                width: 'auto',
            },
        },
        bordered: {
            true: {
                border: 'var(--border-width-1) solid var(--color-border)',
            },
            false: {
                border: 'var(--border-width-1) solid transparent',
            },
        },
    },
    defaultVariants: {
        fullWidth: true,
        bordered: true,
    },
});

/**
 * Table caption with side positioning
 */
export const caption = recipe({
    base: {
        padding: 'var(--spacing-2) var(--spacing-3)',
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-foreground)',
        textAlign: 'left',
    },
    variants: {
        captionSide: {
            top: {
                captionSide: 'top',
            },
            bottom: {
                captionSide: 'bottom',
            },
        },
    },
    defaultVariants: {
        captionSide: 'top',
    },
});

/**
 * Table head with sticky and bordered variants
 */
export const tableHead = recipe({
    base: {},
    variants: {
        sticky: {
            true: {
                position: 'sticky',
                top: 0,
                zIndex: 'var(--z-index-sticky)',
            },
            false: {},
        },
        bordered: {
            true: {},
            false: {},
        },
    },
    defaultVariants: {
        sticky: false,
        bordered: true,
    },
});

/**
 * Sticky header th cells get solid backgrounds
 */
globalStyle(`${tableHead.classNames.base} th`, {
    backgroundColor: 'var(--color-background-secondary)',
    position: 'relative',
});

/**
 * Remove top and bottom borders from th cells when sticky
 */
globalStyle(`thead[class*="sticky"] th`, {
    borderTop: 'none',
    borderBottom: 'none',
});

/**
 * Pseudo-element for sticky header cells background
 */
globalStyle(`${tableHead.classNames.base} th::before`, {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-background-secondary)',
    zIndex: -1,
});

/**
 * Top border for sticky bordered headers
 */
globalStyle(`thead[class*="sticky"][class*="bordered"]::before`, {
    content: '',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 'var(--border-width-1)',
    backgroundColor: 'var(--color-border)',
    zIndex: 2,
    pointerEvents: 'none',
});

/**
 * Bottom border for sticky bordered headers
 */
globalStyle(`thead[class*="sticky"][class*="bordered"]::after`, {
    content: '',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 'var(--border-width-1)',
    backgroundColor: 'var(--color-border)',
    zIndex: 2,
    pointerEvents: 'none',
});

/**
 * Cell size variants (used by both td and th)
 */
const cellSizes = styleVariants({
    xs: {
        padding: 'var(--spacing-0-5) var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
    },
    sm: {
        padding: 'var(--spacing-1) var(--spacing-2-5)',
        fontSize: 'var(--font-size-sm)',
    },
    md: {
        padding: 'var(--spacing-2) var(--spacing-3)',
        fontSize: 'var(--font-size-md)',
    },
    lg: {
        padding: 'var(--spacing-2-5) var(--spacing-4)',
        fontSize: 'var(--font-size-base)',
    },
    xl: {
        padding: 'var(--spacing-3) var(--spacing-5)',
        fontSize: 'var(--font-size-lg)',
    },
});

/**
 * Table body (minimal styling)
 */
export const tableBody = style({});

/**
 * Table footer
 */
export const tableFooter = recipe({
    base: {
        fontWeight: 'var(--font-weight-medium)',
        backgroundColor: 'var(--color-background-secondary)',
    },
    variants: {
        bordered: {
            true: {
                borderTop: 'var(--border-width-2) solid var(--color-border)',
            },
            false: {
                borderTop: 'var(--border-width-2) solid transparent',
            },
        },
    },
    defaultVariants: {
        bordered: true,
    },
});

/**
 * Table row with zebra striping and states
 */
export const tableRow = recipe({
    base: {
        transition: 'var(--transition-colors)',
        backgroundColor: 'var(--color-background)',
    },
    variants: {
        variant: {
            default: {
                backgroundColor: 'var(--color-background)',
            },
            zebra: {
                backgroundColor: 'transparent',
            },
        },
        selected: {
            true: {
                backgroundColor: 'var(--color-selected)',
                color: 'var(--color-selected-foreground)',
            },
            false: {},
        },
        hoverable: {
            true: {},
            false: {},
        },
    },
    compoundVariants: [
        {
            variants: {
                hoverable: true,
                selected: false,
            },
            style: {
                selectors: {
                    '&:hover': {
                        backgroundColor: 'var(--color-hover)',
                    },
                },
            },
        },
    ],
    defaultVariants: {
        variant: 'default',
        selected: false,
        hoverable: true,
    },
});

/**
 * Export the zebra row class name for use in globalStyle
 */
export const zebraRow = style({});

/**
 * Zebra striping for even rows in tbody
 */
globalStyle(`tbody tr${zebraRow}:nth-child(even)`, {
    backgroundColor: 'var(--color-background-secondary)',
});

/**
 * Table cell
 */
export const tableCell = recipe({
    base: {},
    variants: {
        align: {
            left: {
                textAlign: 'left',
            },
            center: {
                textAlign: 'center',
            },
            right: {
                textAlign: 'right',
            },
        },
        bordered: {
            true: {
                border: 'var(--border-width-1) solid var(--color-border)',
            },
            false: {
                border: 'var(--border-width-1) solid transparent',
            },
        },
        size: cellSizes,
    },
    defaultVariants: {
        align: 'left',
        bordered: true,
        size: 'md',
    },
});

/**
 * Table header cell
 */
export const tableHeaderCell = recipe({
    base: {
        fontWeight: 'var(--font-weight-medium)',
        backgroundColor: 'var(--color-background-secondary)',
        position: 'relative',
    },
    variants: {
        align: {
            left: {
                textAlign: 'left',
            },
            center: {
                textAlign: 'center',
            },
            right: {
                textAlign: 'right',
            },
        },
        bordered: {
            true: {
                border: 'var(--border-width-1) solid var(--color-border)',
            },
            false: {
                border: 'var(--border-width-1) solid transparent',
            },
        },
        size: cellSizes,
        sortable: {
            true: {
                cursor: 'pointer',
                userSelect: 'none',
                selectors: {
                    '&:hover': {
                        backgroundColor: 'var(--color-hover)',
                    },
                    '&:hover::before': {
                        backgroundColor: 'var(--color-hover)',
                    },
                    '&:active': {
                        backgroundColor: 'var(--color-active)',
                    },
                    '&:active::before': {
                        backgroundColor: 'var(--color-active)',
                    },
                },
            },
            false: {},
        },
    },
    defaultVariants: {
        align: 'left',
        bordered: true,
        size: 'md',
        sortable: false,
    },
});

/**
 * Table scroll wrapper for maxHeight
 */
export const tableScrollWrapper = recipe({
    base: {
        overflow: 'auto',
    },
    variants: {
        fullWidth: {
            true: {
                width: '100%',
            },
            false: {
                width: 'auto',
            },
        },
    },
    defaultVariants: {
        fullWidth: true,
    },
});

/**
 * Sort indicator
 */
export const sortIndicator = recipe({
    base: {
        display: 'inline-block',
        marginLeft: 'var(--spacing-1)',
        fontSize: '0.75em', // Relative to parent font size for proportional scaling
        transition: 'var(--transition-base)',
    },
    variants: {
        direction: {
            asc: {
                opacity: 1,
            },
            desc: {
                opacity: 1,
            },
            none: {
                opacity: 0.3, // Subtle indicator when column is sortable but not currently sorted
            },
        },
    },
    defaultVariants: {
        direction: 'none',
    },
});

/**
 * Sort indicator content based on direction
 */
globalStyle(`${sortIndicator.classNames.base}::before`, {
    content: '▲',
});

// Override for desc direction - we'll handle this with dynamic content in the component