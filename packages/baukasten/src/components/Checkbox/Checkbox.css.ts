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
        opacity: 'var(--opacity-disabled)',
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
    backgroundColor: 'var(--color-checkbox-background)',
    border: 'var(--border-width-1) solid var(--color-checkbox-border)',
    transition: 'var(--transition-colors)',
    marginTop: 'var(--spacing-0-5)',
  },

  variants: {
    variant: {
      checkbox: {
        borderRadius: 'var(--radius-sm)',
      },
      switch: {
        borderRadius: 'var(--radius-full)',
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
        borderColor: 'var(--color-focus)',
      },
      false: {},
    },

    hovered: {
      true: {
        borderColor: 'var(--color-border-hover)',
      },
      false: {},
    },

    disabled: {
      true: {
        opacity: 'var(--opacity-disabled)',
      },
      false: {},
    },
  },

  compoundVariants: [
    // Checkbox variant sizes
    { variants: { variant: 'checkbox', size: 'xs' }, style: { width: 'var(--spacing-3)', height: 'var(--spacing-3)', minWidth: 'var(--spacing-3)' } },
    { variants: { variant: 'checkbox', size: 'sm' }, style: { width: 'var(--spacing-3-5)', height: 'var(--spacing-3-5)', minWidth: 'var(--spacing-3-5)' } },
    { variants: { variant: 'checkbox', size: 'md' }, style: { width: 'var(--spacing-4)', height: 'var(--spacing-4)', minWidth: 'var(--spacing-4)' } },
    { variants: { variant: 'checkbox', size: 'lg' }, style: { width: 'var(--spacing-5)', height: 'var(--spacing-5)', minWidth: 'var(--spacing-5)' } },
    { variants: { variant: 'checkbox', size: 'xl' }, style: { width: 'var(--spacing-6)', height: 'var(--spacing-6)', minWidth: 'var(--spacing-6)' } },

    // Switch variant sizes
    { variants: { variant: 'switch', size: 'xs' }, style: { width: 'var(--spacing-5)', height: 'var(--spacing-3)', minWidth: 'var(--spacing-5)' } },
    { variants: { variant: 'switch', size: 'sm' }, style: { width: 'var(--spacing-6)', height: 'var(--spacing-3-5)', minWidth: 'var(--spacing-6)' } },
    { variants: { variant: 'switch', size: 'md' }, style: { width: 'var(--spacing-7)', height: 'var(--spacing-4)', minWidth: 'var(--spacing-7)' } },
    { variants: { variant: 'switch', size: 'lg' }, style: { width: 'var(--spacing-9)', height: 'var(--spacing-5)', minWidth: 'var(--spacing-9)' } },
    { variants: { variant: 'switch', size: 'xl' }, style: { width: 'var(--spacing-10)', height: 'var(--spacing-6)', minWidth: 'var(--spacing-10)' } },

    // Checked state for checkbox variant
    {
      variants: { variant: 'checkbox', checked: true },
      style: {
        borderColor: 'var(--color-checkbox-checked-border)',
      },
    },

    // Checked state for switch variant
    {
      variants: { variant: 'switch', checked: true },
      style: {
        backgroundColor: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
      },
    },

    // Checked + hovered for switch (maintain primary color on hover)
    {
      variants: { variant: 'switch', checked: true, hovered: true },
      style: {
        backgroundColor: 'var(--color-primary-hover)',
        borderColor: 'var(--color-primary)',
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
    width: '70%',
    height: '70%',
    fill: 'none',
    stroke: 'var(--color-checkbox-foreground)',
    strokeWidth: 'var(--border-width-2)',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transform: 'scale(0.8)',
    transition: 'opacity var(--transition-fast), transform var(--transition-fast)',
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
    backgroundColor: 'var(--color-checkbox-foreground)',
    borderRadius: 'var(--radius-full)',
    transition: 'transform var(--transition-base)',
    boxShadow: 'var(--shadow-sm)',
  },

  variants: {
    size: {
      xs: { width: 'var(--spacing-2)', height: 'var(--spacing-2)', left: 'var(--spacing-0-5)' },
      sm: { width: 'var(--spacing-2-5)', height: 'var(--spacing-2-5)', left: 'var(--spacing-0-5)' },
      md: { width: 'var(--spacing-3)', height: 'var(--spacing-3)', left: 'var(--spacing-0-5)' },
      lg: { width: 'var(--spacing-4)', height: 'var(--spacing-4)', left: 'var(--spacing-0-5)' },
      xl: { width: 'var(--spacing-5)', height: 'var(--spacing-5)', left: 'var(--spacing-0-5)' },
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
      style: { transform: 'translateX(calc(var(--spacing-5) - var(--spacing-2) - 2 * var(--spacing-0-5) - var(--border-width-1)))' }
    },
    {
      variants: { size: 'sm', checked: true },
      style: { transform: 'translateX(calc(var(--spacing-6) - var(--spacing-2-5) - 2 * var(--spacing-0-5) - var(--border-width-1)))' }
    },
    {
      variants: { size: 'md', checked: true },
      style: { transform: 'translateX(calc(var(--spacing-7) - var(--spacing-3) - 2 * var(--spacing-0-5) - var(--border-width-1)))' }
    },
    {
      variants: { size: 'lg', checked: true },
      style: { transform: 'translateX(calc(var(--spacing-9) - var(--spacing-4) - 2 * var(--spacing-0-5) - var(--border-width-1)))' }
    },
    {
      variants: { size: 'xl', checked: true },
      style: { transform: 'translateX(calc(var(--spacing-10) - var(--spacing-5) - 2 * var(--spacing-0-5) - var(--border-width-1)))' }
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
