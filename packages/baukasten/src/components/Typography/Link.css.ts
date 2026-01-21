import { recipe } from '@vanilla-extract/recipes';

export const link = recipe({
  base: {
    cursor: 'pointer',
    transition: 'var(--transition-colors)',
    fontWeight: 'var(--font-weight-normal)',
    lineHeight: 'inherit',

    ':focus-visible': {
      outline: 'var(--border-width-1) solid var(--color-focus)',
      outlineOffset: '2px', // Spacing between link text and focus ring
      borderRadius: 'var(--radius-xs)',
    },
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--font-size-xs)',
      },
      sm: {
        fontSize: 'var(--font-size-sm)',
      },
      md: {
        fontSize: 'var(--font-size-md)',
      },
      base: {
        fontSize: 'var(--font-size-base)',
      },
      lg: {
        fontSize: 'var(--font-size-lg)',
      },
    },

    variant: {
      default: {
        color: 'var(--color-link)',

        ':hover': {
          color: 'var(--color-link-hover)',
        },

        ':active': {
          color: 'var(--color-link-active)',
        },
      },
      muted: {
        color: 'var(--color-secondary-foreground)',

        ':hover': {
          color: 'var(--color-foreground)',
        },

        ':active': {
          color: 'var(--color-foreground)',
        },
      },
      primary: {
        color: 'var(--color-primary)',

        ':hover': {
          color: 'var(--color-primary-hover)',
        },

        ':active': {
          color: 'var(--color-primary-active)',
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
