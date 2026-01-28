import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Field label
 */
export const fieldLabel = recipe({
  base: {
    display: 'inline-block',
    color: 'var(--bk-color-foreground)',
    fontSize: 'var(--bk-font-size-sm)',
    fontWeight: 'var(--bk-font-weight-medium)',
    lineHeight: 'var(--bk-line-height-normal)',
    marginBottom: 'var(--bk-spacing-1)',
    userSelect: 'none',
    cursor: 'default',
  },

  variants: {
    disabled: {
      true: {
        opacity: 'var(--bk-opacity-disabled)',
        cursor: 'not-allowed',
      },
      false: {},
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

/**
 * Required indicator (asterisk)
 */
export const requiredIndicator = style({
  color: 'var(--bk-color-danger)',
  marginLeft: 'var(--bk-spacing-0-5)',
  fontWeight: 'var(--bk-font-weight-medium)',
});
