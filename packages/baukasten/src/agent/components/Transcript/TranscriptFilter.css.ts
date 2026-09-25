import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * The filter row.
 *
 * Wraps rather than scrolls at compact density: in a 300px panel a
 * horizontally-scrolling toolbar hides controls behind a gesture nobody
 * discovers, and two short rows cost less than a hidden one.
 */
export const bar = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 0,
        gap: 'var(--bk-gap-sm)',
        padding: 'var(--bk-spacing-2)',
        borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    },

    variants: {
        density: {
            compact: { gap: 'var(--bk-spacing-1)', padding: 'var(--bk-spacing-1)' },
            comfortable: {},
        },
    },

    defaultVariants: { density: 'comfortable' },
});

export const search = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    flex: '1 1 8rem',
    minWidth: 0,
    padding: '0 var(--bk-spacing-1)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-input-background)',

    selectors: {
        '&:focus-within': { borderColor: 'var(--bk-color-input-focus-border)' },
    },
});

export const searchIcon = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const input = style({
    flex: 1,
    minWidth: 0,
    padding: 'var(--bk-spacing-1) 0',
    border: 'none',
    background: 'transparent',
    color: 'var(--bk-color-input-foreground)',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-xs)',
    outline: 'none',
});

export const toggles = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-spacing-1)',
});

export const group = style({
    display: 'flex',
    gap: 'var(--bk-spacing-1)',
    marginLeft: 'auto',
});

/**
 * A kind toggle.
 *
 * Pressed state is carried by background *and* text weight, not colour alone —
 * a row of these is read at a glance and a tint difference is the first thing
 * lost to a low-contrast theme.
 */
export const toggle = recipe({
    base: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--bk-spacing-1)',
        padding: '0 var(--bk-spacing-1)',
        minHeight: 'var(--bk-size-xs)',
        border: 'var(--bk-border-width-1) solid transparent',
        borderRadius: 'var(--bk-radius-sm)',
        background: 'transparent',
        color: 'var(--bk-color-foreground-muted)',
        fontFamily: 'inherit',
        fontSize: 'var(--bk-font-size-xs)',
        cursor: 'pointer',

        selectors: {
            '&:hover': { backgroundColor: 'var(--bk-color-secondary-hover)' },
            '&:focus-visible': {
                outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
                outlineOffset: '1px',
            },
        },
    },

    variants: {
        on: {
            true: {
                backgroundColor: 'var(--bk-color-secondary)',
                borderColor: 'var(--bk-color-border)',
                color: 'var(--bk-color-foreground)',
                fontWeight: 'var(--bk-font-weight-semibold)',
            },
            false: {
                opacity: 'var(--bk-opacity-70)',
            },
        },
    },

    defaultVariants: { on: true },
});

export const toggleLabel = style({
    whiteSpace: 'nowrap',
});

export const count = style({
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    opacity: 'var(--bk-opacity-70)',
});

export const action = style({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--bk-spacing-1)',
    border: 'none',
    borderRadius: 'var(--bk-radius-sm)',
    background: 'transparent',
    color: 'var(--bk-color-foreground-muted)',
    cursor: 'pointer',

    selectors: {
        '&:hover': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
            color: 'var(--bk-color-foreground)',
        },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: '1px',
        },
    },
});
