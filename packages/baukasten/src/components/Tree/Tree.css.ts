import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * Tree container styles
 *
 * The tree container provides the root-level styling and sets up
 * CSS custom properties for edge color that child nodes inherit.
 */
export const treeContainer = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
        userSelect: 'none',
        vars: {
            '--bk-tree-edge-color': 'var(--bk-color-border)',
        },
    },

    variants: {
        size: {
            xs: {
                fontSize: 'var(--bk-font-size-xs)',
            },
            sm: {
                fontSize: 'var(--bk-font-size-sm)',
            },
            md: {
                fontSize: 'var(--bk-font-size-md)',
            },
            lg: {
                fontSize: 'var(--bk-font-size-base)',
            },
            xl: {
                fontSize: 'var(--bk-font-size-lg)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});

/**
 * Added to the tree container whenever it has been given a bounded height —
 * whether or not the rows inside it are windowed. A height cap without a
 * scroller would simply clip everything below the fold out of reach.
 *
 * The container is itself the scroll viewport the windowing measures against,
 * so there is no inner scroller: `getScrollElement` returns this element and
 * its `clientHeight` decides how many rows exist at any moment.
 */
export const treeScrollArea = style({
    overflowY: 'auto',
    overflowX: 'hidden',
    // `flexDirection: column` on the container would otherwise let the canvas
    // shrink below the total row height and confuse the scroll extent.
    display: 'block',
    // Hold the scrollbar's space open even while it is absent, so expanding a
    // branch past the fold does not shunt every row sideways as it appears.
    // Inert where scrollbars are drawn as overlays (macOS by default), which is
    // exactly where there was no shift to correct.
    scrollbarGutter: 'stable',
});

/**
 * The element rows are placed inside. When windowed it is given the full height
 * of every row, mounted or not, so the scrollbar reflects the whole list while
 * only the visible slice exists. When not windowed the rows simply stack.
 *
 * `role="presentation"` matters: ARIA requires a `treeitem` to sit directly
 * under its `tree`, and this div would otherwise break that chain.
 */
export const treeRowCanvas = style({
    position: 'relative',
    width: '100%',
});
