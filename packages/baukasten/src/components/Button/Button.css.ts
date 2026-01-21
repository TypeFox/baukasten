import { recipe } from '@vanilla-extract/recipes';
import { globalStyle } from '@vanilla-extract/css';

/**
 * Button component with multiple variant dimensions
 */
export const button = recipe({
  base: {
    // Layout
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--gap-sm)',
    whiteSpace: 'nowrap',

    // Typography
    fontFamily: 'inherit',
    fontWeight: 'var(--font-weight-normal)',
    textDecoration: 'none',

    // Interaction
    border: 'var(--border-width-1) solid transparent',
    cursor: 'pointer',
    transition: 'var(--transition-colors)',
    outline: 'none',

    // States
    selectors: {
      '&:disabled': {
        opacity: 'var(--opacity-disabled)',
        cursor: 'not-allowed',
      },
      '&:focus-visible': {
        outline: 'var(--border-width-1) solid var(--color-focus)',
        outlineOffset: 'var(--spacing-0-5)',
      },
    },
  },

  variants: {
    variant: {
      primary: {},
      secondary: {},
      ghost: {},
      link: {},
    },

    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },

    width: {
      block: {
        width: '100%',
      },
      wide: {
        width: '100%',
        maxWidth: '16rem',
      },
    },

    outline: {
      true: {},
      false: {},
    },

    circular: {
      true: {
        borderRadius: 'var(--radius-full)',
        aspectRatio: '1',
      },
      false: {
        borderRadius: 'var(--radius-sm)',
      },
    },
  },

  compoundVariants: [
    // Regular size styles (non-circular)
    {
      variants: { size: 'xs', circular: false },
      style: {
        padding: 'var(--padding-xs)',
        fontSize: 'var(--font-size-xs)',
        minHeight: 'var(--size-xs)',
      },
    },
    {
      variants: { size: 'sm', circular: false },
      style: {
        padding: 'var(--padding-sm)',
        fontSize: 'var(--font-size-sm)',
        minHeight: 'var(--size-sm)',
      },
    },
    {
      variants: { size: 'md', circular: false },
      style: {
        padding: 'var(--padding-md)',
        fontSize: 'var(--font-size-md)',
        minHeight: 'var(--size-md)',
      },
    },
    {
      variants: { size: 'lg', circular: false },
      style: {
        padding: 'var(--padding-lg)',
        fontSize: 'var(--font-size-base)',
        minHeight: 'var(--size-lg)',
      },
    },
    {
      variants: { size: 'xl', circular: false },
      style: {
        padding: 'var(--padding-xl)',
        fontSize: 'var(--font-size-lg)',
        minHeight: 'var(--size-xl)',
      },
    },

    // Circular size styles
    {
      variants: { size: 'xs', circular: true },
      style: {
        width: 'var(--size-circular-xs)',
        height: 'var(--size-circular-xs)',
        fontSize: 'var(--font-size-xs)',
        padding: 0,
      },
    },
    {
      variants: { size: 'sm', circular: true },
      style: {
        width: 'var(--size-circular-sm)',
        height: 'var(--size-circular-sm)',
        fontSize: 'var(--font-size-sm)',
        padding: 0,
      },
    },
    {
      variants: { size: 'md', circular: true },
      style: {
        width: 'var(--size-circular-md)',
        height: 'var(--size-circular-md)',
        fontSize: 'var(--font-size-md)',
        padding: 0,
      },
    },
    {
      variants: { size: 'lg', circular: true },
      style: {
        width: 'var(--size-circular-lg)',
        height: 'var(--size-circular-lg)',
        fontSize: 'var(--font-size-base)',
        padding: 0,
      },
    },
    {
      variants: { size: 'xl', circular: true },
      style: {
        width: 'var(--size-circular-xl)',
        height: 'var(--size-circular-xl)',
        fontSize: 'var(--font-size-lg)',
        padding: 0,
      },
    },

    // Filled variants (outline: false)
    {
      variants: { variant: 'primary', outline: false },
      style: {
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-primary-foreground)',
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-primary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-primary-active)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'secondary', outline: false },
      style: {
        backgroundColor: 'var(--color-secondary)',
        color: 'var(--color-secondary-foreground)',
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-active)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'ghost', outline: false },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-foreground)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-hover)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'link', outline: false },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-link)',
        border: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            color: 'var(--color-link-hover)',
            textDecoration: 'underline',
          },
          '&:active:not(:disabled)': {
            color: 'var(--color-link-active)',
          },
        },
      },
    },

    // Outline variants (outline: true)
    {
      variants: { variant: 'primary', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'secondary', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-secondary-foreground)',
        borderColor: 'var(--color-secondary)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-foreground)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-foreground)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'ghost', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--color-foreground)',
        borderColor: 'var(--color-border)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--color-secondary-hover)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'link', outline: true },
      style: {
        // Link variant doesn't have outline style, fallback to regular
        backgroundColor: 'transparent',
        color: 'var(--color-link)',
        border: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            color: 'var(--color-link-hover)',
            textDecoration: 'underline',
          },
        },
      },
    },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    outline: false,
    circular: false,
  },
});

/**
 * Icon sizing within buttons
 */
globalStyle(`${button.classNames.base} svg`, {
  width: '1em',
  height: '1em',
  flexShrink: 0,
});
