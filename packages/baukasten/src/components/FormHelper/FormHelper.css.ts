import { recipe } from '@vanilla-extract/recipes';

/**
 * Form helper text
 */
export const formHelper = recipe({
  base: {
    fontSize: 'var(--font-size-xs)',
    lineHeight: 'var(--line-height-relaxed)',
    marginTop: 'var(--spacing-1)',
  },

  variants: {
    variant: {
      default: {
        color: 'var(--color-foreground-muted)',
      },
      error: {
        color: 'var(--color-danger)',
      },
      warning: {
        color: 'var(--color-warning)',
      },
      success: {
        color: 'var(--color-success)',
      },
      info: {
        color: 'var(--color-info)',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});