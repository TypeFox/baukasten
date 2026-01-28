import { recipe } from '@vanilla-extract/recipes';

/**
 * Form helper text
 */
export const formHelper = recipe({
  base: {
    fontSize: 'var(--bk-font-size-xs)',
    lineHeight: 'var(--bk-line-height-relaxed)',
    marginTop: 'var(--bk-spacing-1)',
  },

  variants: {
    variant: {
      default: {
        color: 'var(--bk-color-foreground-muted)',
      },
      error: {
        color: 'var(--bk-color-danger)',
      },
      warning: {
        color: 'var(--bk-color-warning)',
      },
      success: {
        color: 'var(--bk-color-success)',
      },
      info: {
        color: 'var(--bk-color-info)',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});