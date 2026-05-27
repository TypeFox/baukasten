import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Tree node wrapper — wraps the row + its children sub-tree.
 */
export const treeNodeWrapper = style({
    display: 'flex',
    flexDirection: 'column',
});

/**
 * Tree node row — the clickable/focusable horizontal strip.
 */
export const treeNodeRow = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'var(--bk-radius-sm)',
        transition: 'var(--bk-transition-colors)',
        color: 'var(--bk-color-foreground)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        // Tight line height keeps single-line rows compact and lets the
        // per-size minHeight (not the text box) decide the row height.
        lineHeight: 'var(--bk-line-height-tight)',
        textAlign: 'left',
        outline: 'none',

        selectors: {
            '&:focus-visible': {
                outline: 'var(--bk-border-width-2) solid var(--bk-color-list-focus-outline)',
                outlineOffset: 'calc(-1 * var(--bk-border-width-2))',
            },
        },
    },

    variants: {
        // Row heights come from the spacing scale, NOT --bk-size-* (which is
        // the interactive-control height scale, tuned for click targets on
        // buttons/inputs). A tree row is a scannable list row — density beats
        // hit-target comfort — so it gets its own tighter scale.
        size: {
            xs: {
                padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
                gap: 'var(--bk-gap-xs)',
                minHeight: 'var(--bk-spacing-4)',
            },
            sm: {
                padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
                gap: 'var(--bk-gap-xs)',
                minHeight: 'var(--bk-spacing-5)',
            },
            md: {
                padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
                gap: 'var(--bk-gap-sm)',
                minHeight: 'var(--bk-spacing-6)',
            },
            lg: {
                padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
                gap: 'var(--bk-gap-md)',
                minHeight: 'var(--bk-spacing-7)',
            },
            xl: {
                padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3)',
                gap: 'var(--bk-gap-md)',
                minHeight: 'var(--bk-spacing-8)',
            },
        },
        selected: {
            true: {
                backgroundColor: 'var(--bk-color-list-active)',
                color: 'var(--bk-color-list-active-foreground)',
            },
            false: {},
        },
        disabled: {
            true: {
                opacity: 'var(--bk-opacity-disabled)',
                cursor: 'not-allowed',
            },
            false: {},
        },
    },

    defaultVariants: {
        size: 'md',
        selected: false,
        disabled: false,
    },
});

/**
 * Hover and active states — only when not disabled and not selected.
 */
const rowBase = treeNodeRow.classNames.base;

globalStyle(`${rowBase}:hover:not([aria-disabled="true"]):not([aria-selected="true"])`, {
    backgroundColor: 'var(--bk-color-list-hover)',
});

globalStyle(`${rowBase}:active:not([aria-disabled="true"])`, {
    backgroundColor: 'var(--bk-color-list-active)',
});

/**
 * SVG icon sizing within tree rows
 */
globalStyle(`${rowBase} svg`, {
    width: '1em',
    height: '1em',
    flexShrink: 0,
});

/**
 * Expand icon container
 */
export const expandIconWrapper = recipe({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform var(--bk-transition-base)',
    },

    variants: {
        expanded: {
            true: {
                transform: 'rotate(90deg)',
            },
            false: {
                transform: 'rotate(0deg)',
            },
        },
    },

    defaultVariants: {
        expanded: false,
    },
});

/**
 * Placeholder spacer for leaf nodes (aligns with expand icon width).
 */
export const expandIconSpacer = style({
    display: 'inline-flex',
    width: '1em',
    flexShrink: 0,
});

/**
 * Node icon container (the custom icon before the label)
 */
export const nodeIconWrapper = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
});

/**
 * Node label — fills remaining space
 */
export const nodeLabel = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

/**
 * Right-side badge / action area
 */
export const nodeBadge = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    marginLeft: 'auto',
    paddingLeft: 'var(--bk-spacing-2)',
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
    fontSize: '0.875em',
});

// ─── Children container with tree-edge guides ────────────────────────────────

/**
 * Children wrapper — rendered beneath the parent row.
 * Uses CSS Grid animation for smooth expand/collapse.
 */
export const childrenContainer = recipe({
    base: {
        display: 'grid',
        position: 'relative',
        transition:
            'grid-template-rows var(--bk-transition-slow), opacity var(--bk-transition-base)',
    },

    variants: {
        isOpen: {
            true: {
                gridTemplateRows: '1fr',
                opacity: 1,
            },
            false: {
                gridTemplateRows: '0fr',
                opacity: 0,
            },
        },
    },

    defaultVariants: {
        isOpen: false,
    },
});

