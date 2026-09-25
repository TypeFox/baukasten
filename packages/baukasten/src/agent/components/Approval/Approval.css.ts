import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const approval = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--bk-gap-md)',
        padding: 'var(--bk-padding-md)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        borderRadius: 'var(--bk-radius-md)',
        backgroundColor: 'var(--bk-color-background-elevated)',
        minWidth: 0,
    },

    variants: {
        /**
         * Supplied by the application, never derived from anything a server
         * sent. A component that read severity off server-controlled metadata
         * would let a hostile server dress down its own consent prompt.
         */
        severity: {
            low: {},
            normal: { borderColor: 'var(--bk-color-focus)' },
            high: {
                borderColor: 'var(--bk-color-danger)',
                backgroundColor: 'color-mix(in srgb, var(--bk-color-danger) 6%, transparent)',
            },
        },

        /** Once decided the card stays, quieter, carrying what was chosen. */
        resolved: {
            true: { borderColor: 'var(--bk-color-border)', backgroundColor: 'transparent' },
            false: {},
        },
    },

    defaultVariants: { severity: 'normal', resolved: false },
});

export const header = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    minWidth: 0,
});

export const title = style({
    fontSize: 'var(--bk-font-size-md)',
    fontWeight: 'var(--bk-font-weight-semibold)',
    minWidth: 0,
    wordBreak: 'break-word',
});

export const severityIcon = recipe({
    base: { flexShrink: 0 },
    variants: {
        severity: {
            low: { color: 'var(--bk-color-foreground-muted)' },
            normal: { color: 'var(--bk-color-focus)' },
            high: { color: 'var(--bk-color-danger)' },
        },
    },
    defaultVariants: { severity: 'normal' },
});

export const description = style({
    fontSize: 'var(--bk-font-size-sm)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground-muted)',
    minWidth: 0,
    wordBreak: 'break-word',
});

export const origin = style({
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    fontFamily: 'var(--bk-font-family-mono)',
});

export const options = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
});

export const shortcutHint = style({
    marginLeft: 'var(--bk-spacing-1)',
    opacity: 'var(--bk-opacity-60)',
    fontSize: 'var(--bk-font-size-xs)',
    fontVariantNumeric: 'tabular-nums',
});

export const outcome = recipe({
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--bk-gap-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        color: 'var(--bk-color-foreground-muted)',
    },
    variants: {
        outcome: {
            allow: {},
            deny: {},
        },
    },
    defaultVariants: { outcome: 'allow' },
});

export const outcomeAllowed = style({ color: 'var(--bk-color-success)' });
export const outcomeDenied = style({ color: 'var(--bk-color-danger)' });

// ─── Arguments ──────────────────────────────────────────────────────────────

export const argumentList = style({
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    gap: 'var(--bk-gap-xs) var(--bk-gap-md)',
    margin: 0,
    fontSize: 'var(--bk-font-size-sm)',
    minWidth: 0,
});

export const argumentName = style({
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    whiteSpace: 'nowrap',
});

export const argumentValue = style({
    margin: 0,
    minWidth: 0,
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
});

export const argumentJson = style({
    margin: 0,
    padding: 'var(--bk-padding-sm)',
    maxHeight: '240px',
    overflow: 'auto',
    backgroundColor: 'var(--bk-color-code-background)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    whiteSpace: 'pre',
});

export const expandValue = style({
    padding: 0,
    marginLeft: 'var(--bk-spacing-1)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-focus)',
    textDecoration: 'underline',
});
