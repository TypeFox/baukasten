import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Transition duration for tooltip animations
const TRANSITION_DURATION = '150ms'; // var(--bk-transition-fast) = 150ms

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
        padding: 'var(--bk-padding-sm) var(--bk-padding-md)',
        borderRadius: 'var(--bk-radius-md)',
        border: 'var(--bk-border-width-1) solid',
        boxShadow: 'var(--bk-shadow-lg)',
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-normal)',
        zIndex: 'var(--bk-z-index-tooltip)',
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
                backgroundColor: 'var(--bk-color-background-elevated)',
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-border)',
            },
            primary: {
                backgroundColor: 'var(--bk-color-primary)',
                color: 'var(--bk-color-primary-foreground)',
                borderColor: 'var(--bk-color-primary)',
            },
            success: {
                backgroundColor: `color-mix(in srgb, var(--bk-color-success) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-success)',
            },
            warning: {
                backgroundColor: `color-mix(in srgb, var(--bk-color-warning) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-warning)',
            },
            error: {
                backgroundColor: `color-mix(in srgb, var(--bk-color-danger) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-danger)',
            },
            info: {
                backgroundColor: `color-mix(in srgb, var(--bk-color-info) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
                color: 'var(--bk-color-foreground)',
                borderColor: 'var(--bk-color-info)',
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
    fill: 'var(--bk-color-background-elevated)',
    selectors: {
        // Match arrow color to parent tooltip variant
        '[data-variant="primary"] &': {
            fill: 'var(--bk-color-primary)',
        },
        '[data-variant="success"] &': {
            fill: `color-mix(in srgb, var(--bk-color-success) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
        },
        '[data-variant="warning"] &': {
            fill: `color-mix(in srgb, var(--bk-color-warning) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
        },
        '[data-variant="error"] &': {
            fill: `color-mix(in srgb, var(--bk-color-danger) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
        },
        '[data-variant="info"] &': {
            fill: `color-mix(in srgb, var(--bk-color-info) ${VARIANT_BG_OPACITY}, var(--bk-color-background-elevated))`,
        },
    },
});
