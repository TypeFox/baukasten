import { style } from '@vanilla-extract/css';

export const markdown = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-md)',
    fontSize: 'var(--bk-font-size-md)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground)',
    minWidth: 0,
});

export const paragraph = style({
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
});

export const heading = style({
    margin: 0,
    fontWeight: 'var(--bk-font-weight-semibold)',
    lineHeight: 'var(--bk-line-height-tight)',
});

export const list = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-sm)',
    margin: 0,
    paddingLeft: 'var(--bk-spacing-6)',
});

export const inlineCode = style({
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-sm)',
    backgroundColor: 'var(--bk-color-code-background)',
    borderRadius: 'var(--bk-radius-sm)',
    padding: '0 var(--bk-spacing-1)',
});

/**
 * A fenced block.
 *
 * Bounded height with its own scroll, because an agent pasting a 400-line file
 * into the transcript should not push everything after it off the screen.
 */
export const codeBlock = style({
    margin: 0,
    padding: 'var(--bk-padding-md)',
    maxHeight: '320px',
    overflow: 'auto',
    backgroundColor: 'var(--bk-color-code-background)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'var(--bk-font-family-mono)',
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    tabSize: 4,
    whiteSpace: 'pre',
    wordBreak: 'normal',
});
