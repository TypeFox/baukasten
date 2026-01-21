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
    --spacing-0: 0;
    --spacing-0-5: 0.125rem; /* 2px */
    --spacing-1: 0.25rem;    /* 4px */
    --spacing-1-5: 0.375rem; /* 6px */
    --spacing-2: 0.5rem;     /* 8px */
    --spacing-2-5: 0.625rem; /* 10px */
    --spacing-3: 0.75rem;    /* 12px */
    --spacing-3-5: 0.875rem; /* 14px */
    --spacing-4: 1rem;       /* 16px */
    --spacing-5: 1.25rem;    /* 20px */
    --spacing-6: 1.5rem;     /* 24px */
    --spacing-7: 1.75rem;    /* 28px */
    --spacing-8: 2rem;       /* 32px */
    --spacing-9: 2.25rem;    /* 36px */
    --spacing-10: 2.5rem;    /* 40px */
    --spacing-12: 3rem;      /* 48px */
    --spacing-14: 3.5rem;    /* 56px */
    --spacing-16: 4rem;      /* 64px */
    --spacing-20: 5rem;      /* 80px */
    --spacing-24: 6rem;      /* 96px */

    /* ========================================================================
     * COMPONENT SPACING
     * Semantic spacing for specific use cases
     * ======================================================================== */
    
    /* Gap between elements */
    --gap-xs: var(--spacing-1);
    --gap-sm: var(--spacing-1-5);
    --gap-md: var(--spacing-2);
    --gap-lg: var(--spacing-3);
    --gap-xl: var(--spacing-4);

    /* Padding for components */
    --padding-xs: var(--spacing-0-5) var(--spacing-2);
    --padding-sm: var(--spacing-1) var(--spacing-2-5);
    --padding-md: var(--spacing-1-5) var(--spacing-3-5);
    --padding-lg: var(--spacing-2) var(--spacing-4);
    --padding-xl: var(--spacing-2-5) var(--spacing-5);

    /* ========================================================================
     * COMPONENT SIZES
     * Heights for interactive elements (buttons, inputs, etc.)
     * ======================================================================== */
    --size-xs: 1.25rem;  /* 20px */
    --size-sm: 1.5rem;   /* 24px */
    --size-md: 1.75rem;  /* 28px */
    --size-lg: 2rem;     /* 32px */
    --size-xl: 2.25rem;  /* 36px */

    /* Circular/Square sizes (for icon buttons, avatars) */
    --size-circular-xs: 1.5rem;  /* 24px */
    --size-circular-sm: 1.75rem; /* 28px */
    --size-circular-md: 2rem;    /* 32px */
    --size-circular-lg: 2.25rem; /* 36px */
    --size-circular-xl: 2.5rem;  /* 40px */
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
  return `var(--spacing-${scale})`;
};

/**
 * Helper function to get a gap token variable reference
 * @param size - The gap size
 * @returns CSS variable reference string
 */
export const getGap = (size: GapSize): string => {
  return `var(--gap-${size})`;
};

/**
 * Helper function to get a component size variable reference
 * @param size - The component size
 * @param circular - Whether it's for a circular component
 * @returns CSS variable reference string
 */
export const getComponentSize = (size: ComponentSize, circular: boolean = false): string => {
  return circular ? `var(--size-circular-${size})` : `var(--size-${size})`;
};

export default spacingTokens;

