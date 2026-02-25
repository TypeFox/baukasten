import { recipe } from '@vanilla-extract/recipes';
import { globalStyle } from '@vanilla-extract/css';

/**
 * Badge component with size, variant, and outline variants
 */
export const badge = recipe({
  base: {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--bk-radius-full)',
    whiteSpace: 'nowrap',
    gap: 'var(--bk-gap-xs)',
    boxSizing: 'border-box',

    // Typography
    fontWeight: 'var(--bk-font-weight-medium)',

    // Interaction
    transition: 'var(--bk-transition-colors)',

    // Border
    border: 'var(--bk-border-width-1) solid transparent',
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1)',
        fontSize: 'var(--bk-font-size-xs)',
        lineHeight: 'var(--bk-line-height-tight)',
        minWidth: 'calc(var(--bk-font-size-xs) * var(--bk-line-height-tight) + 2 * var(--bk-spacing-0-5) + 2 * var(--bk-border-width-1))',
      },
      sm: {
        padding: 'var(--bk-spacing-0-5) var(--bk-spacing-1-5)',
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-tight)',
        minWidth: 'calc(var(--bk-font-size-sm) * var(--bk-line-height-tight) + 2 * var(--bk-spacing-0-5) + 2 * var(--bk-border-width-1))',
      },
      md: {
        padding: 'var(--bk-spacing-1) var(--bk-spacing-2)',
        fontSize: 'var(--bk-font-size-sm)',
        lineHeight: 'var(--bk-line-height-normal)',
        minWidth: 'calc(var(--bk-font-size-sm) * var(--bk-line-height-normal) + 2 * var(--bk-spacing-1) + 2 * var(--bk-border-width-1))',
      },
      lg: {
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-2-5)',
        fontSize: 'var(--bk-font-size-md)',
        lineHeight: 'var(--bk-line-height-normal)',
        minWidth: 'calc(var(--bk-font-size-md) * var(--bk-line-height-normal) + 2 * var(--bk-spacing-1-5) + 2 * var(--bk-border-width-1))',
      },
      xl: {
        padding: 'var(--bk-spacing-2) var(--bk-spacing-3)',
        fontSize: 'var(--bk-font-size-base)',
        lineHeight: 'var(--bk-line-height-normal)',
        minWidth: 'calc(var(--bk-font-size-base) * var(--bk-line-height-normal) + 2 * var(--bk-spacing-2) + 2 * var(--bk-border-width-1))',
      },
    },

    variant: {
      success: {},
      warning: {},
      error: {},
      info: {},
      default: {},
    },

    outline: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    // Filled variants (outline: false)
    {
      variants: { variant: 'success', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-success) 30%, transparent)',
        color: 'var(--bk-color-success)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'warning', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-warning) 30%, transparent)',
        color: 'var(--bk-color-warning)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'error', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-danger) 30%, transparent)',
        color: 'var(--bk-color-danger)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'info', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--bk-color-info) 30%, transparent)',
        color: 'var(--bk-color-info)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'default', outline: false },
      style: {
        backgroundColor: 'var(--bk-color-badge-background)',
        color: 'var(--bk-color-badge-foreground)',
        borderColor: 'transparent',
      },
    },

    // Outline variants (outline: true)
    {
      variants: { variant: 'success', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-success)',
        borderColor: 'var(--bk-color-success)',
      },
    },
    {
      variants: { variant: 'warning', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-warning)',
        borderColor: 'var(--bk-color-warning)',
      },
    },
    {
      variants: { variant: 'error', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-danger)',
        borderColor: 'var(--bk-color-danger)',
      },
    },
    {
      variants: { variant: 'info', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-info)',
        borderColor: 'var(--bk-color-info)',
      },
    },
    {
      variants: { variant: 'default', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-badge-foreground)',
        borderColor: 'var(--bk-color-border)',
      },
    },
  ],

  defaultVariants: {
    size: 'md',
    variant: 'default',
    outline: false,
  },
});

/**
 * SVG sizing for icons within badges
 */
globalStyle(`${badge.classNames.base} svg`, {
  width: '1em',
  height: '1em',
  flexShrink: 0,
});
