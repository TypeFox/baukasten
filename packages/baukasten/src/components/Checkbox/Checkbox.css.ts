import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Checkbox wrapper (label)
 */
export const checkboxWrapper = recipe({
  base: {
    display: 'inline-flex',
    position: 'relative',
    cursor: 'pointer',
  },

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 'var(--bk-opacity-disabled)',
      },
      false: {},
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

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
 * Checkbox indicator (visual element)
 */
export const checkboxIndicator = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'var(--bk-color-checkbox-background)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-checkbox-border)',
    transition: 'var(--bk-transition-colors)',
    marginTop: 'var(--bk-spacing-0-5)',
  },

  variants: {
    variant: {
      checkbox: {
        borderRadius: 'var(--bk-radius-sm)',
      },
      switch: {
        borderRadius: 'var(--bk-radius-full)',
      },
    },

    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },

    checked: {
      true: {},
      false: {},
    },

    focused: {
      true: {
        borderColor: 'var(--bk-color-focus)',
      },
      false: {},
    },

    hovered: {
      true: {
        borderColor: 'var(--bk-color-border-hover)',
      },
      false: {},
    },

    disabled: {
      true: {
        opacity: 'var(--bk-opacity-disabled)',
      },
      false: {},
    },
  },

  compoundVariants: [
    // Checkbox variant sizes
    { variants: { variant: 'checkbox', size: 'xs' }, style: { width: 'var(--bk-spacing-3)', height: 'var(--bk-spacing-3)', minWidth: 'var(--bk-spacing-3)' } },
    { variants: { variant: 'checkbox', size: 'sm' }, style: { width: 'var(--bk-spacing-3-5)', height: 'var(--bk-spacing-3-5)', minWidth: 'var(--bk-spacing-3-5)' } },
    { variants: { variant: 'checkbox', size: 'md' }, style: { width: 'var(--bk-spacing-4)', height: 'var(--bk-spacing-4)', minWidth: 'var(--bk-spacing-4)' } },
    { variants: { variant: 'checkbox', size: 'lg' }, style: { width: 'var(--bk-spacing-5)', height: 'var(--bk-spacing-5)', minWidth: 'var(--bk-spacing-5)' } },
    { variants: { variant: 'checkbox', size: 'xl' }, style: { width: 'var(--bk-spacing-6)', height: 'var(--bk-spacing-6)', minWidth: 'var(--bk-spacing-6)' } },

    // Switch variant sizes
    { variants: { variant: 'switch', size: 'xs' }, style: { width: 'var(--bk-spacing-5)', height: 'var(--bk-spacing-3)', minWidth: 'var(--bk-spacing-5)' } },
    { variants: { variant: 'switch', size: 'sm' }, style: { width: 'var(--bk-spacing-6)', height: 'var(--bk-spacing-3-5)', minWidth: 'var(--bk-spacing-6)' } },
    { variants: { variant: 'switch', size: 'md' }, style: { width: 'var(--bk-spacing-7)', height: 'var(--bk-spacing-4)', minWidth: 'var(--bk-spacing-7)' } },
    { variants: { variant: 'switch', size: 'lg' }, style: { width: 'var(--bk-spacing-9)', height: 'var(--bk-spacing-5)', minWidth: 'var(--bk-spacing-9)' } },
    { variants: { variant: 'switch', size: 'xl' }, style: { width: 'var(--bk-spacing-10)', height: 'var(--bk-spacing-6)', minWidth: 'var(--bk-spacing-10)' } },

    // Checked state for checkbox variant
    {
      variants: { variant: 'checkbox', checked: true },
      style: {
        borderColor: 'transparent',
      },
    },

    // Checked state for switch variant
    {
      variants: { variant: 'switch', checked: true },
      style: {
        backgroundColor: 'var(--bk-color-primary)',
        borderColor: 'var(--bk-color-primary)',
      },
    },

    // Checked + hovered for switch (maintain primary color on hover)
    {
      variants: { variant: 'switch', checked: true, hovered: true },
      style: {
        backgroundColor: 'var(--bk-color-primary-hover)',
        borderColor: 'var(--bk-color-primary)',
      },
    },
  ],

  defaultVariants: {
    variant: 'checkbox',
    size: 'md',
    checked: false,
    focused: false,
    hovered: false,
    disabled: false,
  },
});

/**
 * Checkmark SVG
 */
export const checkboxCheckmark = recipe({
  base: {
    width: '100%',
    height: '100%',
    fill: 'none',
    stroke: 'var(--bk-color-checkbox-foreground)',
    strokeWidth: 'var(--bk-border-width-2)',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transform: 'scale(0.8)',
    transition: 'opacity var(--bk-transition-fast), transform var(--bk-transition-fast)',
  },

  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'scale(1)',
      },
      false: {
        opacity: 0,
      },
    },
  },

  defaultVariants: {
    visible: false,
  },
});

/**
 * Switch thumb
 */
export const switchThumb = recipe({
  base: {
    position: 'absolute',
    backgroundColor: 'var(--bk-color-checkbox-foreground)',
    borderRadius: 'var(--bk-radius-full)',
    transition: 'transform var(--bk-transition-base)',
    boxShadow: 'var(--bk-shadow-sm)',
  },

  variants: {
    size: {
      xs: { width: 'var(--bk-spacing-2)', height: 'var(--bk-spacing-2)', left: 'var(--bk-spacing-0-5)' },
      sm: { width: 'var(--bk-spacing-2-5)', height: 'var(--bk-spacing-2-5)', left: 'var(--bk-spacing-0-5)' },
      md: { width: 'var(--bk-spacing-3)', height: 'var(--bk-spacing-3)', left: 'var(--bk-spacing-0-5)' },
      lg: { width: 'var(--bk-spacing-4)', height: 'var(--bk-spacing-4)', left: 'var(--bk-spacing-0-5)' },
      xl: { width: 'var(--bk-spacing-5)', height: 'var(--bk-spacing-5)', left: 'var(--bk-spacing-0-5)' },
    },

    checked: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    // Transform values per size when checked
    {
      variants: { size: 'xs', checked: true },
      style: { transform: 'translateX(calc(var(--bk-spacing-5) - var(--bk-spacing-2) - 2 * var(--bk-spacing-0-5) - var(--bk-border-width-1)))' }
    },
    {
      variants: { size: 'sm', checked: true },
      style: { transform: 'translateX(calc(var(--bk-spacing-6) - var(--bk-spacing-2-5) - 2 * var(--bk-spacing-0-5) - var(--bk-border-width-1)))' }
    },
    {
      variants: { size: 'md', checked: true },
      style: { transform: 'translateX(calc(var(--bk-spacing-7) - var(--bk-spacing-3) - 2 * var(--bk-spacing-0-5) - var(--bk-border-width-1)))' }
    },
    {
      variants: { size: 'lg', checked: true },
      style: { transform: 'translateX(calc(var(--bk-spacing-9) - var(--bk-spacing-4) - 2 * var(--bk-spacing-0-5) - var(--bk-border-width-1)))' }
    },
    {
      variants: { size: 'xl', checked: true },
      style: { transform: 'translateX(calc(var(--bk-spacing-10) - var(--bk-spacing-5) - 2 * var(--bk-spacing-0-5) - var(--bk-border-width-1)))' }
    },
  ],

  defaultVariants: {
    size: 'md',
    checked: false,
  },
});

/**
 * Icon wrapper (for custom icons)
 */
export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * SVG sizing for icon wrapper
 */
globalStyle(`${iconWrapper} svg`, {
  width: '1em',
  height: '1em',
});
