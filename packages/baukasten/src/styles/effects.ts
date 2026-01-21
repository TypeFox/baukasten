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
    --radius-none: 0;
    --radius-sm: 0.125rem;  /* 2px */
    --radius-md: 0.25rem;   /* 4px */
    --radius-lg: 0.375rem;  /* 6px */
    --radius-xl: 0.5rem;    /* 8px */
    --radius-2xl: 0.75rem;  /* 12px */
    --radius-3xl: 1rem;     /* 16px */
    --radius-full: 9999px;  /* Circular */

    /* ========================================================================
     * SHADOWS
     * ======================================================================== */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

    /* ========================================================================
     * TRANSITIONS
     * ======================================================================== */
    --transition-fast: 100ms ease-in-out;
    --transition-base: 150ms ease-in-out;
    --transition-slow: 300ms ease-in-out;

    /* Transition properties */
    --transition-colors: color var(--transition-base), 
                         background-color var(--transition-base), 
                         border-color var(--transition-base);
    --transition-all: all var(--transition-base);
    --transition-transform: transform var(--transition-base);
    --transition-opacity: opacity var(--transition-base);

    /* ========================================================================
     * Z-INDEX SCALE
     * ======================================================================== */
    --z-index-base: 0;
    --z-index-sticky: 1020;
    --z-index-fixed: 1030;
    --z-index-modal-backdrop: 1040;
    --z-index-modal: 1050;
    --z-index-dropdown: 1060;      /* Dropdowns (Select, Dropdown, Menu, ButtonGroup) */
    --z-index-popover: 1060;       /* Alias for dropdown - same layer */
    --z-index-context-menu: 1065;  /* Context menus appear above dropdowns */
    --z-index-tooltip: 1070;       /* Tooltips appear above everything interactive */
    --z-index-notification: 1080;  /* Notifications at the top */

    /* ========================================================================
     * OPACITY SCALE
     * ======================================================================== */
    --opacity-0: 0;
    --opacity-10: 0.1;
    --opacity-20: 0.2;
    --opacity-30: 0.3;
    --opacity-40: 0.4;
    --opacity-50: 0.5;
    --opacity-60: 0.6;
    --opacity-70: 0.7;
    --opacity-80: 0.8;
    --opacity-90: 0.9;
    --opacity-100: 1;

    /* Component-specific opacity */
    --opacity-disabled: var(--opacity-40);
    --opacity-hover: var(--opacity-80);
    --opacity-muted: var(--opacity-60);

    /* ========================================================================
     * BORDER WIDTHS
     * ======================================================================== */
    --border-width-0: 0;
    --border-width-1: 1px;
    --border-width-2: 2px;
    --border-width-4: 4px;
    --border-width-8: 8px;
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
  | 'base' | 'dropdown' | 'sticky' | 'fixed'
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
  return `var(--radius-${radius})`;
};

/**
 * Helper function to get a shadow token variable reference
 * @param shadow - The shadow size
 * @returns CSS variable reference string
 */
export const getShadow = (shadow: Shadow): string => {
  return `var(--shadow-${shadow})`;
};

/**
 * Helper function to get a transition token variable reference
 * @param transition - The transition duration
 * @returns CSS variable reference string
 */
export const getTransition = (transition: Transition): string => {
  return `var(--transition-${transition})`;
};

/**
 * Helper function to get a transition property variable reference
 * @param property - The transition property
 * @returns CSS variable reference string
 */
export const getTransitionProperty = (property: TransitionProperty): string => {
  return `var(--transition-${property})`;
};

/**
 * Helper function to get a z-index token variable reference
 * @param zIndex - The z-index level
 * @returns CSS variable reference string
 */
export const getZIndex = (zIndex: ZIndex): string => {
  return `var(--z-index-${zIndex})`;
};

/**
 * Helper function to get an opacity token variable reference
 * @param opacity - The opacity level
 * @returns CSS variable reference string
 */
export const getOpacity = (opacity: Opacity): string => {
  return `var(--opacity-${opacity})`;
};

/**
 * Helper function to get a border width token variable reference
 * @param width - The border width
 * @returns CSS variable reference string
 */
export const getBorderWidth = (width: BorderWidth): string => {
  return `var(--border-width-${width})`;
};

export default effectsTokens;

