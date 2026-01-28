import { recipe } from '@vanilla-extract/recipes';
import { style, styleVariants } from '@vanilla-extract/css';

/**
 * Hidden input
 */
export const hiddenInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: 'none',
});

/**
 * Radio wrapper (label)
 */
export const radioWrapper = style({
  display: 'inline-flex',
  position: 'relative',
  cursor: 'pointer',

  selectors: {
    '&:has(input:disabled)': {
      cursor: 'not-allowed',
      opacity: 'var(--bk-opacity-disabled)',
    },
  },
});

/**
 * Size configurations for radio button
 */
const radioSizeBase = style({});

export const radioIndicatorSize = styleVariants({
  xs: [radioSizeBase, {
    width: 'var(--bk-spacing-3)',
    height: 'var(--bk-spacing-3)',
    minWidth: 'var(--bk-spacing-3)',
  }],
  sm: [radioSizeBase, {
    width: 'var(--bk-spacing-3-5)',
    height: 'var(--bk-spacing-3-5)',
    minWidth: 'var(--bk-spacing-3-5)',
  }],
  md: [radioSizeBase, {
    width: 'var(--bk-spacing-4)',
    height: 'var(--bk-spacing-4)',
    minWidth: 'var(--bk-spacing-4)',
  }],
  lg: [radioSizeBase, {
    width: 'var(--bk-spacing-5)',
    height: 'var(--bk-spacing-5)',
    minWidth: 'var(--bk-spacing-5)',
  }],
  xl: [radioSizeBase, {
    width: 'var(--bk-spacing-6)',
    height: 'var(--bk-spacing-6)',
    minWidth: 'var(--bk-spacing-6)',
  }],
});

/**
 * Radio indicator base
 */
export const radioIndicator = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'var(--bk-color-checkbox-background)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-checkbox-border)',
    borderRadius: 'var(--bk-radius-full)',
    transition: 'var(--bk-transition-colors)',
    marginTop: 'var(--bk-spacing-0-5)',

    selectors: {
      // Hover state
      [`${hiddenInput}:hover:not(:disabled) ~ &`]: {
        borderColor: 'var(--bk-color-border-hover)',
      },

      // Focus state
      [`${hiddenInput}:focus-visible ~ &`]: {
        outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
        outlineOffset: 'var(--bk-spacing-0-5)',
      },

      // Checked state
      [`${hiddenInput}:checked ~ &`]: {
        borderColor: 'var(--bk-color-checkbox-checked-border)',
      },

      // Disabled state
      [`${hiddenInput}:disabled ~ &`]: {
        opacity: 'var(--bk-opacity-disabled)',
      },
    },
  },

  variants: {
    size: {
      xs: radioIndicatorSize.xs,
      sm: radioIndicatorSize.sm,
      md: radioIndicatorSize.md,
      lg: radioIndicatorSize.lg,
      xl: radioIndicatorSize.xl,
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

/**
 * Size configurations for the inner dot
 */
const radioDotSizeBase = style({});

export const radioDotSize = styleVariants({
  xs: [radioDotSizeBase, {
    width: 'var(--bk-spacing-1-5)',
    height: 'var(--bk-spacing-1-5)',
  }],
  sm: [radioDotSizeBase, {
    width: 'var(--bk-spacing-2)',
    height: 'var(--bk-spacing-2)',
  }],
  md: [radioDotSizeBase, {
    width: 'var(--bk-spacing-2)',
    height: 'var(--bk-spacing-2)',
  }],
  lg: [radioDotSizeBase, {
    width: 'var(--bk-spacing-2-5)',
    height: 'var(--bk-spacing-2-5)',
  }],
  xl: [radioDotSizeBase, {
    width: 'var(--bk-spacing-3)',
    height: 'var(--bk-spacing-3)',
  }],
});

/**
 * Inner dot that appears when radio is selected
 */
export const radioDot = recipe({
  base: {
    backgroundColor: 'var(--bk-color-checkbox-foreground)',
    borderRadius: 'var(--bk-radius-full)',
    opacity: 0,
    transform: 'scale(0)',
    transition: 'opacity var(--bk-transition-fast), transform var(--bk-transition-fast)',

    selectors: {
      [`${hiddenInput}:checked ~ ${radioIndicator.classNames.base} &`]: {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  },

  variants: {
    size: {
      xs: radioDotSize.xs,
      sm: radioDotSize.sm,
      md: radioDotSize.md,
      lg: radioDotSize.lg,
      xl: radioDotSize.xl,
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
