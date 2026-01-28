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
    gap: 'var(--bk-gap-sm)',
    whiteSpace: 'nowrap',

    // Typography
    fontFamily: 'inherit',
    fontWeight: 'var(--bk-font-weight-normal)',
    textDecoration: 'none',

    // Interaction
    border: 'var(--bk-border-width-1) solid transparent',
    cursor: 'pointer',
    transition: 'var(--bk-transition-colors)',
    outline: 'none',

    // States
    selectors: {
      '&:disabled': {
        opacity: 'var(--bk-opacity-disabled)',
        cursor: 'not-allowed',
      },
      '&:focus-visible': {
        outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
        outlineOffset: 'var(--bk-spacing-0-5)',
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
        borderRadius: 'var(--bk-radius-full)',
        aspectRatio: '1',
      },
      false: {
        borderRadius: 'var(--bk-radius-sm)',
      },
    },
  },

  compoundVariants: [
    // Regular size styles (non-circular)
    {
      variants: { size: 'xs', circular: false },
      style: {
        padding: 'var(--bk-padding-xs)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
      },
    },
    {
      variants: { size: 'sm', circular: false },
      style: {
        padding: 'var(--bk-padding-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
      },
    },
    {
      variants: { size: 'md', circular: false },
      style: {
        padding: 'var(--bk-padding-md)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
      },
    },
    {
      variants: { size: 'lg', circular: false },
      style: {
        padding: 'var(--bk-padding-lg)',
        fontSize: 'var(--bk-font-size-base)',
        minHeight: 'var(--bk-size-lg)',
      },
    },
    {
      variants: { size: 'xl', circular: false },
      style: {
        padding: 'var(--bk-padding-xl)',
        fontSize: 'var(--bk-font-size-lg)',
        minHeight: 'var(--bk-size-xl)',
      },
    },

    // Circular size styles
    {
      variants: { size: 'xs', circular: true },
      style: {
        width: 'var(--bk-size-circular-xs)',
        height: 'var(--bk-size-circular-xs)',
        fontSize: 'var(--bk-font-size-xs)',
        padding: 0,
      },
    },
    {
      variants: { size: 'sm', circular: true },
      style: {
        width: 'var(--bk-size-circular-sm)',
        height: 'var(--bk-size-circular-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        padding: 0,
      },
    },
    {
      variants: { size: 'md', circular: true },
      style: {
        width: 'var(--bk-size-circular-md)',
        height: 'var(--bk-size-circular-md)',
        fontSize: 'var(--bk-font-size-md)',
        padding: 0,
      },
    },
    {
      variants: { size: 'lg', circular: true },
      style: {
        width: 'var(--bk-size-circular-lg)',
        height: 'var(--bk-size-circular-lg)',
        fontSize: 'var(--bk-font-size-base)',
        padding: 0,
      },
    },
    {
      variants: { size: 'xl', circular: true },
      style: {
        width: 'var(--bk-size-circular-xl)',
        height: 'var(--bk-size-circular-xl)',
        fontSize: 'var(--bk-font-size-lg)',
        padding: 0,
      },
    },

    // Filled variants (outline: false)
    {
      variants: { variant: 'primary', outline: false },
      style: {
        backgroundColor: 'var(--bk-color-primary)',
        color: 'var(--bk-color-primary-foreground)',
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-primary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-primary-active)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'secondary', outline: false },
      style: {
        backgroundColor: 'var(--bk-color-secondary)',
        color: 'var(--bk-color-secondary-foreground)',
        borderColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-active)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'ghost', outline: false },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-foreground)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'link', outline: false },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-link)',
        border: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            color: 'var(--bk-color-link-hover)',
            textDecoration: 'underline',
          },
          '&:active:not(:disabled)': {
            color: 'var(--bk-color-link-active)',
          },
        },
      },
    },

    // Outline variants (outline: true)
    {
      variants: { variant: 'primary', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-primary)',
        borderColor: 'var(--bk-color-primary)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-primary)',
            color: 'var(--bk-color-primary-foreground)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-primary)',
            color: 'var(--bk-color-primary-foreground)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'secondary', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-secondary-foreground)',
        borderColor: 'var(--bk-color-secondary)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary)',
            color: 'var(--bk-color-secondary-foreground)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary)',
            color: 'var(--bk-color-secondary-foreground)',
            filter: 'brightness(0.95)',
          },
        },
      },
    },
    {
      variants: { variant: 'ghost', outline: true },
      style: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-foreground)',
        borderColor: 'var(--bk-color-border)',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
          },
          '&:active:not(:disabled)': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
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
        color: 'var(--bk-color-link)',
        border: 'none',
        selectors: {
          '&:hover:not(:disabled)': {
            color: 'var(--bk-color-link-hover)',
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
