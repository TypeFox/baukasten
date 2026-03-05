import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * DataTable wrapper
 */
export const dataTableWrapper = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-3)',
        width: '100%',
    },
    variants: {
        fillHeight: {
            true: {
                height: '100%',
            },
            false: {},
        },
    },
    defaultVariants: {
        fillHeight: false,
    },
});

/**
 * Table container with scroll support
 */
export const tableContainer = recipe({
    base: {
        overflow: 'auto',
        backgroundColor: 'var(--bk-color-background)',
        borderRadius: 'var(--bk-radius-md)',
    },
    variants: {
        bordered: {
            true: {
                border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
            },
            false: {},
        },
        fillHeight: {
            true: {
                flex: 1,
                minHeight: 0, // Critical: allows flex item to shrink below content size
            },
            false: {},
        },
    },
    defaultVariants: {
        bordered: true,
        fillHeight: false,
    },
});

/**
 * Main table
 */
export const table = recipe({
    base: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        color: 'var(--bk-color-foreground)',
        fontFamily: 'inherit',
        backgroundColor: 'var(--bk-color-background)',
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
 * Table head
 */
export const tableHead = recipe({
    base: {},
    variants: {
        sticky: {
            true: {
                position: 'sticky',
                top: 0,
                zIndex: 'var(--bk-z-index-sticky)',
            },
            false: {},
        },
    },
    defaultVariants: {
        sticky: false,
    },
});

/**
 * Sticky header th cells
 */
globalStyle(`${tableHead.classNames.base} th`, {
    backgroundColor: 'var(--bk-color-background-secondary)',
    position: 'relative',
});

/**
 * Cell size variants
 */
const cellSizes = {
    xs: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-xs)',
    },
    sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-sm)',
    },
    md: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-md)',
    },
    lg: {
        padding: 'var(--bk-spacing-2-5) var(--bk-spacing-4)',
        fontSize: 'var(--bk-font-size-base)',
    },
    xl: {
        padding: 'var(--bk-spacing-3) var(--bk-spacing-5)',
        fontSize: 'var(--bk-font-size-lg)',
    },
} as const;

/**
 * Table header cell
 */
export const tableHeaderCell = recipe({
    base: {
        fontWeight: 'var(--bk-font-weight-medium)',
        backgroundColor: 'var(--bk-color-background-secondary)',
        position: 'relative',
        whiteSpace: 'nowrap',
        // Ensure isolation for proper stacking context (prevents bleed-through on sticky)
        isolation: 'isolate',
    },
    variants: {
        align: {
            left: { textAlign: 'left' },
            center: { textAlign: 'center' },
            right: { textAlign: 'right' },
        },
        bordered: {
            true: {
                borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
            },
            false: {},
        },
        size: cellSizes,
        sortable: {
            true: {
                cursor: 'pointer',
                userSelect: 'none',
                // Use pseudo-element for hover overlay to preserve solid background underneath
                selectors: {
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'transparent',
                        transition: 'var(--bk-transition-colors)',
                        pointerEvents: 'none',
                        zIndex: -1,
                    },
                    '&:hover::after': {
                        backgroundColor: 'var(--bk-color-hover)',
                    },
                    '&:active::after': {
                        backgroundColor: 'var(--bk-color-active)',
                    },
                },
            },
            false: {},
        },
        resizable: {
            true: {
                position: 'relative',
            },
            false: {},
        },
    },
    defaultVariants: {
        align: 'left',
        bordered: true,
        size: 'md',
        sortable: false,
        resizable: false,
    },
});

/**
 * Header content wrapper
 */
export const headerContent = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
});

/**
 * Sort indicator
 */
export const sortIndicator = recipe({
    base: {
        display: 'inline-flex',
        marginLeft: 'var(--bk-spacing-1)',
        fontSize: '0.75em',
        opacity: 0.5,
        transition: 'var(--bk-transition-base)',
    },
    variants: {
        active: {
            true: {
                opacity: 1,
            },
            false: {},
        },
    },
});

