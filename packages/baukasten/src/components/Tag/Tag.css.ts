import { recipe } from '@vanilla-extract/recipes';
import { globalStyle } from '@vanilla-extract/css';

/**
 * Tag component with size, variant, and outline variants.
 *
 * Visually distinct from Badge: uses rounded-rectangle shape (--bk-radius-sm)
 * instead of Badge's full pill (--bk-radius-full), and adds primary/secondary
 * variant options for categorization use-cases.
 */
export const tag = recipe({
    base: {
        // Layout
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--bk-radius-sm)',
        whiteSpace: 'nowrap',
        gap: 'var(--bk-gap-xs)',
        boxSizing: 'border-box',

        // Typography
        fontWeight: 'var(--bk-font-weight-medium)',

        // Interaction
        transition: 'var(--bk-transition-colors)',

        // Border
        border: 'var(--bk-border-width-1) solid transparent',
    },

    variants: {
        size: {
            xs: {
                padding: '0 var(--bk-spacing-0-5)',
                fontSize: 'var(--bk-font-size-xs)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            sm: {
                padding: '1px var(--bk-spacing-1)',
                fontSize: 'var(--bk-font-size-sm)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            md: {
                padding: '2px var(--bk-spacing-1-5)',
                fontSize: 'var(--bk-font-size-sm)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            lg: {
                padding: 'var(--bk-spacing-0-5) var(--bk-spacing-2)',
                fontSize: 'var(--bk-font-size-md)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
            xl: {
                padding: 'var(--bk-spacing-1) var(--bk-spacing-2-5)',
                fontSize: 'var(--bk-font-size-base)',
                lineHeight: 'var(--bk-line-height-tight)',
            },
        },

        variant: {
            default: {},
            primary: {},
            secondary: {},
            success: {},
            warning: {},
            error: {},
            info: {},
        },

        outline: {
            true: {},
            false: {},
        },
    },

    compoundVariants: [
        // ── Filled variants (outline: false) ────────────────────────────────
        // Solid backgrounds with contrasting foreground text

        {
            variants: { variant: 'default', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-badge-background)',
                color: 'var(--bk-color-badge-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'primary', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-primary)',
                color: 'var(--bk-color-primary-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'secondary', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-secondary)',
                color: 'var(--bk-color-secondary-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'success', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-success)',
                color: 'var(--bk-color-success-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'warning', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-warning)',
                color: 'var(--bk-color-warning-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'error', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-danger)',
                color: 'var(--bk-color-danger-foreground)',
                borderColor: 'transparent',
            },
        },
        {
            variants: { variant: 'info', outline: false },
            style: {
                backgroundColor: 'var(--bk-color-info)',
                color: 'var(--bk-color-info-foreground)',
                borderColor: 'transparent',
            },
        },

        // ── Outline variants (outline: true) ────────────────────────────────

        {
            variants: { variant: 'default', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-badge-foreground)',
                borderColor: 'var(--bk-color-border)',
            },
        },
        {
            variants: { variant: 'primary', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-primary)',
                borderColor: 'var(--bk-color-primary)',
            },
        },
        {
            variants: { variant: 'secondary', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-secondary-foreground)',
                borderColor: 'var(--bk-color-border)',
            },
        },
        {
            variants: { variant: 'success', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-success)',
                borderColor: 'var(--bk-color-success)',
            },
        },
        {
            variants: { variant: 'warning', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-warning)',
                borderColor: 'var(--bk-color-warning)',
            },
        },
        {
            variants: { variant: 'error', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-danger)',
                borderColor: 'var(--bk-color-danger)',
            },
        },
        {
            variants: { variant: 'info', outline: true },
            style: {
                backgroundColor: 'transparent',
                color: 'var(--bk-color-info)',
                borderColor: 'var(--bk-color-info)',
            },
        },
    ],

    defaultVariants: {
        size: 'md',
        variant: 'default',
        outline: false,
    },
});

/**
 * SVG sizing for icons within tags
 */
globalStyle(`${tag.classNames.base} svg`, {
    width: '1em',
    height: '1em',
    flexShrink: 0,
});
