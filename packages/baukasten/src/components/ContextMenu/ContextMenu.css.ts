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
    zIndex: 'var(--z-index-context-menu)',
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
  backgroundColor: 'var(--color-dropdown-list-background)',
  border: 'var(--border-width-1) solid var(--color-dropdown-border)',
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--shadow-lg)',
  minWidth: 'calc(var(--spacing-24) * 2)', // 12rem = 192px
  maxWidth: 'calc(var(--spacing-20) * 4)', // 20rem = 320px
  padding: 'var(--spacing-1)',
  animation: `${contextMenuFadeIn} var(--transition-fast) ease-out`,
});