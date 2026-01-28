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
 */
export const spinner = recipe({
  base: {
    display: 'inline-block',
    borderRadius: 'var(--bk-radius-full)',
    border: 'var(--bk-border-width-2) solid var(--bk-color-background-elevated)',
    animation: `${spinAnimation} ${SPIN_DURATION} linear infinite`,
    verticalAlign: 'middle',
  },

  variants: {
    size: {
      xs: {
        width: 'var(--bk-size-circular-xs)',
        height: 'var(--bk-size-circular-xs)',
        borderWidth: 'var(--bk-border-width-2)',
      },
      sm: {
        width: 'var(--bk-size-circular-sm)',
        height: 'var(--bk-size-circular-sm)',
        borderWidth: 'var(--bk-border-width-2)',
      },
      md: {
        width: 'var(--bk-size-circular-md)',
        height: 'var(--bk-size-circular-md)',
        borderWidth: 'var(--bk-border-width-2)',
      },
      lg: {
        width: 'var(--bk-size-circular-lg)',
        height: 'var(--bk-size-circular-lg)',
        borderWidth: 'var(--bk-border-width-2)',
      },
      xl: {
        width: 'var(--bk-size-circular-xl)',
        height: 'var(--bk-size-circular-xl)',
        borderWidth: 'var(--bk-border-width-4)',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
