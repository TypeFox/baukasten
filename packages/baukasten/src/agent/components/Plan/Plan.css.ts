import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const plan = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-padding-md)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    borderRadius: 'var(--bk-radius-md)',
    backgroundColor: 'var(--bk-color-background-elevated)',
    minWidth: 0,
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    fontSize: 'var(--bk-font-size-xs)',
    fontWeight: 'var(--bk-font-weight-semibold)',
    letterSpacing: 'var(--bk-letter-spacing-wider)',
    textTransform: 'uppercase',
    color: 'var(--bk-color-foreground-muted)',
});

export const count = style({
    marginLeft: 'auto',
    fontVariantNumeric: 'tabular-nums',
    textTransform: 'none',
    letterSpacing: 'normal',
});

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-xs)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
});

export const item = recipe({
    base: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--bk-gap-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-relaxed)',
        minWidth: 0,
    },

    variants: {
        status: {
            pending: { color: 'var(--bk-color-foreground-muted)' },
            active: {
                color: 'var(--bk-color-foreground)',
                fontWeight: 'var(--bk-font-weight-semibold)',
            },
            /**
             * Struck through and dimmed rather than removed.
             *
             * A plan is read for its shape as much as its remaining work —
             * dropping finished steps makes a long plan look like it never had
             * them, and loses the sense of progress that makes it worth showing.
             */
            done: {
                color: 'var(--bk-color-foreground-muted)',
                textDecoration: 'line-through',
            },
        },
    },

    defaultVariants: { status: 'pending' },
});

export const itemIcon = recipe({
    base: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        height: 'var(--bk-line-height-relaxed)',
    },

    variants: {
        status: {
            pending: { color: 'var(--bk-color-foreground-muted)' },
            active: { color: 'var(--bk-color-focus)' },
            done: { color: 'var(--bk-color-success)' },
        },
    },

    defaultVariants: { status: 'pending' },
});

export const itemText = style({
    minWidth: 0,
    wordBreak: 'break-word',
});

export const priority = style({
    flexShrink: 0,
    marginLeft: 'auto',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-warning)',
});
