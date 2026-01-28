import { recipe } from '@vanilla-extract/recipes';

export const code = recipe({
  base: {
    fontFamily: 'var(--bk-font-family-mono)',
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
    },

    block: {
      true: {
        display: 'block',
        backgroundColor: 'var(--bk-color-code-background)',
        color: 'var(--bk-color-code-foreground)',
        padding: 'var(--bk-spacing-3)',
        borderRadius: 'var(--bk-radius-md)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
        lineHeight: 'var(--bk-line-height-relaxed)',
        margin: 0,
      },
      false: {
        backgroundColor: 'var(--bk-color-code-background)',
        color: 'var(--bk-color-code-foreground)',
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
        borderRadius: 'var(--bk-radius-sm)',
        border: 'var(--bk-border-width-1) solid var(--bk-color-border)',
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
