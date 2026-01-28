import { recipe } from '@vanilla-extract/recipes';

/**
 * RadioGroup container
 */
export const radioGroup = recipe({
  base: {
    display: 'flex',
    gap: 'var(--bk-gap-md)',
  },

  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
  },
});
