import { style } from '@vanilla-extract/css';

export const meter = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-1)',
    minWidth: 0,
});

export const row = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

export const label = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const tokens = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});

/**
 * The percentage, tinted once it is worth noticing.
 *
 * The bar changes tone at the same thresholds. Two channels for one signal,
 * because a bar at 91% and a bar at 74% are hard to tell apart at a glance and
 * the number is not.
 */
export const percent = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    fontWeight: 'var(--bk-font-weight-semibold)',

    selectors: {
        '[data-tone="warning"] &': { color: 'var(--bk-color-warning)' },
        '[data-tone="danger"] &': { color: 'var(--bk-color-danger)' },
    },
});

export const detail = style({
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});
