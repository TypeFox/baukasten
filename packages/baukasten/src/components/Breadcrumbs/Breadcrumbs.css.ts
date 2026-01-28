import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Main breadcrumbs container (nav element)
 */
export const breadcrumbs = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  variants: {
    size: {
      xs: {
        fontSize: 'var(--bk-font-size-xs)',
        gap: 'var(--bk-gap-xs)',
      },
      sm: {
        fontSize: 'var(--bk-font-size-sm)',
        gap: 'var(--bk-gap-sm)',
      },
      md: {
        fontSize: 'var(--bk-font-size-md)',
        gap: 'var(--bk-gap-md)',
      },
      lg: {
        fontSize: 'var(--bk-font-size-base)',
        gap: 'var(--bk-gap-md)',
      },
      xl: {
        fontSize: 'var(--bk-font-size-lg)',
        gap: 'var(--bk-gap-lg)',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

/**
 * Breadcrumb list (ol element)
 */
export const breadcrumbList = style({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  gap: 'inherit',
});

/**
 * Individual breadcrumb item (li element)
 */
export const breadcrumbItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },

  variants: {
    isLast: {
      true: {
        color: 'var(--bk-color-foreground)',
        fontWeight: 'var(--bk-font-weight-medium)',
      },
      false: {
        color: 'var(--bk-color-foreground-muted)',
        fontWeight: 'var(--bk-font-weight-normal)',
      },
    },
  },

  defaultVariants: {
    isLast: false,
  },
});

/**
 * Clickable link/button styles for breadcrumb items
 * Applies to both <a> and <button> in non-last items
 */
export const breadcrumbLink = recipe({
  base: {
    color: 'var(--bk-color-link)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    transition: 'var(--bk-transition-colors)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
  },

  variants: {
    variant: {
      default: {
        selectors: {
          '&:hover': {
            color: 'var(--bk-color-link-hover)',
            textDecoration: 'underline',
          },
          '&:focus-visible': {
            outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
            outlineOffset: 'var(--bk-spacing-0-5)',
            borderRadius: 'var(--bk-radius-xs)',
          },
        },
      },
      pill: {
        backgroundColor: 'var(--bk-color-secondary)',
        borderRadius: 'var(--bk-radius-full)',
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3)',
        lineHeight: 1,
        selectors: {
          '&:hover': {
            backgroundColor: 'var(--bk-color-secondary-hover)',
            textDecoration: 'none',
          },
          '&:focus-visible': {
            outline: 'var(--bk-border-width-1) solid var(--bk-color-focus)',
            outlineOffset: 'var(--bk-spacing-0-5)',
            borderRadius: 'var(--bk-radius-full)',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Non-clickable span styles for breadcrumb items
 */
export const breadcrumbSpan = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--bk-gap-xs)',
  },

  variants: {
    variant: {
      default: {},
      pill: {
        backgroundColor: 'var(--bk-color-secondary)',
        borderRadius: 'var(--bk-radius-full)',
        padding: 'var(--bk-spacing-1-5) var(--bk-spacing-3)',
        lineHeight: 1,
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Icon sizing within breadcrumb items
 */
globalStyle(`${breadcrumbItem.classNames.base} svg`, {
  width: '1em',
  height: '1em',
  flexShrink: 0,
  display: 'inline-block',
  verticalAlign: 'middle',
});

/**
 * Separator between breadcrumb items
 */
export const separator = style({
  display: 'flex',
  alignItems: 'center',
  color: 'var(--bk-color-foreground-muted)',
  userSelect: 'none',
});

/**
 * Icon sizing for separator
 */
globalStyle(`${separator} svg`, {
  width: '1em',
  height: '1em',
});

/**
 * Ellipsis for collapsed items
 */
export const ellipsis = style({
  color: 'var(--bk-color-foreground-muted)',
  cursor: 'default',
  userSelect: 'none',
});
