import { recipe } from '@vanilla-extract/recipes';

export const code = recipe({
  base: {
    fontFamily: 'var(--font-family-mono)',
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
    },

    block: {
      true: {
        display: 'block',
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-foreground)',
        padding: 'var(--spacing-3)',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-width-1) solid var(--color-border)',
        lineHeight: 'var(--line-height-relaxed)',
        margin: 0,
      },
      false: {
        backgroundColor: 'var(--color-code-background)',
        color: 'var(--color-code-foreground)',
        padding: 'var(--spacing-0-5) var(--spacing-1-5)',
        borderRadius: 'var(--radius-sm)',
        border: 'var(--border-width-1) solid var(--color-border)',
        lineHeight: 1,
      },
    },

    wrap: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        block: true,
        wrap: true,
      },
      style: {
        overflowX: 'visible',
        whiteSpace: 'pre-wrap',
      },
    },
    {
      variants: {
        block: true,
        wrap: false,
      },
      style: {
        overflowX: 'auto',
        whiteSpace: 'pre',
      },
    },
    {
      variants: {
        block: false,
        wrap: true,
      },
      style: {
        whiteSpace: 'normal',
      },
    },
    {
      variants: {
        block: false,
        wrap: false,
      },
      style: {
        whiteSpace: 'nowrap',
      },
    },
  ],

  defaultVariants: {
    size: 'sm',
    block: false,
    wrap: false,
  },
});
