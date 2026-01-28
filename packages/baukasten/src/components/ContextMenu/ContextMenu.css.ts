import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes } from '@vanilla-extract/css';

/**
 * Trigger wrapper
 */
export const triggerWrapper = style({
  display: 'inline-block',
});

/**
 * Context menu fade in animation
 */
const contextMenuFadeIn = keyframes({
  'from': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  'to': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

/**
 * Menu wrapper with positioning and flip logic
 */
export const menuWrapper = recipe({
  base: {
    position: 'fixed',
    zIndex: 'var(--bk-z-index-context-menu)',
  },

  variants: {
    flip: {
      none: {
        transformOrigin: 'top left',
      },
      x: {
        transformOrigin: 'top right',
        transform: 'translateX(-100%)',
      },
      y: {
        transformOrigin: 'bottom left',
        transform: 'translateY(-100%)',
      },
      both: {
        transformOrigin: 'bottom right',
        transform: 'translate(-100%, -100%)',
      },
    },
  },

  defaultVariants: {
    flip: 'none',
  },
});

/**
 * Styled menu container
 */
export const styledMenu = style({
  backgroundColor: 'var(--bk-color-dropdown-list-background)',
  border: 'var(--bk-border-width-1) solid var(--bk-color-dropdown-border)',
  borderRadius: 'var(--bk-radius-md)',
  boxShadow: 'var(--bk-shadow-lg)',
  minWidth: 'calc(var(--bk-spacing-24) * 2)', // 12rem = 192px
  maxWidth: 'calc(var(--bk-spacing-20) * 4)', // 20rem = 320px
  padding: 'var(--bk-spacing-1)',
  animation: `${contextMenuFadeIn} var(--bk-transition-fast) ease-out`,
});