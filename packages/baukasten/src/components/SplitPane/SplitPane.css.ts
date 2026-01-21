import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Transition duration for divider hover/drag states
const TRANSITION_DURATION = '0.15s'; // var(--transition-fast) = 150ms

// Divider hit area sizing (extends beyond visual divider for better UX)
const HIT_AREA_EXTENSION = '3px'; // Extension on each side of 1px divider (var(--spacing-0-5) + var(--spacing-0-25))
const HIT_AREA_TOTAL = '7px'; // Total hit area width/height (1px + 2 * 3px)

// Gradient positions (centered in hit area)
const GRADIENT_THICK_START = '2px'; // (7px - 3px) / 2
const GRADIENT_THICK_END = '5px'; // 2px + 3px
const GRADIENT_THIN_START = '3px'; // (7px - 1px) / 2
const GRADIENT_THIN_END = '4px'; // 3px + 1px

/**
 * Split pane container with orientation variants
 */
export const container = recipe({
    base: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    variants: {
        orientation: {
            horizontal: {
                flexDirection: 'row',
            },
            vertical: {
                flexDirection: 'column',
            },
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
    },
});

/**
 * Pane container
 * Size is set via inline style (runtime-calculated)
 */
export const paneContainer = style({
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minWidth: 0,
    minHeight: 0,
});

/**
 * Divider wrapper - takes 1px in flex layout, contains the hit area
 * This wrapper ensures correct flex layout while allowing a larger hit area for Safari
 */
export const dividerWrapper = recipe({
    base: {
        flex: '0 0 1px',
        position: 'relative',
        zIndex: 10,
    },
    variants: {
        orientation: {
            horizontal: {},
            vertical: {},
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
    },
});

/**
 * Divider hit area - absolutely positioned to extend beyond the 1px wrapper
 * This ensures cursor works reliably in Safari
 * 
 * Behavior (VSCode-like):
 * - No highlight on immediate hover
 * - Becomes wider and highlighted after ~300ms hover (controlled via isHovered)
 * - Highlighted during drag (controlled via isDragging)
 */
export const divider = recipe({
    base: {
        position: 'absolute',
        backgroundColor: 'var(--color-border)',
        // Prevent text selection during drag
        WebkitUserSelect: 'none',
        userSelect: 'none',
        // Explicitly enable pointer events for Safari
        pointerEvents: 'auto',
        // Disable touch actions that might interfere
        touchAction: 'none',
        transition: `all ${TRANSITION_DURATION} ease`,
    },
    variants: {
        orientation: {
            horizontal: {
                // col-resize has better Safari support than ew-resize
                cursor: 'col-resize',
                // Position: extend on each side of the 1px wrapper for hit area
                top: 0,
                bottom: 0,
                left: `-${HIT_AREA_EXTENSION}`,
                right: `-${HIT_AREA_EXTENSION}`,
                width: HIT_AREA_TOTAL,
            },
            vertical: {
                // row-resize has better Safari support than ns-resize
                cursor: 'row-resize',
                // Position: extend on each side of the 1px wrapper for hit area
                left: 0,
                right: 0,
                top: `-${HIT_AREA_EXTENSION}`,
                bottom: `-${HIT_AREA_EXTENSION}`,
                height: HIT_AREA_TOTAL,
            },
        },
        isDragging: {
            true: {
                backgroundColor: 'var(--color-primary)',
            },
            false: {},
        },
        isHovered: {
            true: {
                backgroundColor: 'var(--color-primary-hover)',
            },
            false: {},
        },
    },
    compoundVariants: [
        // Horizontal + hovered: show wider divider (3px centered in 7px)
        {
            variants: {
                orientation: 'horizontal',
                isHovered: true,
            },
            style: {
                background: `linear-gradient(to right, transparent ${GRADIENT_THICK_START}, var(--color-primary-hover) ${GRADIENT_THICK_START}, var(--color-primary-hover) ${GRADIENT_THICK_END}, transparent ${GRADIENT_THICK_END})`,
            },
        },
        // Vertical + hovered: show wider divider (3px centered in 7px)
        {
            variants: {
                orientation: 'vertical',
                isHovered: true,
            },
            style: {
                background: `linear-gradient(to bottom, transparent ${GRADIENT_THICK_START}, var(--color-primary-hover) ${GRADIENT_THICK_START}, var(--color-primary-hover) ${GRADIENT_THICK_END}, transparent ${GRADIENT_THICK_END})`,
            },
        },
        // Horizontal + dragging: show wider divider with primary color
        {
            variants: {
                orientation: 'horizontal',
                isDragging: true,
            },
            style: {
                background: `linear-gradient(to right, transparent ${GRADIENT_THICK_START}, var(--color-primary) ${GRADIENT_THICK_START}, var(--color-primary) ${GRADIENT_THICK_END}, transparent ${GRADIENT_THICK_END})`,
            },
        },
        // Vertical + dragging: show wider divider with primary color
        {
            variants: {
                orientation: 'vertical',
                isDragging: true,
            },
            style: {
                background: `linear-gradient(to bottom, transparent ${GRADIENT_THICK_START}, var(--color-primary) ${GRADIENT_THICK_START}, var(--color-primary) ${GRADIENT_THICK_END}, transparent ${GRADIENT_THICK_END})`,
            },
        },
        // Horizontal + default (not hovered, not dragging): show 1px line
        {
            variants: {
                orientation: 'horizontal',
                isHovered: false,
                isDragging: false,
            },
            style: {
                background: `linear-gradient(to right, transparent ${GRADIENT_THIN_START}, var(--color-border) ${GRADIENT_THIN_START}, var(--color-border) ${GRADIENT_THIN_END}, transparent ${GRADIENT_THIN_END})`,
            },
        },
        // Vertical + default (not hovered, not dragging): show 1px line
        {
            variants: {
                orientation: 'vertical',
                isHovered: false,
                isDragging: false,
            },
            style: {
                background: `linear-gradient(to bottom, transparent ${GRADIENT_THIN_START}, var(--color-border) ${GRADIENT_THIN_START}, var(--color-border) ${GRADIENT_THIN_END}, transparent ${GRADIENT_THIN_END})`,
            },
        },
    ],
    defaultVariants: {
        orientation: 'horizontal',
        isDragging: false,
        isHovered: false,
    },
});
