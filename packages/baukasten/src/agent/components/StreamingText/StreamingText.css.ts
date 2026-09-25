import { keyframes, style } from '@vanilla-extract/css';

const blink = keyframes({
    '0%, 49%': { opacity: 'var(--bk-opacity-100)' },
    '50%, 100%': { opacity: 'var(--bk-opacity-0)' },
});

export const streamingText = style({
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
});

/**
 * The cursor at the tail of whatever is currently streaming.
 *
 * A steps(1) blink rather than a fade, because a smoothly pulsing cursor reads
 * as decoration while a hard blink reads as a terminal — which is the right
 * association here.
 */
export const caret = style({
    display: 'inline-block',
    width: 'var(--bk-border-width-2)',
    height: '1em',
    marginLeft: 'var(--bk-spacing-0-5)',
    verticalAlign: 'text-bottom',
    backgroundColor: 'var(--bk-color-focus)',
    animation: `${blink} 1s steps(1) infinite`,

    '@media': {
        // A blinking element is a documented migraine and seizure trigger, so
        // this is a hard requirement rather than a nicety. The caret stays
        // visible; only the blink stops.
        '(prefers-reduced-motion: reduce)': {
            animation: 'none',
        },
    },
});
