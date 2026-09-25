import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * The three roles are deliberately not symmetrical.
 *
 * A user turn is a bordered card and an agent turn is bare text. That
 * asymmetry is what makes a long run scannable — the reader's own turns are
 * the landmarks they navigate by, and giving both sides equal weight turns two
 * hundred entries into an undifferentiated wall.
 */
export const message = recipe({
    base: {
        display: 'flex',
        gap: 'var(--bk-gap-md)',
        minWidth: 0,
    },

    variants: {
        role: {
            user: {
                padding: 'var(--bk-padding-md)',
                backgroundColor: 'var(--bk-color-background-elevated)',
                border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
                borderRadius: 'var(--bk-radius-md)',
            },
            agent: {},
            system: {
                padding: 'var(--bk-padding-sm)',
                borderLeft: 'var(--bk-border-width-2) solid var(--bk-color-border)',
                color: 'var(--bk-color-foreground-muted)',
                fontSize: 'var(--bk-font-size-sm)',
            },
        },

        /** A send that has not landed yet is dimmed rather than hidden. */
        pending: {
            true: { opacity: 'var(--bk-opacity-60)' },
            false: {},
        },
    },

    defaultVariants: {
        role: 'agent',
        pending: false,
    },
});

export const body = style({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-sm)',
});

export const attachments = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
});

export const text = style({
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground)',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    minWidth: 0,
});

/**
 * The failed-send row.
 *
 * Sits below the message rather than replacing it, because the text the user
 * wrote is the thing they most need back — losing it is the failure this
 * component exists to prevent.
 */
export const failure = style({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-danger)',
});

export const retry = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'var(--bk-color-focus)',
    textDecoration: 'underline',

    selectors: {
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: 'var(--bk-spacing-0-5)',
            borderRadius: 'var(--bk-radius-sm)',
        },
    },
});

/**
 * Row of affordances on a message.
 *
 * Revealed on hover and on focus-within — not hover alone, which would put the
 * control out of reach of anyone navigating by keyboard. It stays laid out
 * either way, so revealing it does not reflow the transcript under the reader.
 */
export const actions = style({
    display: 'flex',
    gap: 'var(--bk-gap-sm)',
    marginTop: 'var(--bk-spacing-1)',
    opacity: 0,
    transition: 'var(--bk-transition-opacity, opacity 120ms ease)',

    selectors: {
        '[data-delivery] &:focus-within, *:hover > &': { opacity: 1 },
    },

    '@media': {
        // A touch device has no hover, so a permanently-hidden control would
        // simply not exist there.
        '(hover: none)': { opacity: 1 },
    },
});

export const action = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',

    selectors: {
        '&:hover': { color: 'var(--bk-color-foreground)' },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: 'var(--bk-spacing-0-5)',
            borderRadius: 'var(--bk-radius-sm)',
        },
    },
});
