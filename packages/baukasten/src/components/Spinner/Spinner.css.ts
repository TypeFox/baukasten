import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes } from '@vanilla-extract/css';

// Animation duration constant
const SPIN_DURATION = '0.8s'; // Smooth rotation speed for loading indicator

/**
 * Spinner rotation animation
 */
const spinAnimation = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
});

/**
 * Spinner wrapper
 */
export const spinnerWrapper = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
});

/**
 * Spinner element
 *
 * **Sized as a glyph, not as a control.** These are the same
 * `--bk-font-size-*` tokens `Icon` uses, so `<Spinner size="sm" />` and
 * `<Icon size="sm" />` are the same size and sit together without one dwarfing
 * the other.
 *
 * They previously came from `--bk-size-circular-*`, which is the *circular
 * button diameter* scale — correct for `Button`'s circular variant, which is a
 * click target with padding around a glyph, and about 2.3× too large for
 * anything that is itself a glyph. The default `md` was 32px against a 13px
 * host font.
 *
 * The border thins to 1px at the two smallest sizes. At 11px a 2px ring is
 * nearly a fifth of the diameter and reads as a blob rather than a spinner.
 */
export const spinner = recipe({
    base: {
        display: 'inline-block',
        borderRadius: 'var(--bk-radius-full)',
        borderStyle: 'solid',
        borderColor: 'var(--bk-color-background-elevated)',
        animation: `${spinAnimation} ${SPIN_DURATION} linear infinite`,
        verticalAlign: 'middle',
        flexShrink: 0,
    },

    variants: {
        size: {
            xs: {
                width: 'var(--bk-font-size-xs)',
                height: 'var(--bk-font-size-xs)',
                borderWidth: 'var(--bk-border-width-1)',
            },
            sm: {
                width: 'var(--bk-font-size-sm)',
                height: 'var(--bk-font-size-sm)',
                borderWidth: 'var(--bk-border-width-1)',
            },
            md: {
                width: 'var(--bk-font-size-md)',
                height: 'var(--bk-font-size-md)',
                borderWidth: 'var(--bk-border-width-2)',
            },
            lg: {
                width: 'var(--bk-font-size-lg)',
                height: 'var(--bk-font-size-lg)',
                borderWidth: 'var(--bk-border-width-2)',
            },
            xl: {
                width: 'var(--bk-font-size-xl)',
                height: 'var(--bk-font-size-xl)',
                borderWidth: 'var(--bk-border-width-2)',
            },
            '2xl': {
                width: 'var(--bk-font-size-2xl)',
                height: 'var(--bk-font-size-2xl)',
                borderWidth: 'var(--bk-border-width-2)',
            },
            '3xl': {
                width: 'var(--bk-font-size-3xl)',
                height: 'var(--bk-font-size-3xl)',
                borderWidth: 'var(--bk-border-width-2)',
            },
        },
    },

    defaultVariants: {
        size: 'md',
    },
});
