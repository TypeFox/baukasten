import { recipe } from '@vanilla-extract/recipes';

export const link = recipe({
  base: {
    cursor: 'pointer',
    transition: 'var(--bk-transition-colors)',
    fontWeight: 'var(--bk-font-weight-normal)',
    lineHeight: 'inherit',

    ':focus-visible': {
      outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
      outlineOffset: '2px', // Spacing between link text and focus ring
      borderRadius: 'var(--bk-radius-xs)',
    },
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--bk-font-size-xs)',
      },
      sm: {
        fontSize: 'var(--bk-font-size-sm)',
      },
      md: {
        fontSize: 'var(--bk-font-size-md)',
      },
      base: {
        fontSize: 'var(--bk-font-size-base)',
      },
      lg: {
        fontSize: 'var(--bk-font-size-lg)',
      },
    },

    variant: {
      default: {
        color: 'var(--bk-color-link)',

        ':hover': {
          color: 'var(--bk-color-link-hover)',
        },

        ':active': {
          color: 'var(--bk-color-link-active)',
        },
      },
      muted: {
        color: 'var(--bk-color-secondary-foreground)',

        ':hover': {
          color: 'var(--bk-color-foreground)',
        },

        ':active': {
          color: 'var(--bk-color-foreground)',
        },
      },
      primary: {
        color: 'var(--bk-color-primary)',

        ':hover': {
          color: 'var(--bk-color-primary-hover)',
        },

        ':active': {
          color: 'var(--bk-color-primary-active)',
        },
      },
    },

    underline: {
      always: {
        textDecoration: 'underline',
      },
      hover: {
        textDecoration: 'none',

        ':hover': {
          textDecoration: 'underline',
        },
      },
      never: {
        textDecoration: 'none',
      },
    },

    external: {
      true: {
        selectors: {
          '&::after': {
            content: ' ↗',
            fontSize: '0.85em', // Slightly smaller than parent for visual balance
            verticalAlign: 'super',
          },
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'default',
    underline: 'hover',
    external: false,
  },
});
