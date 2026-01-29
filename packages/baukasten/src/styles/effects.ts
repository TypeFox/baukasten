/**
 * Visual effects tokens for the design system
 * Includes border radius, shadows, transitions, opacity, and z-index
 */

/**
 * Visual effects and styling tokens
 */
export const effectsTokens = `
  :root {
    /* ========================================================================
     * BORDER RADIUS
     * ======================================================================== */
    --bk-radius-none: 0;
    --bk-radius-sm: 0.125rem;  /* 2px */
    --bk-radius-md: 0.25rem;   /* 4px */
    --bk-radius-lg: 0.375rem;  /* 6px */
    --bk-radius-xl: 0.5rem;    /* 8px */
    --bk-radius-2xl: 0.75rem;  /* 12px */
    --bk-radius-3xl: 1rem;     /* 16px */
    --bk-radius-full: 9999px;  /* Circular */

    /* ========================================================================
     * SHADOWS
     * ======================================================================== */
    --bk-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --bk-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --bk-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --bk-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --bk-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --bk-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --bk-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

    /* ========================================================================
     * TRANSITIONS
     * ======================================================================== */
    --bk-transition-fast: 100ms ease-in-out;
    --bk-transition-base: 150ms ease-in-out;
    --bk-transition-slow: 300ms ease-in-out;

    /* Transition properties */
    --bk-transition-colors: color var(--bk-transition-base), 
                         background-color var(--bk-transition-base), 
                         border-color var(--bk-transition-base);
    --bk-transition-all: all var(--bk-transition-base);
    --bk-transition-transform: transform var(--bk-transition-base);
    --bk-transition-opacity: opacity var(--bk-transition-base);

    /* ========================================================================
     * Z-INDEX SCALE
     * ======================================================================== */
    --bk-z-index-base: 0;
    --bk-z-index-overlay-content: 1;  /* Content layered above overlay backgrounds (e.g., image captions) */
    --bk-z-index-sticky: 1020;
    --bk-z-index-fixed: 1030;
    --bk-z-index-modal-backdrop: 1040;
    --bk-z-index-modal: 1050;
    --bk-z-index-dropdown: 1060;      /* Dropdowns (Select, Dropdown, Menu, ButtonGroup) */
    --bk-z-index-popover: 1060;       /* Alias for dropdown - same layer */
    --bk-z-index-context-menu: 1065;  /* Context menus appear above dropdowns */
    --bk-z-index-tooltip: 1070;       /* Tooltips appear above everything interactive */
    --bk-z-index-notification: 1080;  /* Notifications at the top */

    /* ========================================================================
     * OPACITY SCALE
     * ======================================================================== */
    --bk-opacity-0: 0;
    --bk-opacity-10: 0.1;
    --bk-opacity-20: 0.2;
    --bk-opacity-30: 0.3;
    --bk-opacity-40: 0.4;
    --bk-opacity-50: 0.5;
    --bk-opacity-60: 0.6;
    --bk-opacity-70: 0.7;
    --bk-opacity-80: 0.8;
    --bk-opacity-90: 0.9;
    --bk-opacity-100: 1;

    /* Component-specific opacity */
    --bk-opacity-disabled: var(--bk-opacity-40);
    --bk-opacity-hover: var(--bk-opacity-80);
    --bk-opacity-muted: var(--bk-opacity-60);

    /* ========================================================================
     * BORDER WIDTHS
     * ======================================================================== */
    --bk-border-width-0: 0;
    --bk-border-width-1: 1px;
    --bk-border-width-2: 2px;
    --bk-border-width-4: 4px;
    --bk-border-width-8: 8px;
  }
`;

/**
 * TypeScript type definitions for effects tokens
 */
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export type Shadow = 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

export type Transition = 'fast' | 'base' | 'slow';

export type TransitionProperty = 'colors' | 'all' | 'transform' | 'opacity';

export type ZIndex =
  | 'base' | 'overlay-content' | 'dropdown' | 'sticky' | 'fixed'
  | 'modal-backdrop' | 'modal' | 'popover' | 'context-menu' | 'tooltip' | 'notification';

export type Opacity =
  | '0' | '10' | '20' | '30' | '40' | '50'
  | '60' | '70' | '80' | '90' | '100'
  | 'disabled' | 'hover' | 'muted';

export type BorderWidth = '0' | '1' | '2' | '4' | '8';

/**
 * Helper function to get a border radius token variable reference
 * @param radius - The border radius
 * @returns CSS variable reference string
 * 
 * @example
 * ```tsx
 * const Card = styled.div`
 *   border-radius: ${getBorderRadius('lg')};
 * `;
 * ```
 */
export const getBorderRadius = (radius: BorderRadius): string => {
  return `var(--bk-radius-${radius})`;
};

/**
 * Helper function to get a shadow token variable reference
 * @param shadow - The shadow size
 * @returns CSS variable reference string
 */
export const getShadow = (shadow: Shadow): string => {
  return `var(--bk-shadow-${shadow})`;
};

/**
 * Helper function to get a transition token variable reference
 * @param transition - The transition duration
 * @returns CSS variable reference string
 */
export const getTransition = (transition: Transition): string => {
  return `var(--bk-transition-${transition})`;
};

/**
 * Helper function to get a transition property variable reference
 * @param property - The transition property
 * @returns CSS variable reference string
 */
export const getTransitionProperty = (property: TransitionProperty): string => {
  return `var(--bk-transition-${property})`;
};

/**
 * Helper function to get a z-index token variable reference
 * @param zIndex - The z-index level
 * @returns CSS variable reference string
 */
export const getZIndex = (zIndex: ZIndex): string => {
  return `var(--bk-z-index-${zIndex})`;
};

/**
 * Helper function to get an opacity token variable reference
 * @param opacity - The opacity level
 * @returns CSS variable reference string
 */
export const getOpacity = (opacity: Opacity): string => {
  return `var(--bk-opacity-${opacity})`;
};

/**
 * Helper function to get a border width token variable reference
 * @param width - The border width
 * @returns CSS variable reference string
 */
export const getBorderWidth = (width: BorderWidth): string => {
  return `var(--bk-border-width-${width})`;
};

export default effectsTokens;

