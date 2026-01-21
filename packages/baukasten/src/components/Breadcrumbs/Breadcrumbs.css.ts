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
        fontSize: 'var(--font-size-xs)',
        gap: 'var(--gap-xs)',
      },
      sm: {
        fontSize: 'var(--font-size-sm)',
        gap: 'var(--gap-sm)',
      },
      md: {
        fontSize: 'var(--font-size-md)',
        gap: 'var(--gap-md)',
      },
      lg: {
        fontSize: 'var(--font-size-base)',
        gap: 'var(--gap-md)',
      },
      xl: {
        fontSize: 'var(--font-size-lg)',
        gap: 'var(--gap-lg)',
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
        color: 'var(--color-foreground)',
        fontWeight: 'var(--font-weight-medium)',
      },
      false: {
        color: 'var(--color-foreground-muted)',
        fontWeight: 'var(--font-weight-normal)',
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
    color: 'var(--color-link)',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    transition: 'var(--transition-colors)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--gap-xs)',
  },

  variants: {
    variant: {
      default: {
        selectors: {
          '&:hover': {
            color: 'var(--color-link-hover)',
            textDecoration: 'underline',
          },
          '&:focus-visible': {
            outline: 'var(--border-width-1) solid var(--color-focus)',
            outlineOffset: 'var(--spacing-0-5)',
            borderRadius: 'var(--radius-xs)',
          },
        },
      },
      pill: {
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--radius-full)',
        padding: 'var(--spacing-1-5) var(--spacing-3)',
        lineHeight: 1,
        selectors: {
          '&:hover': {
            backgroundColor: 'var(--color-secondary-hover)',
            textDecoration: 'none',
          },
          '&:focus-visible': {
            outline: 'var(--border-width-1) solid var(--color-focus)',
            outlineOffset: 'var(--spacing-0-5)',
            borderRadius: 'var(--radius-full)',
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
    gap: 'var(--gap-xs)',
  },

  variants: {
    variant: {
      default: {},
      pill: {
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--radius-full)',
        padding: 'var(--spacing-1-5) var(--spacing-3)',
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
  color: 'var(--color-foreground-muted)',
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
  color: 'var(--color-foreground-muted)',
  cursor: 'default',
  userSelect: 'none',
});
