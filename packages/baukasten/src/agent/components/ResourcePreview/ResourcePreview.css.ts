import { style } from '@vanilla-extract/css';

export const preview = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-2)',
    padding: 'var(--bk-spacing-3)',
    borderRadius: 'var(--bk-radius-md)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
    backgroundColor: 'var(--bk-color-background-elevated)',
    minWidth: 0,
});

export const header = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

export const icon = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
    alignSelf: 'center',
});

/**
 * `direction: rtl` keeps the tail of a long URI visible when it ellipsises.
 *
 * A resource is identified by the end of its path far more often than the
 * start, and truncating the wrong end makes a list of them unreadable.
 */
export const name = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    direction: 'rtl',
    textAlign: 'left',
    fontSize: 'var(--bk-font-size-sm)',
    fontWeight: 'var(--bk-font-weight-semibold)',
});

export const mime = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const size = style({
    flexShrink: 0,
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const description = style({
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground-muted)',
});

export const note = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const error = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-spacing-1)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-danger)',
});

export const reveal = style({
    padding: '0 var(--bk-spacing-1)',
    border: 'none',
    background: 'transparent',
    color: 'var(--bk-color-link)',
    font: 'inherit',
    cursor: 'pointer',
    textDecoration: 'underline',

    selectors: {
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: '1px',
        },
    },
});

export const content = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-1)',
    minWidth: 0,
});

export const contentName = style({
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const image = style({
    maxWidth: '100%',
    maxHeight: '240px',
    objectFit: 'contain',
    borderRadius: 'var(--bk-radius-sm)',
});
