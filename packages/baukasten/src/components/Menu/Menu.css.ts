import { recipe } from '@vanilla-extract/recipes';
import { style, globalStyle } from '@vanilla-extract/css';

/**
 * Menu container
 */
export const menuContainer = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    direction: {
      vertical: {
        flexDirection: 'column',
        padding: 'var(--spacing-1) 0',
        gap: 0,
      },
      horizontal: {
        flexDirection: 'row',
        padding: '0 var(--spacing-1)',
        gap: 'var(--spacing-1)',
      },
    },
    iconOnly: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      variants: { direction: 'vertical', iconOnly: true },
      style: {
        width: 'fit-content',
      },
    },
  ],

  defaultVariants: {
    direction: 'vertical',
    iconOnly: false,
  },
});

/**
 * Menu item
 */
export const menuItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-sm)',
    transition: 'var(--transition-colors)',
    userSelect: 'none',
    color: 'var(--color-foreground)',
    backgroundColor: 'transparent',

    selectors: {
      '&:focus-visible': {
        outline: 'var(--border-width-2) solid var(--color-focus-border)',
        outlineOffset: 'calc(-1 * var(--border-width-2))',
      },
    },
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--padding-xs)',
        gap: 'var(--gap-xs)',
        fontSize: 'var(--font-size-xs)',
        minHeight: 'var(--size-xs)',
      },
      sm: {
        padding: 'var(--padding-sm)',
        gap: 'var(--gap-sm)',
        fontSize: 'var(--font-size-sm)',
        minHeight: 'var(--size-sm)',
      },
      md: {
        padding: 'var(--padding-md)',
        gap: 'var(--gap-md)',
        fontSize: 'var(--font-size-md)',
        minHeight: 'var(--size-md)',
      },
      lg: {
        padding: 'var(--padding-lg)',
        gap: 'var(--gap-lg)',
        fontSize: 'var(--font-size-base)',
        minHeight: 'var(--size-lg)',
      },
      xl: {
        padding: 'var(--padding-xl)',
        gap: 'var(--gap-xl)',
        fontSize: 'var(--font-size-lg)',
        minHeight: 'var(--size-xl)',
      },
    },
    iconOnly: {
      true: {
        width: 'fit-content',
      },
      false: {
        width: 'auto',
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        color: 'var(--color-foreground-disabled)',
      },
      false: {
        cursor: 'pointer',
      },
    },
    selected: {
      true: {
        backgroundColor: 'var(--color-list-active)',
      },
      false: {},
    },
  },

  compoundVariants: [
    // iconOnly + size: reduce padding for icon-only items
    { variants: { iconOnly: true, size: 'xs' }, style: { padding: 'var(--spacing-1)' } },
    { variants: { iconOnly: true, size: 'sm' }, style: { padding: 'var(--spacing-1-5)' } },
    { variants: { iconOnly: true, size: 'md' }, style: { padding: 'var(--spacing-2)' } },
    { variants: { iconOnly: true, size: 'lg' }, style: { padding: 'var(--spacing-2-5)' } },
    { variants: { iconOnly: true, size: 'xl' }, style: { padding: 'var(--spacing-3)' } },
  ],

  defaultVariants: {
    size: 'md',
    iconOnly: false,
    disabled: false,
    selected: false,
  },
});

/**
 * Hover and active states - using globalStyle to handle :not([aria-disabled="true"])
 */
const menuItemBase = menuItem.classNames.base;

globalStyle(`${menuItemBase}:hover:not([aria-disabled="true"])`, {
  backgroundColor: 'var(--color-list-hover)',
});

globalStyle(`${menuItemBase}:active:not([aria-disabled="true"])`, {
  backgroundColor: 'var(--color-list-active)',
});

// SVG icon sizing
globalStyle(`${menuItemBase} svg`, {
  width: '1em',
  height: '1em',
  flexShrink: 0,
});

/**
 * Menu item content
 */
export const menuItemContent = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 'inherit',
    whiteSpace: 'nowrap',
  },

  variants: {
    iconOnly: {
      true: {
        flex: 0,
      },
      false: {
        flex: 1,
        minWidth: 0,
      },
    },
  },

  defaultVariants: {
    iconOnly: false,
  },
});

/**
 * Menu item right content
 */
export const menuItemRight = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'inherit',
  marginLeft: 'auto',
  paddingLeft: 'var(--spacing-2)',
  fontSize: '0.875em', // Relative to parent fontSize for proper scaling
  color: 'var(--color-foreground-muted)',
});

/**
 * Menu divider
 */
export const menuDivider = recipe({
  base: {
    backgroundColor: 'var(--color-divider)',
    flexShrink: 0,
  },

  variants: {
    direction: {
      vertical: {
        height: 'var(--border-width-1)',
        width: 'auto',
        margin: 'var(--spacing-1) 0',
      },
      horizontal: {
        width: 'var(--border-width-1)',
        height: 'auto',
        alignSelf: 'stretch',
        margin: 0,
      },
    },
  },

  defaultVariants: {
    direction: 'vertical',
  },
});

/**
 * SubMenu container
 */
export const subMenuContainer = style({
  position: 'relative',
});

/**
 * SubMenu content
 */
export const subMenuContent = recipe({
  base: {
    position: 'absolute',
    backgroundColor: 'var(--color-dropdown-list-background)',
    border: 'var(--border-width-1) solid var(--color-dropdown-border)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 'var(--z-index-dropdown)',
    minWidth: 'calc(var(--spacing-20) * 2)', // 10rem = 160px
    maxWidth: 'calc(var(--spacing-20) * 4)', // 20rem = 320px
    width: 'max-content',
    maxHeight: 'calc(100vh - var(--spacing-4))',
    overflow: 'visible',
    transition: 'opacity var(--transition-fast), transform var(--transition-fast), visibility var(--transition-fast)',
  },

  variants: {
    isOpen: {
      true: {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateX(0)',
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        position: 'fixed',
        left: '-9999px',
        top: '-9999px',
      },
    },
    flipHorizontal: {
      true: {
        right: '100%',
        marginRight: 'var(--spacing-1)',
      },
      false: {
        left: '100%',
        marginLeft: 'var(--spacing-1)',
      },
    },
  },

  compoundVariants: [
    {
      variants: { isOpen: false, flipHorizontal: false },
      style: {
        transform: 'translateX(calc(-1 * var(--spacing-1)))',
      },
    },
    {
      variants: { isOpen: false, flipHorizontal: true },
      style: {
        transform: 'translateX(var(--spacing-1))',
      },
    },
  ],

  defaultVariants: {
    isOpen: false,
    flipHorizontal: false,
  },
});