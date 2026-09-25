import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const log = style({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    flex: 1,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const toolbar = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    flexShrink: 0,
    padding: 'var(--bk-spacing-2)',
    borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
});

export const searchIcon = style({
    color: 'var(--bk-color-foreground-muted)',
});

export const filter = style({
    flex: 1,
    minWidth: 0,
    padding: 'var(--bk-spacing-1)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-input-background)',
    color: 'var(--bk-color-input-foreground)',
    font: 'inherit',
    outline: 'none',

    selectors: {
        '&:focus': { borderColor: 'var(--bk-color-input-focus-border)' },
    },
});

export const count = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const revealToggle = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family)',
    color: 'var(--bk-color-foreground-muted)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
});

export const scroll = style({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
});

export const virtualContent = style({
    position: 'relative',
    width: '100%',
});

export const virtualRow = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
});

export const empty = style({
    padding: 'var(--bk-spacing-4)',
    fontFamily: 'var(--bk-font-family)',
    color: 'var(--bk-color-foreground-muted)',
});

/**
 * One message.
 *
 * Direction is carried by the arrow and a faint tint rather than by colour
 * alone, because a log read at speed is read by shape.
 */
export const row = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--bk-gap-sm)',
        width: '100%',
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
        border: 'none',
        background: 'transparent',
        color: 'var(--bk-color-foreground)',
        font: 'inherit',
        textAlign: 'left',
        cursor: 'pointer',

        selectors: {
            '&:hover': { backgroundColor: 'var(--bk-color-secondary-hover)' },
            '&:focus-visible': {
                outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
                outlineOffset: '-2px',
            },
        },
    },

    variants: {
        direction: {
            outgoing: {},
            incoming: {
                backgroundColor: 'color-mix(in srgb, var(--bk-color-focus) 4%, transparent)',
            },
        },
        failed: {
            true: { color: 'var(--bk-color-danger)' },
            false: {},
        },
    },

    defaultVariants: { direction: 'outgoing', failed: false },
});

export const direction = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const method = style({
    flexShrink: 0,
    fontWeight: 'var(--bk-font-weight-semibold)',
});

export const server = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'var(--bk-color-foreground-muted)',
});

/** A retry chain. The one thing a stateless log needs that a text log cannot give. */
export const chain = style({
    flexShrink: 0,
    padding: '0 var(--bk-spacing-1)',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-secondary)',
    color: 'var(--bk-color-secondary-foreground)',
});

export const duration = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const errorIcon = style({
    flexShrink: 0,
    color: 'var(--bk-color-danger)',
});

export const payload = style({
    margin: 0,
    padding: 'var(--bk-spacing-2) var(--bk-spacing-4)',
    maxHeight: '320px',
    overflow: 'auto',
    backgroundColor: 'var(--bk-color-code-background)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    tabSize: 2,
});
