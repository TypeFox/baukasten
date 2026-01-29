import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes } from '@vanilla-extract/css';

// Animation durations
const INDETERMINATE_DURATION = '1.5s'; // Smooth loading animation
const STRIPED_DURATION = '1s'; // Stripe movement speed

// Stripe pattern size (matches var(--bk-spacing-10) = 40px)
const STRIPE_SIZE = 'var(--bk-spacing-10)'; // 40px

/**
 * Indeterminate loading animation (VSCode-style shimmer)
 */
const indeterminateAnimation = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(400%)',
  },
});

/**
 * Striped pattern animation
 */
const stripedAnimation = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: `${STRIPE_SIZE} 0`,
  },
});

/**
 * Progress bar wrapper
 */
export const progressBarWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--bk-gap-md)',
  width: '100%',
});

/**
 * Progress bar container
 */
export const progressBarContainer = style({
  position: 'relative',
  width: '100%',
  backgroundColor: 'var(--bk-color-background-elevated)',
  borderRadius: 'var(--bk-radius-full)',
  overflow: 'hidden',
  border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
});

/**
 * Progress bar fill
 */
export const progressBarFill = recipe({
  base: {
    height: '100%',
    borderRadius: 'var(--bk-radius-full)',
    transition: 'width var(--bk-transition-base)',
  },

  variants: {
    variant: {
      default: {
        backgroundColor: 'var(--bk-color-foreground-muted)',
      },
      primary: {
        backgroundColor: 'var(--bk-color-primary)',
      },
      success: {
        backgroundColor: 'var(--bk-color-success)',
      },
      warning: {
        backgroundColor: 'var(--bk-color-warning)',
      },
      danger: {
        backgroundColor: 'var(--bk-color-danger)',
      },
      info: {
        backgroundColor: 'var(--bk-color-info)',
      },
    },
    indeterminate: {
      true: {
        width: '25%',
        animation: `${indeterminateAnimation} ${INDETERMINATE_DURATION} ease-in-out infinite`,
      },
      false: {},
    },
    striped: {
      true: {
        backgroundImage: 'linear-gradient(45deg, var(--bk-color-stripe-overlay) 25%, transparent 25%, transparent 50%, var(--bk-color-stripe-overlay) 50%, var(--bk-color-stripe-overlay) 75%, transparent 75%, transparent)',
        backgroundSize: `${STRIPE_SIZE} ${STRIPE_SIZE}`,
      },
      false: {},
    },
    animated: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    // Animated stripes (when striped and animated)
    {
      variants: { striped: true, animated: true, indeterminate: false },
      style: {
        animation: `${stripedAnimation} ${STRIPED_DURATION} linear infinite`,
      },
    },
    // Both indeterminate and animated stripes
    {
      variants: { striped: true, animated: true, indeterminate: true },
      style: {
        animation: `${indeterminateAnimation} ${INDETERMINATE_DURATION} ease-in-out infinite, ${stripedAnimation} ${STRIPED_DURATION} linear infinite`,
      },
    },
  ],

  defaultVariants: {
    variant: 'default',
    indeterminate: false,
    striped: false,
    animated: false,
  },
});

/**
 * Progress bar label
 */
export const progressBarLabel = style({
  fontSize: 'var(--bk-font-size-sm)',
  color: 'var(--bk-color-foreground)',
  fontWeight: 'var(--bk-font-weight-medium)',
  minWidth: '3em',
  textAlign: 'right',
});