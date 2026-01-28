import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

const baseMaxLines = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const paragraph = recipe({
  base: {
    color: 'var(--bk-color-foreground)',
    fontWeight: 'var(--bk-font-weight-normal)',
    margin: 0,
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
      xl: {
        fontSize: 'var(--bk-font-size-xl)',
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
        lineHeight: 'var(--bk-line-height-tight)',
      },
      normal: {
        lineHeight: 'var(--bk-line-height-normal)',
      },
      relaxed: {
        lineHeight: 'var(--bk-line-height-relaxed)',
      },
      loose: {
        lineHeight: 'var(--bk-line-height-loose)',
      },
    },

    marginBottom: {
      true: {
        marginBottom: 'var(--bk-spacing-4)',
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
