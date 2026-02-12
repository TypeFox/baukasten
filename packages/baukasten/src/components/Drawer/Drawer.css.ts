import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Drawer size dimensions (width for left/right, height for top/bottom)
const DRAWER_SIZES = {
  xs: '17.5rem',  // 280px
  sm: '20rem',    // 320px
  md: '25rem',    // 400px
  lg: '35rem',    // 560px
  xl: '45rem',    // 720px
} as const;

type DrawerSizeKey = keyof typeof DRAWER_SIZES;
type HorizontalPlacement = 'left' | 'right';
type VerticalPlacement = 'top' | 'bottom';
type OffScreenState = 'closed' | 'entering' | 'exiting';

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
    zIndex: 'var(--bk-z-index-modal-backdrop)',
    transition: 'opacity var(--bk-transition-slow)',
  },

  variants: {
    variant: {
      solid: {
        backgroundColor: 'var(--bk-color-backdrop)',
        backdropFilter: 'none',
      },
      blur: {
        backgroundColor: 'var(--bk-color-backdrop-blur)',
        backdropFilter: 'blur(var(--bk-spacing-1))',
      },
      transparent: {
        backgroundColor: 'transparent',
        backdropFilter: 'none',
      },
    },
    animationState: {
      closed: { opacity: 0 },
      entering: { opacity: 0 },
      open: { opacity: 1 },
      exiting: { opacity: 0 },
    },
  },

  defaultVariants: {
    variant: 'solid',
    animationState: 'closed',
  },
});

/**
 * Drawer container
 */
export const drawerContainer = recipe({
  base: {
    position: 'fixed',
    zIndex: 'var(--bk-z-index-modal)',
    backgroundColor: 'var(--bk-color-background-elevated)',
    boxShadow: 'var(--bk-shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform var(--bk-transition-slow)',
    outline: 'none',
  },

  variants: {
    placement: {
      left: {
        top: 0,
        left: 0,
        bottom: 0,
        borderRight: 'var(--bk-border-width-1) solid var(--bk-color-border)',
      },
      right: {
        top: 0,
        right: 0,
        bottom: 0,
        borderLeft: 'var(--bk-border-width-1) solid var(--bk-color-border)',
      },
      top: {
        top: 0,
        left: 0,
        right: 0,
        borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
      },
    },

    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      fullscreen: {},
    },

    animationState: {
      closed: {},
      entering: {},
      open: { transform: 'translate(0, 0)' },
      exiting: {},
    },
  },

  compoundVariants: [
    // Left/right placement: set width from size
    ...(['left', 'right'] as const).flatMap((p: HorizontalPlacement) =>
      (Object.keys(DRAWER_SIZES) as DrawerSizeKey[]).map((s) => ({
        variants: { placement: p, size: s } as const,
        style: { width: DRAWER_SIZES[s], maxWidth: '100vw' },
      }))
    ),
    // Left/right fullscreen
    ...(['left', 'right'] as const).map((p: HorizontalPlacement) => ({
      variants: { placement: p, size: 'fullscreen' as const } as const,
      style: { width: '100vw' },
    })),

    // Top/bottom placement: set height from size
    ...(['top', 'bottom'] as const).flatMap((p: VerticalPlacement) =>
      (Object.keys(DRAWER_SIZES) as DrawerSizeKey[]).map((s) => ({
        variants: { placement: p, size: s } as const,
        style: { height: DRAWER_SIZES[s], maxHeight: '100vh' },
      }))
    ),
    // Top/bottom fullscreen
    ...(['top', 'bottom'] as const).map((p: VerticalPlacement) => ({
      variants: { placement: p, size: 'fullscreen' as const } as const,
      style: { height: '100vh' },
    })),

    // Off-screen transforms per placement (closed, entering, exiting)
    ...(['closed', 'entering', 'exiting'] as const).flatMap((state: OffScreenState) => [
      {
        variants: { placement: 'left' as const, animationState: state },
        style: { transform: 'translateX(-100%)' },
      },
      {
        variants: { placement: 'right' as const, animationState: state },
        style: { transform: 'translateX(100%)' },
      },
      {
        variants: { placement: 'top' as const, animationState: state },
        style: { transform: 'translateY(-100%)' },
      },
      {
        variants: { placement: 'bottom' as const, animationState: state },
        style: { transform: 'translateY(100%)' },
      },
    ]),
  ],

  defaultVariants: {
    placement: 'right',
    size: 'md',
    animationState: 'closed',
  },
});

/**
 * Drawer header
 */
export const drawerHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--bk-padding-lg)',
  borderBottom: 'var(--bk-border-width-1) solid var(--bk-color-border)',
  flexShrink: 0,
});

/**
 * Drawer title
 */
export const drawerTitle = style({
  fontSize: 'var(--bk-font-size-lg)',
  fontWeight: 'var(--bk-font-weight-semibold)',
  color: 'var(--bk-color-foreground)',
  flex: 1,
});

/**
 * Close button
 */
export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--bk-spacing-1)',
  background: 'transparent',
  border: 'none',
  borderRadius: 'var(--bk-radius-sm)',
  color: 'var(--bk-color-foreground-muted)',
  cursor: 'pointer',
  transition: 'var(--bk-transition-colors)',
  flexShrink: 0,

  selectors: {
    '&:hover': {
      backgroundColor: 'var(--bk-color-list-hover)',
      color: 'var(--bk-color-foreground)',
    },
    '&:active': {
      backgroundColor: 'var(--bk-color-list-active)',
    },
    '&:focus-visible': {
      outline: 'var(--bk-border-width-2) solid var(--bk-color-focus-border)',
      outlineOffset: 'calc(-1 * var(--bk-border-width-2))',
    },
  },
});

/**
 * Drawer body
 */
export const drawerBody = style({
  padding: 'var(--bk-padding-lg)',
  overflowY: 'auto',
  flex: 1,
  color: 'var(--bk-color-foreground)',
});

/**
 * Drawer footer
 */
export const drawerFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 'var(--bk-gap-md)',
  padding: 'var(--bk-padding-lg)',
  borderTop: 'var(--bk-border-width-1) solid var(--bk-color-border)',
  flexShrink: 0,
});
