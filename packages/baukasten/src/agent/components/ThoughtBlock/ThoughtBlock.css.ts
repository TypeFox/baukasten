import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
    '0%, 100%': { opacity: 'var(--bk-opacity-100)' },
    '50%': { opacity: 'var(--bk-opacity-30)' },
});

/**
 * While the model is still thinking this is a live readout, not something to
 * fold away — so it gets an accent rail and no affordance to collapse it. The
 * demo made the same call and it is the right one: hiding reasoning while it is
 * still arriving is hiding the only thing happening.
 */
export const live = style({
    display: 'flex',
    gap: 'var(--bk-gap-md)',
    padding: 'var(--bk-padding-sm)',
    borderLeft: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
    minWidth: 0,
});

export const liveIcon = style({
    flexShrink: 0,
    color: 'var(--bk-color-focus)',
    animation: `${pulse} 1.4s ease-in-out infinite`,

    '@media': {
        '(prefers-reduced-motion: reduce)': {
            animation: 'none',
        },
    },
});

export const settled = style({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
});

export const summary = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-sm)',
    padding: 'var(--bk-padding-sm)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    color: 'var(--bk-color-foreground-muted)',
    fontSize: 'var(--bk-font-size-sm)',
    borderRadius: 'var(--bk-radius-sm)',

    selectors: {
        '&:hover': { color: 'var(--bk-color-foreground)' },
        '&:focus-visible': {
            outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
            outlineOffset: `calc(-1 * var(--bk-border-width-2))`,
        },
    },
});

export const icon = style({
    flexShrink: 0,
    color: 'var(--bk-color-foreground-muted)',
});

export const text = style({
    fontSize: 'var(--bk-font-size-sm)',
    fontStyle: 'italic',
    lineHeight: 'var(--bk-line-height-relaxed)',
    color: 'var(--bk-color-foreground-muted)',
    minWidth: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
});

export const body = style({
    padding: '0 var(--bk-padding-sm) var(--bk-spacing-2) var(--bk-spacing-6)',
    minWidth: 0,
});
