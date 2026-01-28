/**
 * Spacing tokens for the design system
 * Provides a consistent spacing scale based on a 4px base unit
 */

/**
 * Spacing scale and component spacing tokens
 */
export const spacingTokens = `
  :root {
    /* ========================================================================
     * SPACING SCALE
     * Base unit: 4px
     * ======================================================================== */
    --bk-spacing-0: 0;
    --bk-spacing-0-5: 0.125rem; /* 2px */
    --bk-spacing-1: 0.25rem;    /* 4px */
    --bk-spacing-1-5: 0.375rem; /* 6px */
    --bk-spacing-2: 0.5rem;     /* 8px */
    --bk-spacing-2-5: 0.625rem; /* 10px */
    --bk-spacing-3: 0.75rem;    /* 12px */
    --bk-spacing-3-5: 0.875rem; /* 14px */
    --bk-spacing-4: 1rem;       /* 16px */
    --bk-spacing-5: 1.25rem;    /* 20px */
    --bk-spacing-6: 1.5rem;     /* 24px */
    --bk-spacing-7: 1.75rem;    /* 28px */
    --bk-spacing-8: 2rem;       /* 32px */
    --bk-spacing-9: 2.25rem;    /* 36px */
    --bk-spacing-10: 2.5rem;    /* 40px */
    --bk-spacing-12: 3rem;      /* 48px */
    --bk-spacing-14: 3.5rem;    /* 56px */
    --bk-spacing-16: 4rem;      /* 64px */
    --bk-spacing-20: 5rem;      /* 80px */
    --bk-spacing-24: 6rem;      /* 96px */

    /* ========================================================================
     * COMPONENT SPACING
     * Semantic spacing for specific use cases
     * ======================================================================== */
    
    /* Gap between elements */
    --bk-gap-xs: var(--bk-spacing-1);
    --bk-gap-sm: var(--bk-spacing-1-5);
    --bk-gap-md: var(--bk-spacing-2);
    --bk-gap-lg: var(--bk-spacing-3);
    --bk-gap-xl: var(--bk-spacing-4);

    /* Padding for components */
    --bk-padding-xs: var(--bk-spacing-0-5) var(--bk-spacing-2);
    --bk-padding-sm: var(--bk-spacing-1) var(--bk-spacing-2-5);
    --bk-padding-md: var(--bk-spacing-1-5) var(--bk-spacing-3-5);
    --bk-padding-lg: var(--bk-spacing-2) var(--bk-spacing-4);
    --bk-padding-xl: var(--bk-spacing-2-5) var(--bk-spacing-5);

    /* ========================================================================
     * COMPONENT SIZES
     * Heights for interactive elements (buttons, inputs, etc.)
     * ======================================================================== */
    --bk-size-xs: 1.25rem;  /* 20px */
    --bk-size-sm: 1.5rem;   /* 24px */
    --bk-size-md: 1.75rem;  /* 28px */
    --bk-size-lg: 2rem;     /* 32px */
    --bk-size-xl: 2.25rem;  /* 36px */

    /* Circular/Square sizes (for icon buttons, avatars) */
    --bk-size-circular-xs: 1.5rem;  /* 24px */
    --bk-size-circular-sm: 1.75rem; /* 28px */
    --bk-size-circular-md: 2rem;    /* 32px */
    --bk-size-circular-lg: 2.25rem; /* 36px */
    --bk-size-circular-xl: 2.5rem;  /* 40px */
  }
`;

/**
 * TypeScript type definitions for spacing tokens
 */
export type SpacingScale =
  | '0' | '0-5' | '1' | '1-5' | '2' | '2-5' | '3' | '3-5' | '4'
  | '5' | '6' | '7' | '8' | '9' | '10' | '12' | '14' | '16' | '20' | '24';

export type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Helper function to get a spacing token variable reference
 * @param scale - The spacing scale value
 * @returns CSS variable reference string
 * 
 * @example
 * ```tsx
 * const Container = styled.div`
 *   padding: ${getSpacing('4')};
 *   gap: ${getSpacing('2')};
 * `;
 * ```
 */
export const getSpacing = (scale: SpacingScale): string => {
  return `var(--bk-spacing-${scale})`;
};

/**
 * Helper function to get a gap token variable reference
 * @param size - The gap size
 * @returns CSS variable reference string
 */
export const getGap = (size: GapSize): string => {
  return `var(--bk-gap-${size})`;
};

/**
 * Helper function to get a component size variable reference
 * @param size - The component size
 * @param circular - Whether it's for a circular component
 * @returns CSS variable reference string
 */
export const getComponentSize = (size: ComponentSize, circular: boolean = false): string => {
  return circular ? `var(--bk-size-circular-${size})` : `var(--bk-size-${size})`;
};

export default spacingTokens;

