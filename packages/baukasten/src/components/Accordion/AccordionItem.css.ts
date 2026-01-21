import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Accordion item container
 */
export const accordionItem = recipe({
  base: {
    backgroundColor: 'var(--color-background)',
  },

  variants: {
    disabled: {
      true: {
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
 * Accordion header (button)
 */
export const accordionHeader = recipe({
  base: {
    // Layout
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 'var(--gap-sm)',
    padding: 'var(--padding-md)',

    // Colors
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-foreground)',
    border: 'none',

    // Typography
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-md)',
    fontWeight: 'var(--font-weight-medium)',
    textAlign: 'left',

    // Interaction
    transition: 'var(--transition-colors)',
    outline: 'none',

    // Focus state
    ':focus-visible': {
      outline: 'var(--border-width-1) solid var(--color-focus)',
      outlineOffset: 'calc(var(--border-width-1) * -1)',
    },

    // Hover state using selectors for better specificity
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--color-hover)',
      },
    },
  },

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
      false: {
        cursor: 'pointer',
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

/**
 * Chevron icon container
 */
export const chevron = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    transition: 'transform var(--transition-base)',
  },

  variants: {
    isOpen: {
      true: {
        transform: 'rotate(90deg)',
      },
      false: {},
    },
  },

  defaultVariants: {
    isOpen: false,
  },
});

/**
 * SVG sizing for chevron
 */
globalStyle(`${chevron.classNames.base} svg`, {
  width: '1em',
  height: '1em',
});

/**
 * Accordion content wrapper with grid-based animation
 * Uses CSS Grid for smooth, performant animations across all browsers
 */
export const accordionContent = recipe({
  base: {
    display: 'grid',
    transition: 'grid-template-rows var(--transition-slow), opacity var(--transition-base)',
  },

  variants: {
    isOpen: {
      true: {
        gridTemplateRows: '1fr',
        opacity: 1,
      },
      false: {
        gridTemplateRows: '0fr',
        opacity: 0,
      },
    },
  },

  defaultVariants: {
    isOpen: false,
  },
});

/**
 * Inner content padding container
 * min-height: 0 is required for CSS Grid animation to work properly
 */
export const accordionContentInner = recipe({
  base: {
    overflow: 'hidden',
    minHeight: 0,
    transition: 'padding var(--transition-slow)',
  },

  variants: {
    isOpen: {
      true: {
        paddingTop: 'var(--spacing-2)',
        paddingRight: 'var(--spacing-3-5)',
        paddingBottom: 'var(--spacing-3-5)',
        paddingLeft: 'var(--spacing-3-5)',
      },
      false: {
        padding: 0,
      },
    },
  },

  defaultVariants: {
    isOpen: false,
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

/**
 * Title text container
 *
 * Note: This needs to be a flex item that fills available space
 * to ensure the button's hover area covers the full width
 */
export const title = style({
  flex: 1,
  minWidth: 0, // Allows flex item to shrink below content size if needed
  // Ensure the span takes up its allocated flex space
  display: 'block',
});
