import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const changes = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-2)',
        padding: 'var(--bk-spacing-3)',
        borderRadius: 'var(--bk-radius-md)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        backgroundColor: 'var(--bk-color-background-elevated)',
        minWidth: 0,
    },

    variants: {
        density: {
            compact: { padding: 'var(--bk-spacing-2)', gap: 'var(--bk-spacing-1)' },
            comfortable: {},
        },
    },

    defaultVariants: { density: 'comfortable' },
});

export const empty = style({
    padding: 'var(--bk-spacing-4)',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

export const title = style({
    flex: 1,
    minWidth: 0,
    fontSize: 'var(--bk-font-size-sm)',
    fontWeight: 'var(--bk-font-weight-semibold)',
});

export const actions = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
});

export const files = style({
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    minWidth: 0,
});

/**
 * A decided file stays in the list, dimmed.
 *
 * Removing it would make the list shorter as you work, which loses the record
 * of what you already said about each file and the ability to look again.
 */
export const file = style({
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    minWidth: 0,

    selectors: {
        '&:first-child': { borderTop: 'none' },
        '&[data-outcome]': { opacity: 'var(--bk-opacity-70)' },
    },
});

export const fileRow = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-spacing-1) 0',
    minWidth: 0,
});

export const disclosure = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    flex: 1,
    minWidth: 0,
    padding: 0,
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',

    selectors: {
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: '1px',
        },
    },
});

/** `direction: rtl` keeps the filename visible when a long path ellipsises. */
export const path = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    direction: 'rtl',
    textAlign: 'left',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const fileActions = style({
    display: 'flex',
    gap: 'var(--bk-spacing-0-5)',
    flexShrink: 0,
});

export const fileAction = style({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--bk-spacing-0-5)',
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

export const outcome = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-0-5)',
    flexShrink: 0,
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const diff = style({
    paddingBottom: 'var(--bk-spacing-2)',
    minWidth: 0,
});
