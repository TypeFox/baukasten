import { style } from '@vanilla-extract/css';

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    padding: 'var(--bk-padding-md)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
    borderRadius: 'var(--bk-radius-md)',
    backgroundColor: 'var(--bk-color-background-elevated)',
    minWidth: 0,
});

export const stack = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    minWidth: 0,
});

export const message = style({
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    minWidth: 0,
    wordBreak: 'break-word',
});

/**
 * Which server is asking.
 *
 * A required part of the card rather than a nicety: a form appearing mid-run
 * with no attribution is indistinguishable from one the application itself put
 * there, which is precisely the confusion a hostile server would want.
 */
export const origin = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
    fontSize: 'var(--bk-font-size-xs)',
    color: 'var(--bk-color-foreground-muted)',
    fontFamily: 'var(--bk-font-family-mono)',
});

/**
 * The second cell of a horizontal FormGroup: the control, and the helper text
 * beneath it. Kept together so the description aligns with the thing it
 * describes rather than with the label.
 */
export const control = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-spacing-1)',
    minWidth: 0,
});

export const fields = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    minWidth: 0,
});

export const actions = style({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--bk-gap-sm)',
});

export const resolved = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-foreground-muted)',
});

// ─── URL mode ───────────────────────────────────────────────────────────────

export const urlCard = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    padding: 'var(--bk-padding-md)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-warning)',
    borderRadius: 'var(--bk-radius-md)',
    backgroundColor: 'color-mix(in srgb, var(--bk-color-warning) 6%, transparent)',
    minWidth: 0,
});

/**
 * The destination, shown in full and never as a link.
 *
 * Rendering it as an anchor would be the whole vulnerability: the rules
 * require the user to examine the address and consent deliberately, and a
 * clickable target invites exactly the reflexive click that skips both.
 */
export const url = style({
    margin: 0,
    padding: 'var(--bk-padding-sm)',
    backgroundColor: 'var(--bk-color-code-background)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    minWidth: 0,
});

/** The host, pulled out of the address so a lookalike subdomain is visible. */
export const host = style({
    fontWeight: 'var(--bk-font-weight-bold)',
    color: 'var(--bk-color-foreground)',
});

export const warning = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--bk-gap-sm)',
    fontSize: 'var(--bk-font-size-sm)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-danger)',
    minWidth: 0,
});

export const unsupported = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-padding-sm)',
    fontSize: 'var(--bk-font-size-sm)',
    color: 'var(--bk-color-foreground-muted)',
});
