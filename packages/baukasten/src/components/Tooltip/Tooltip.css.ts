import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Transition duration for tooltip animations
const TRANSITION_DURATION = '150ms'; // var(--transition-fast) = 150ms

// Color mix percentage for semantic variant backgrounds
const VARIANT_BG_OPACITY = '15%'; // Subtle tint for better readability

/**
 * Trigger wrapper
 */
export const triggerWrapper = style({
    display: 'inline-block',
});

/**
 * Tooltip container with variants
 * Note: Positioning is now handled by Floating UI
 */
export const tooltipContainer = recipe({
    base: {
        display: 'inline-block',
        padding: 'var(--padding-sm) var(--padding-md)',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-width-1) solid',
        boxShadow: 'var(--shadow-lg)',
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-normal)',
        zIndex: 'var(--z-index-tooltip)',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        pointerEvents: 'none',
        opacity: 0,
        transform: 'scale(0.95)',
        transition: `opacity ${TRANSITION_DURATION} ease, transform ${TRANSITION_DURATION} ease`,
        selectors: {
            '&[data-status="open"]': {
                opacity: 1,
                transform: 'scale(1)',
            },
        },
    },
    variants: {
        variant: {
            default: {
                backgroundColor: 'var(--color-background-elevated)',
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-border)',
            },
            primary: {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                borderColor: 'var(--color-primary)',
            },
            success: {
                backgroundColor: `color-mix(in srgb, var(--color-success) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-success)',
            },
            warning: {
                backgroundColor: `color-mix(in srgb, var(--color-warning) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-warning)',
            },
            error: {
                backgroundColor: `color-mix(in srgb, var(--color-danger) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-danger)',
            },
            info: {
                backgroundColor: `color-mix(in srgb, var(--color-info) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
                color: 'var(--color-foreground)',
                borderColor: 'var(--color-info)',
            },
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

/**
 * Arrow element - styled to match Floating UI's FloatingArrow
 */
export const arrow = style({
    fill: 'var(--color-background-elevated)',
    stroke: 'var(--color-border)',
    strokeWidth: 1, // Matches var(--border-width-1)
    selectors: {
        // Match arrow color to parent tooltip variant
        '[data-variant="primary"] &': {
            fill: 'var(--color-primary)',
            stroke: 'var(--color-primary)',
        },
        '[data-variant="success"] &': {
            fill: `color-mix(in srgb, var(--color-success) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
            stroke: 'var(--color-success)',
        },
        '[data-variant="warning"] &': {
            fill: `color-mix(in srgb, var(--color-warning) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
            stroke: 'var(--color-warning)',
        },
        '[data-variant="error"] &': {
            fill: `color-mix(in srgb, var(--color-danger) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
            stroke: 'var(--color-danger)',
        },
        '[data-variant="info"] &': {
            fill: `color-mix(in srgb, var(--color-info) ${VARIANT_BG_OPACITY}, var(--color-background-elevated))`,
            stroke: 'var(--color-info)',
        },
    },
});
