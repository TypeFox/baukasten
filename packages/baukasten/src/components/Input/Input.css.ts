import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Input wrapper
 */
export const inputWrapper = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 'var(--gap-xs)',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {},
    },
  },

  defaultVariants: {
    fullWidth: false,
  },
});

/**
 * Input element
 */
export const input = recipe({
  base: {
    backgroundColor: 'var(--color-input-background)',
    color: 'var(--color-input-foreground)',
    border: 'var(--border-width-1) solid var(--color-input-border)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    transition: 'var(--transition-colors)',
    width: '100%',

    selectors: {
      '&:focus': {
        borderColor: 'var(--color-input-focus-border)',
        outline: 'none',
      },
      '&::placeholder': {
        color: 'var(--color-input-placeholder)',
      },
      '&:disabled': {
        opacity: 'var(--opacity-disabled)',
        cursor: 'not-allowed',
      },
    },
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--spacing-0-5) var(--spacing-1-5)',
        fontSize: 'var(--font-size-xs)',
        minHeight: 'var(--size-xs)',
      },
      sm: {
        padding: 'var(--spacing-1) var(--spacing-2)',
        fontSize: 'var(--font-size-sm)',
        minHeight: 'var(--size-sm)',
      },
      md: {
        padding: 'var(--spacing-1-5) var(--spacing-2)',
        fontSize: 'var(--font-size-md)',
        minHeight: 'var(--size-md)',
      },
      lg: {
        padding: 'var(--spacing-2) var(--spacing-2-5)',
        fontSize: 'var(--font-size-base)',
        minHeight: 'var(--size-lg)',
      },
      xl: {
        padding: 'var(--spacing-2-5) var(--spacing-3)',
        fontSize: 'var(--font-size-lg)',
        minHeight: 'var(--size-xl)',
      },
    },
    hasError: {
      true: {
        borderColor: 'var(--color-input-error)',
        selectors: {
          '&:focus': {
            borderColor: 'var(--color-input-error)',
          },
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    size: 'md',
    hasError: false,
  },
});

/**
 * Error text
 */
export const errorText = style({
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-danger)',
  marginTop: 'var(--spacing-1)',
});