import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-sm)',
});

export const empty = style({
    padding: 'var(--bk-spacing-4)',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
});

/**
 * The card, tinted by health.
 *
 * Only the two states that need action get a border colour. `ok` and `unknown`
 * are deliberately quiet: a panel of servers is looked at when something is
 * wrong, and colouring the healthy ones green makes the broken one harder to
 * find rather than easier.
 */
export const server = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-spacing-1)',
        padding: 'var(--bk-spacing-3)',
        borderRadius: 'var(--bk-radius-md)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        backgroundColor: 'var(--bk-color-background-elevated)',
        fontSize: 'var(--bk-font-size-sm)',
    },

    variants: {
        health: {
            unknown: {},
            ok: {},
            degraded: { borderColor: 'var(--bk-color-warning)' },
            unreachable: { borderColor: 'var(--bk-color-danger)' },
            incompatible: { borderColor: 'var(--bk-color-danger)' },
        },
    },

    defaultVariants: { health: 'unknown' },
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

export const healthIcon = style({
    flexShrink: 0,
    selectors: {
        '[data-health="ok"] &': { color: 'var(--bk-color-success)' },
        '[data-health="degraded"] &': { color: 'var(--bk-color-warning)' },
        '[data-health="unreachable"] &, [data-health="incompatible"] &': {
            color: 'var(--bk-color-danger)',
        },
        '[data-health="unknown"] &': { color: 'var(--bk-color-foreground-muted)' },
    },
});

export const name = style({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'var(--bk-font-weight-semibold)',
});

export const version = style({
    flexShrink: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const refresh = style({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    padding: 'var(--bk-spacing-0-5)',
    border: 'none',
    borderRadius: 'var(--bk-radius-sm)',
    background: 'transparent',
    color: 'var(--bk-color-foreground-muted)',
    cursor: 'pointer',

    selectors: {
        '&:hover': { color: 'var(--bk-color-foreground)' },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: '1px',
        },
    },
});

export const status = style({
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
});

export const mismatch = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--bk-gap-sm)',
    marginTop: 'var(--bk-spacing-1)',
    padding: 'var(--bk-spacing-2)',
    borderRadius: 'var(--bk-radius-sm)',
    // `color-mix` over the danger token rather than a dedicated surface token,
    // which is what `ToolCall`'s error row already does — there is no
    // `--bk-color-danger-background` and inventing one for a single component
    // would be a design-system change smuggled in under a feature.
    backgroundColor: 'color-mix(in srgb, var(--bk-color-danger) 12%, transparent)',
    color: 'var(--bk-color-foreground)',
    fontSize: 'var(--bk-font-size-xs)',
});

export const description = style({
    marginTop: 'var(--bk-spacing-1)',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-relaxed)',
});

export const capabilities = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-spacing-1)',
    margin: 0,
    marginTop: 'var(--bk-spacing-1)',
    padding: 0,
    listStyle: 'none',
});

export const capability = style({
    padding: '0 var(--bk-spacing-1)',
    borderRadius: 'var(--bk-radius-sm)',
    backgroundColor: 'var(--bk-color-secondary)',
    color: 'var(--bk-color-secondary-foreground)',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
});
