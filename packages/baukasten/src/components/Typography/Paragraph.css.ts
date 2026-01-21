import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

const baseMaxLines = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const paragraph = recipe({
  base: {
    color: 'var(--color-foreground)',
    fontWeight: 'var(--font-weight-normal)',
    margin: 0,
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
      xl: {
        fontSize: 'var(--font-size-xl)',
      },
    },

    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
      justify: {
        textAlign: 'justify',
      },
    },

    lineHeight: {
      tight: {
        lineHeight: 'var(--line-height-tight)',
      },
      normal: {
        lineHeight: 'var(--line-height-normal)',
      },
      relaxed: {
        lineHeight: 'var(--line-height-relaxed)',
      },
      loose: {
        lineHeight: 'var(--line-height-loose)',
      },
    },

    marginBottom: {
      true: {
        marginBottom: 'var(--spacing-4)',
      },
      false: {},
    },

    hasMaxLines: {
      true: baseMaxLines,
      false: {},
    },
  },

  defaultVariants: {
    size: 'md',
    align: 'left',
    lineHeight: 'normal',
    marginBottom: true,
    hasMaxLines: false,
  },
});
