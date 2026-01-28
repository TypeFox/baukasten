import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Input wrapper
 */
export const inputWrapper = recipe({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 'var(--bk-gap-xs)',
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
    backgroundColor: 'var(--bk-color-input-background)',
    color: 'var(--bk-color-input-foreground)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-input-border)',
    borderRadius: 'var(--bk-radius-sm)',
    fontFamily: 'inherit',
    transition: 'var(--bk-transition-colors)',
    width: '100%',

    selectors: {
      '&:focus': {
        borderColor: 'var(--bk-color-input-focus-border)',
        outline: 'none',
      },
      '&::placeholder': {
        color: 'var(--bk-color-input-placeholder)',
      },
      '&:disabled': {
        opacity: 'var(--bk-opacity-disabled)',
        cursor: 'not-allowed',
      },
    },
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
      },
      sm: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
      },
      md: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
      },
      lg: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-base)',
        minHeight: 'var(--bk-size-lg)',
      },
      xl: {
        padding: 'var(--bk-spacing-2-5) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-lg)',
        minHeight: 'var(--bk-size-xl)',
      },
    },
    hasError: {
      true: {
        borderColor: 'var(--bk-color-input-error)',
        selectors: {
          '&:focus': {
            borderColor: 'var(--bk-color-input-error)',
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
  fontSize: 'var(--bk-font-size-xs)',
  color: 'var(--bk-color-danger)',
  marginTop: 'var(--bk-spacing-1)',
});