/**
 * Column resizer handle
 */
export const resizer = recipe({
    base: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 'var(--bk-spacing-1-5)',
        cursor: 'col-resize',
        userSelect: 'none',
        touchAction: 'none',
        backgroundColor: 'transparent',
        transition: 'background-color var(--bk-transition-fast)',
        selectors: {
            '&:hover': {
                backgroundColor: 'var(--bk-color-primary)',
            },
        },
    },
    variants: {
        isResizing: {
            true: {
                backgroundColor: 'var(--bk-color-primary)',
                opacity: 1,
            },
            false: {},
        },
    },
});

/**
 * Table body
 */
export const tableBody = style({});

/**
 * Table row
 */
export const tableRow = recipe({
    base: {
        transition: 'var(--bk-transition-colors)',
        backgroundColor: 'var(--bk-color-background)',
    },
    variants: {
        variant: {
            default: {
                backgroundColor: 'var(--bk-color-background)',
            },
            zebra: {
                backgroundColor: 'transparent',
            },
        },
        selected: {
            true: {
                backgroundColor: 'var(--bk-color-selected)',
                color: 'var(--bk-color-selected-foreground)',
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
                        backgroundColor: 'var(--bk-color-hover)',
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
 * Zebra row class
 */
export const zebraRow = style({});

/**
 * Zebra striping for even rows
 */
globalStyle(`tbody tr${zebraRow}:nth-child(even)`, {
    backgroundColor: 'var(--bk-color-background-secondary)',
});

/**
 * Table cell
 */
export const tableCell = recipe({
    base: {},
    variants: {
        align: {
            left: { textAlign: 'left' },
            center: { textAlign: 'center' },
            right: { textAlign: 'right' },
        },
        bordered: {
            true: {
                borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
            },
            false: {},
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
 * Pagination container
 */
export const paginationContainer = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 'var(--bk-spacing-3)',
    padding: 'var(--bk-spacing-3) 0',
});

/**
 * Pagination info
 */
export const paginationInfo = style({
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-secondary-foreground)',
});

/**
 * Pagination controls
 */
export const paginationControls = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-2)',
});

/**
 * Page size select wrapper
 */
export const pageSizeSelect = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-2)',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-secondary-foreground)',
});

/**
 * Empty state
 */
export const emptyState = style({
    padding: 'var(--bk-spacing-8)',
    textAlign: 'center',
    color: 'var(--bk-color-secondary-foreground)',
});

/**
 * Loading slide animation
 */
const loadingSlide = keyframes({
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(400%)' },
});

/**
 * Loading row (zero-height row in thead)
 */
export const loadingRow = style({
    height: 0,
    padding: 0,
    margin: 0,
    border: 'none',
});

/**
 * Loading cell (spans all columns)
 */
export const loadingCell = style({
    padding: 0,
    margin: 0,
    border: 'none',
    position: 'relative',
    height: 'var(--bk-spacing-1)',
});

/**
 * Loading line container (shown under header)
 */
export const loadingLine = style({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 'var(--bk-spacing-1)',
    overflow: 'hidden',
    backgroundColor: 'var(--bk-color-border)',
    zIndex: 10,
});

/**
 * Animated loading bar
 */
export const loadingBar = style({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '25%',
    backgroundColor: 'var(--bk-color-primary)',
    animation: `${loadingSlide} 1.2s ease-in-out infinite`,
});

/**
 * Loading overlay (for spinner mode)
 */
export const loadingOverlay = style({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    '::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--bk-color-background)',
        opacity: 0.85,
    },
});

/**
 * Checkbox cell
 */
export const checkboxCell = style({
    width: 'var(--bk-spacing-10)',
    minWidth: 'var(--bk-spacing-10)',
    maxWidth: 'var(--bk-spacing-10)',
});

/**
 * Toolbar
 */
export const toolbar = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--bk-spacing-3)',
    flexWrap: 'wrap',
});
