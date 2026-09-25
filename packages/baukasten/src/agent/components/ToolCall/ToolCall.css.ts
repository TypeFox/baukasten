import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const toolCall = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        borderRadius: 'var(--bk-radius-md)',
        backgroundColor: 'var(--bk-color-background-elevated)',
        overflow: 'hidden',
        minWidth: 0,
    },

    variants: {
        /**
         * Only a protocol failure is given alarm colour.
         *
         * An execution failure is the tool working and reporting a problem the
         * agent will usually route around — colouring it like a breakage
         * trains the reader to ignore the colour by the twentieth entry.
         */
        tone: {
            normal: {},
            failed: { borderColor: 'var(--bk-color-danger)' },
        },
    },

    defaultVariants: { tone: 'normal' },
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    width: '100%',
    padding: 'var(--bk-padding-sm)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    color: 'var(--bk-color-foreground)',
    minWidth: 0,

    selectors: {
        '&:hover': { backgroundColor: 'var(--bk-color-secondary-hover)' },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: `calc(-1 * var(--bk-border-width-2))`,
        },
        '&[disabled]': { cursor: 'default' },
    },
});

export const statusSlot = style({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    width: 'var(--bk-spacing-4)',
});

export const statusDone = style({ color: 'var(--bk-color-success)' });
export const statusFailed = style({ color: 'var(--bk-color-danger)' });
export const statusPending = style({ color: 'var(--bk-color-foreground-muted)' });

export const kindIcon = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const serverIcon = style({
    flexShrink: 0,
    width: 'var(--bk-font-size-md)',
    height: 'var(--bk-font-size-md)',
    objectFit: 'contain',
});

export const label = style({
    flexShrink: 0,
    fontSize: 'var(--bk-font-size-xs)',
    fontWeight: 'var(--bk-font-weight-semibold)',
});

/**
 * The path or query the call acted on.
 *
 * `direction: rtl` so an over-long path ellipsises from the *left*. The tail of
 * a path is the informative half — every entry in a run shares the same
 * prefix, and truncating the end leaves twenty rows reading `src/services/te…`.
 */
export const target = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    direction: 'rtl',
    textAlign: 'left',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

/** Last line of output, shown while the call is still running. */
export const tail = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    opacity: 'var(--bk-opacity-80)',
});

export const elapsed = style({
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const spacer = style({ flex: 1, minWidth: 0 });

export const progress = style({
    padding: '0 var(--bk-padding-sm) var(--bk-spacing-2)',
});

export const body = style({
    padding: 'var(--bk-padding-sm)',
    borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    minWidth: 0,
});

export const errorRow = recipe({
    base: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--bk-gap-sm)',
        padding: 'var(--bk-padding-sm)',
        borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-relaxed)',
        minWidth: 0,
    },

    variants: {
        scope: {
            /** The agent will probably handle this. Informational. */
            execution: { color: 'var(--bk-color-foreground-muted)' },
            /** The agent cannot handle this. Someone has to look. */
            protocol: {
                color: 'var(--bk-color-danger)',
                backgroundColor: 'color-mix(in srgb, var(--bk-color-danger) 10%, transparent)',
            },
        },
    },

    defaultVariants: { scope: 'execution' },
});

export const errorText = style({
    minWidth: 0,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
});