/**
 * Inner children wrapper — required for CSS Grid animation.
 */
export const childrenInner = style({
    overflow: 'hidden',
    minHeight: 0,
});

// ─── Edge guide styles ───────────────────────────────────────────────────────

/**
 * Each child node is wrapped in an edge-guide container that draws the
 * connector lines from parent to child.  The indent is applied here.
 */
export const edgeGuideContainer = recipe({
    base: {
        position: 'relative',
    },

    variants: {
        edgeStyle: {
            solid: {},
            dashed: {},
            dotted: {},
            none: {},
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
    },
});

/**
 * Vertical edge line for a single node's row.
 *
 * `edgeGuideContainer` wraps ONLY the row, so its height equals one row.
 * That lets the line be positioned with pure percentages, no row-height
 * variable needed:
 *  - `top: -50%` reaches half a row up — to the parent / previous-sibling
 *    row centre (the previous wrapper is exactly one row above).
 *  - `height: 100%` ends the line at this row's own centre.
 *  - `height: 150%` extends it to this row's bottom, where the
 *    `edgeChildLine` (drawn on the children group) takes over.
 *
 * `extendDown` is true only for an expanded parent that has a sibling
 * below it — the one case where the line must continue past the row.
 */
export const edgeVerticalLine = recipe({
    base: {
        selectors: {
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: 'var(--bk-tree-indent-center)',
                width: 0,
                borderLeftWidth: 'var(--bk-border-width-1)',
                borderLeftColor: 'var(--bk-tree-edge-color)',
            },
        },
    },

    variants: {
        edgeStyle: {
            solid: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'solid',
                    },
                },
            },
            dashed: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'dashed',
                    },
                },
            },
            dotted: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'dotted',
                    },
                },
            },
            none: {
                selectors: {
                    '&::before': {
                        display: 'none',
                    },
                },
            },
        },
        extendDown: {
            true: {
                selectors: {
                    // Reach this row's bottom to meet the children-group line
                    '&::before': {
                        height: '150%',
                    },
                },
            },
            false: {
                selectors: {
                    // Stop at this row's centre
                    '&::before': {
                        height: '100%',
                    },
                },
            },
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
        extendDown: false,
    },
});

/**
 * Horizontal connector from the vertical line to the node row.
 * Drawn using an ::after pseudo-element.
 */
export const edgeHorizontalLine = recipe({
    base: {
        selectors: {
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 'var(--bk-tree-indent-center)',
                width: 'var(--bk-tree-branch-width)',
                height: 0,
                borderTopWidth: 'var(--bk-border-width-1)',
                borderTopColor: 'var(--bk-tree-edge-color)',
            },
        },
    },

    variants: {
        edgeStyle: {
            solid: {
                selectors: {
                    '&::after': {
                        borderTopStyle: 'solid',
                    },
                },
            },
            dashed: {
                selectors: {
                    '&::after': {
                        borderTopStyle: 'dashed',
                    },
                },
            },
            dotted: {
                selectors: {
                    '&::after': {
                        borderTopStyle: 'dotted',
                    },
                },
            },
            none: {
                selectors: {
                    '&::after': {
                        display: 'none',
                    },
                },
            },
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
    },
});

/**
 * Vertical edge line drawn on a node's children group.
 *
 * `childrenContainer` spans the node's entire expanded subtree, so this
 * `::before` carries the guide line *through* that subtree — from the
 * node's row bottom down to its next sibling — keeping the line unbroken
 * when a folder is expanded. Applied only to non-last nodes (a last node
 * has no sibling below to connect to). Sits at the node's own indent
 * column, so it reuses the same `--bk-tree-indent-center` value as the row.
 */
export const edgeChildLine = recipe({
    base: {
        selectors: {
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 'var(--bk-tree-indent-center)',
                width: 0,
                borderLeftWidth: 'var(--bk-border-width-1)',
                borderLeftColor: 'var(--bk-tree-edge-color)',
            },
        },
    },

    variants: {
        edgeStyle: {
            solid: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'solid',
                    },
                },
            },
            dashed: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'dashed',
                    },
                },
            },
            dotted: {
                selectors: {
                    '&::before': {
                        borderLeftStyle: 'dotted',
                    },
                },
            },
            none: {
                selectors: {
                    '&::before': {
                        display: 'none',
                    },
                },
            },
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
    },
});
