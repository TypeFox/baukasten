import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const picker = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    minWidth: 0,
});

export const empty = style({
    padding: 'var(--bk-spacing-4)',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

export const group = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-1)',
    minWidth: 0,
});

export const groupHeader = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    paddingBottom: 'var(--bk-spacing-1)',
    borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
});

export const groupName = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 'var(--bk-font-size-xs)',
    fontWeight: 'var(--bk-font-weight-semibold)',
    letterSpacing: 'var(--bk-letter-spacing-wider)',
    textTransform: 'uppercase',
    color: 'var(--bk-color-foreground-muted)',
});

export const count = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const tools = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-0-5)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
});

/**
 * A row per tool.
 *
 * An unusable one is dimmed but still legible — the reason beside it is the
 * whole point of showing it, and text at disabled opacity that cannot be read
 * would defeat that.
 */
export const tool = recipe({
    base: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--bk-gap-sm)',
        padding: 'var(--bk-spacing-1) var(--bk-spacing-0-5)',
        borderRadius: 'var(--bk-radius-sm)',
        minWidth: 0,
    },

    variants: {
        usable: {
            true: {},
            false: { opacity: 'var(--bk-opacity-70)' },
        },
    },

    defaultVariants: { usable: true },
});

export const toolBody = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    minWidth: 0,
});

export const toolName = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--bk-gap-sm)',
    fontSize: 'var(--bk-font-size-sm)',
    fontFamily: 'var(--bk-font-family-mono)',
});

export const tokens = style({
    fontFamily: 'var(--bk-font-family)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const toolDescription = style({
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    lineHeight: 'var(--bk-line-height-relaxed)',
});

export const unavailable = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-warning)',
});
