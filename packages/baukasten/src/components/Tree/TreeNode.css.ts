import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Tree node row — the clickable/focusable horizontal strip, and the whole of a
 * node: rows are siblings in one flat list, so there is no per-node wrapper and
 * no children container. `position: relative` lets a row draw its own guides.
 */
export const treeNodeRow = recipe({
    base: {
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
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

// ─── Windowed placement ──────────────────────────────────────────────────────

/**
 * Applied to a row only while the tree is windowed. The mounted rows are an
 * arbitrary slice — row 4,000 may be the first — so they are lifted out of flow
 * and placed by `translateY` rather than stacking at the top of the canvas.
 */
export const treeRowWindowed = style({
    position: 'absolute',
    top: 0,
    left: 0,
});

// ─── Edge guide styles ───────────────────────────────────────────────────────

/**
 * Vertical guide line, drawn as a real element inside the row it belongs to and
 * positioned by an inline `left`. Rows are siblings rather than nested, so each
 * one draws the ancestor columns passing through it.
 *
 * Worth knowing: with `dashed` / `dotted` the dash pattern restarts at each row
 * boundary, since this is many one-row borders rather than one tall one.
 *
 * `span: 'full'` runs the line through the whole row, for a column that
 * continues below. `span: 'half'` stops at the vertical centre where the elbow
 * meets it — the last-child corner.
 */
export const edgeGuideVertical = recipe({
    base: {
        position: 'absolute',
        top: 0,
        width: 0,
        pointerEvents: 'none',
        borderLeftWidth: 'var(--bk-border-width-1)',
        borderLeftColor: 'var(--bk-tree-edge-color)',
    },

    variants: {
        edgeStyle: {
            solid: { borderLeftStyle: 'solid' },
            dashed: { borderLeftStyle: 'dashed' },
            dotted: { borderLeftStyle: 'dotted' },
            none: { display: 'none' },
        },
        span: {
            full: { bottom: 0 },
            half: { height: '50%' },
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
        span: 'full',
    },
});

/**
 * Horizontal connector running from a row's own guide column across to where
 * its content begins. Width is supplied inline, because it depends on
 * `indentSize` and on whether the row shows a chevron or only the spacer.
 */
export const edgeGuideHorizontal = recipe({
    base: {
        position: 'absolute',
        top: '50%',
        height: 0,
        pointerEvents: 'none',
        borderTopWidth: 'var(--bk-border-width-1)',
        borderTopColor: 'var(--bk-tree-edge-color)',
    },

    variants: {
        edgeStyle: {
            solid: { borderTopStyle: 'solid' },
            dashed: { borderTopStyle: 'dashed' },
            dotted: { borderTopStyle: 'dotted' },
            none: { display: 'none' },
        },
    },

    defaultVariants: {
        edgeStyle: 'solid',
    },
});
