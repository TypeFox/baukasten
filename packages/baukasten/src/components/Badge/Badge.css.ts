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
    borderRadius: 'var(--radius-full)',
    whiteSpace: 'nowrap',
    gap: 'var(--gap-xs)',

    // Typography
    fontWeight: 'var(--font-weight-medium)',

    // Interaction
    transition: 'var(--transition-colors)',

    // Border
    border: 'var(--border-width-1) solid transparent',
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--spacing-0-5) var(--spacing-1)',
        fontSize: 'var(--font-size-xs)',
        lineHeight: 'var(--line-height-tight)',
      },
      sm: {
        padding: 'var(--spacing-0-5) var(--spacing-1-5)',
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-tight)',
      },
      md: {
        padding: 'var(--spacing-1) var(--spacing-2)',
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-normal)',
      },
      lg: {
        padding: 'var(--spacing-1-5) var(--spacing-2-5)',
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-normal)',
      },
      xl: {
        padding: 'var(--spacing-2) var(--spacing-3)',
        fontSize: 'var(--font-size-base)',
        lineHeight: 'var(--line-height-normal)',
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
        backgroundColor: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
        color: 'var(--color-success)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'warning', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
        color: 'var(--color-warning)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'error', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--color-danger) 30%, transparent)',
        color: 'var(--color-danger)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'info', outline: false },
      style: {
        backgroundColor: 'color-mix(in srgb, var(--color-info) 30%, transparent)',
        color: 'var(--color-info)',
        borderColor: 'transparent',
      },
    },
    {
      variants: { variant: 'default', outline: false },
      style: {
        backgroundColor: 'var(--color-badge-background)',
        color: 'var(--color-badge-foreground)',
        borderColor: 'transparent',
      },
    },

    // Outline variants (outline: true)
    {
      variants: { variant: 'success', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-success)',
        borderColor: 'var(--color-success)',
      },
    },
    {
      variants: { variant: 'warning', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-warning)',
        borderColor: 'var(--color-warning)',
      },
    },
    {
      variants: { variant: 'error', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-danger)',
        borderColor: 'var(--color-danger)',
      },
    },
    {
      variants: { variant: 'info', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-info)',
        borderColor: 'var(--color-info)',
      },
    },
    {
      variants: { variant: 'default', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-badge-foreground)',
        borderColor: 'var(--color-border)',
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
