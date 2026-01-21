import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Modal sizing and positioning constants
const MODAL_WIDTH_PERCENTAGE = '90%'; // Mobile-friendly default width
const MODAL_MAX_HEIGHT = '90vh'; // Prevents overflow on small screens

/**
 * Backdrop
 */
export const backdrop = recipe({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 'var(--z-index-modal-backdrop)',
    transition: 'var(--transition-base)',
  },

  variants: {
    variant: {
      solid: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Standard semi-transparent black
        backdropFilter: 'none',
      },
      blur: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lighter for blur effect
        backdropFilter: 'blur(var(--spacing-1))', // 4px
      },
      transparent: {
        backgroundColor: 'transparent',
        backdropFilter: 'none',
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
  },
});

/**
 * Modal container
 */
export const modalContainer = recipe({
  base: {
    position: 'fixed',
    zIndex: 'var(--z-index-modal)',
    backgroundColor: 'var(--color-background-elevated)',
    border: 'var(--border-width-1) solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'opacity var(--transition-base), transform var(--transition-base)',
  },

  variants: {
    size: {
      xs: {
        maxWidth: 'calc(var(--spacing-20) * 5)', // 400px = 100px * 4
        width: MODAL_WIDTH_PERCENTAGE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: MODAL_MAX_HEIGHT,
      },
      sm: {
        maxWidth: 'calc(var(--spacing-20) * 6.25)', // 500px = 125px * 4
        width: MODAL_WIDTH_PERCENTAGE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: MODAL_MAX_HEIGHT,
      },
      md: {
        maxWidth: 'calc(var(--spacing-20) * 7.5)', // 600px = 150px * 4
        width: MODAL_WIDTH_PERCENTAGE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: MODAL_MAX_HEIGHT,
      },
      lg: {
        maxWidth: 'calc(var(--spacing-20) * 10)', // 800px = 200px * 4
        width: MODAL_WIDTH_PERCENTAGE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: MODAL_MAX_HEIGHT,
      },
      xl: {
        maxWidth: 'calc(var(--spacing-20) * 12.5)', // 1000px = 250px * 4
        width: MODAL_WIDTH_PERCENTAGE,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: MODAL_MAX_HEIGHT,
      },
      fullscreen: {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        borderRadius: 0,
        top: 0,
        left: 0,
        transform: 'none',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

/**
 * Modal header
 */
export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--padding-lg)',
  borderBottom: 'var(--border-width-1) solid var(--color-border)',
  flexShrink: 0,
});

/**
 * Modal title
 */
export const modalTitle = style({
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  color: 'var(--color-foreground)',
  flex: 1,
});

/**
 * Close button
 */
export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--spacing-1)',
  background: 'transparent',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--color-foreground-muted)',
  cursor: 'pointer',
  transition: 'var(--transition-colors)',
  flexShrink: 0,

  selectors: {
    '&:hover': {
      backgroundColor: 'var(--color-list-hover)',
      color: 'var(--color-foreground)',
    },
    '&:active': {
      backgroundColor: 'var(--color-list-active)',
    },
    '&:focus-visible': {
      outline: 'var(--border-width-2) solid var(--color-focus-border)',
      outlineOffset: 'calc(-1 * var(--border-width-2))',
    },
  },
});

/**
 * Modal body
 */
export const modalBody = style({
  padding: 'var(--padding-lg)',
  overflowY: 'auto',
  flex: 1,
  color: 'var(--color-foreground)',
});

/**
 * Modal footer
 */
export const modalFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 'var(--gap-md)',
  padding: 'var(--padding-lg)',
  borderTop: 'var(--border-width-1) solid var(--color-border)',
  flexShrink: 0,
});