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
    borderRadius: 'var(--radius-full)',
    border: 'var(--border-width-2) solid var(--color-background-elevated)',
    animation: `${spinAnimation} ${SPIN_DURATION} linear infinite`,
    verticalAlign: 'middle',
  },

  variants: {
    size: {
      xs: {
        width: 'var(--size-circular-xs)',
        height: 'var(--size-circular-xs)',
        borderWidth: 'var(--border-width-2)',
      },
      sm: {
        width: 'var(--size-circular-sm)',
        height: 'var(--size-circular-sm)',
        borderWidth: 'var(--border-width-2)',
      },
      md: {
        width: 'var(--size-circular-md)',
        height: 'var(--size-circular-md)',
        borderWidth: 'var(--border-width-2)',
      },
      lg: {
        width: 'var(--size-circular-lg)',
        height: 'var(--size-circular-lg)',
        borderWidth: 'var(--border-width-2)',
      },
      xl: {
        width: 'var(--size-circular-xl)',
        height: 'var(--size-circular-xl)',
        borderWidth: 'var(--border-width-4)',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
