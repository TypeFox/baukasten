import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes, globalStyle } from '@vanilla-extract/css';

// Spin animation duration for loading indicators
const SPIN_DURATION = '1.5s'; // Smooth rotation speed

/**
 * Icon spin animation
 */
const iconSpin = keyframes({
  'from': {
    transform: 'rotate(0deg)',
  },
  'to': {
    transform: 'rotate(360deg)',
  },
});

/**
 * Icon component
 */
export const icon = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    verticalAlign: 'middle',
    flexShrink: 0,
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--bk-font-size-xs) !important',
      },
      sm: {
        fontSize: 'var(--bk-font-size-sm) !important',
      },
      md: {
        fontSize: 'var(--bk-font-size-md) !important',
      },
      lg: {
        fontSize: 'var(--bk-font-size-lg) !important',
      },
      xl: {
        fontSize: 'var(--bk-font-size-xl) !important',
      },
      '2xl': {
        fontSize: 'var(--bk-font-size-2xl) !important',
      },
      '3xl': {
        fontSize: 'var(--bk-font-size-3xl) !important',
      },
    },
    spin: {
      true: {
        animation: `${iconSpin} ${SPIN_DURATION} linear infinite`,
      },
      false: {},
    },
  },
});

/**
 * Ensure icon displays properly
 */
globalStyle(`${icon.classNames.base}::before`, {
  display: 'inline-block',
});

/**
 * No size variant class for inheritance
 */
export const noSize = style({
  fontSize: '1em !important',
});