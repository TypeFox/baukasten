import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

/**
 * Field label
 */
export const fieldLabel = recipe({
  base: {
    display: 'inline-block',
    color: 'var(--color-foreground)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-normal)',
    marginBottom: 'var(--spacing-1)',
    userSelect: 'none',
    cursor: 'default',
  },

  variants: {
    disabled: {
      true: {
        opacity: 'var(--opacity-disabled)',
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
  color: 'var(--color-danger)',
  marginLeft: 'var(--spacing-0-5)',
  fontWeight: 'var(--font-weight-medium)',
});
