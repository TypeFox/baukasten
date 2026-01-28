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
        padding: 'var(--bk-spacing-1) 0',
        gap: 0,
      },
      horizontal: {
        flexDirection: 'row',
        padding: '0 var(--bk-spacing-1)',
        gap: 'var(--bk-spacing-1)',
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
    borderRadius: 'var(--bk-radius-sm)',
    transition: 'var(--bk-transition-colors)',
    userSelect: 'none',
    color: 'var(--bk-color-foreground)',
    backgroundColor: 'transparent',

    selectors: {
      '&:focus-visible': {
        outline: 'var(--bk-border-width-2) solid var(--bk-color-focus-border)',
        outlineOffset: 'calc(-1 * var(--bk-border-width-2))',
      },
    },
  },

  variants: {
    size: {
      xs: {
        padding: 'var(--bk-padding-xs)',
        gap: 'var(--bk-gap-xs)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
      },
      sm: {
        padding: 'var(--bk-padding-sm)',
        gap: 'var(--bk-gap-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
      },
      md: {
        padding: 'var(--bk-padding-md)',
        gap: 'var(--bk-gap-md)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
      },
      lg: {
        padding: 'var(--bk-padding-lg)',
        gap: 'var(--bk-gap-lg)',
        fontSize: 'var(--bk-font-size-base)',
        minHeight: 'var(--bk-size-lg)',
      },
      xl: {
        padding: 'var(--bk-padding-xl)',
        gap: 'var(--bk-gap-xl)',
        fontSize: 'var(--bk-font-size-lg)',
        minHeight: 'var(--bk-size-xl)',
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
        color: 'var(--bk-color-foreground-disabled)',
      },
      false: {
        cursor: 'pointer',
      },
    },
    selected: {
      true: {
        backgroundColor: 'var(--bk-color-list-active)',
      },
      false: {},
    },
  },

  compoundVariants: [
    // iconOnly + size: reduce padding for icon-only items
    { variants: { iconOnly: true, size: 'xs' }, style: { padding: 'var(--bk-spacing-1)' } },
    { variants: { iconOnly: true, size: 'sm' }, style: { padding: 'var(--bk-spacing-1-5)' } },
    { variants: { iconOnly: true, size: 'md' }, style: { padding: 'var(--bk-spacing-2)' } },
    { variants: { iconOnly: true, size: 'lg' }, style: { padding: 'var(--bk-spacing-2-5)' } },
    { variants: { iconOnly: true, size: 'xl' }, style: { padding: 'var(--bk-spacing-3)' } },
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
  backgroundColor: 'var(--bk-color-list-hover)',
});

globalStyle(`${menuItemBase}:active:not([aria-disabled="true"])`, {
  backgroundColor: 'var(--bk-color-list-active)',
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
  paddingLeft: 'var(--bk-spacing-2)',
  fontSize: '0.875em', // Relative to parent fontSize for proper scaling
  color: 'var(--bk-color-foreground-muted)',
});

/**
 * Menu divider
 */
export const menuDivider = recipe({
  base: {
    backgroundColor: 'var(--bk-color-divider)',
    flexShrink: 0,
  },

  variants: {
    direction: {
      vertical: {
        height: 'var(--bk-border-width-1)',
        width: 'auto',
        margin: 'var(--bk-spacing-1) 0',
      },
      horizontal: {
        width: 'var(--bk-border-width-1)',
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
    backgroundColor: 'var(--bk-color-dropdown-list-background)',
    border: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
    borderRadius: 'var(--bk-radius-md)',
    boxShadow: 'var(--bk-shadow-lg)',
    zIndex: 'var(--bk-z-index-dropdown)',
    minWidth: 'calc(var(--bk-spacing-20) * 2)', // 10rem = 160px
    maxWidth: 'calc(var(--bk-spacing-20) * 4)', // 20rem = 320px
    width: 'max-content',
    maxHeight: 'calc(100vh - var(--bk-spacing-4))',
    overflow: 'visible',
    transition: 'opacity var(--bk-transition-fast), transform var(--bk-transition-fast), visibility var(--bk-transition-fast)',
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
        marginRight: 'var(--bk-spacing-1)',
      },
      false: {
        left: '100%',
        marginLeft: 'var(--bk-spacing-1)',
      },
    },
  },

  compoundVariants: [
    {
      variants: { isOpen: false, flipHorizontal: false },
      style: {
        transform: 'translateX(calc(-1 * var(--bk-spacing-1)))',
      },
    },
    {
      variants: { isOpen: false, flipHorizontal: true },
      style: {
        transform: 'translateX(var(--bk-spacing-1))',
      },
    },
  ],

  defaultVariants: {
    isOpen: false,
    flipHorizontal: false,
  },
});