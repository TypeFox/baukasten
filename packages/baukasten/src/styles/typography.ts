/**
 * Typography tokens for the design system
 * Provides font sizes, weights, line heights, and letter spacing
 */

/**
 * Typography scale and text styling tokens
 */
export const typographyTokens = `
  :root {
    /* ========================================================================
     * FONT SIZES
     * The scale is anchored to the host UI font size — --vscode-font-size in
     * VS Code, --theia-font-size in Theia — so it tracks whatever size the
     * user configured. The fallback (0.8125rem / 13px) is used in standalone
     * web. Every other step is a fixed pixel offset from the md anchor.
     * ======================================================================== */
    --bk-font-size-md: var(--vscode-font-size, var(--theia-font-size, 0.8125rem)); /* host UI font size; 13px fallback */
    --bk-font-size-xs: calc(var(--bk-font-size-md) - 2px);   /* 11px default */
    --bk-font-size-sm: calc(var(--bk-font-size-md) - 1px);   /* 12px default */
    --bk-font-size-base: calc(var(--bk-font-size-md) + 1px); /* 14px default */
    --bk-font-size-lg: calc(var(--bk-font-size-md) + 3px);   /* 16px default */
    --bk-font-size-xl: calc(var(--bk-font-size-md) + 5px);   /* 18px default */
    --bk-font-size-2xl: calc(var(--bk-font-size-md) + 7px);  /* 20px default */
    --bk-font-size-3xl: calc(var(--bk-font-size-md) + 11px); /* 24px default */
    --bk-font-size-4xl: calc(var(--bk-font-size-md) + 17px); /* 30px default */
    --bk-font-size-5xl: calc(var(--bk-font-size-md) + 23px); /* 36px default */

    /* Hero typography - for large, impactful headers */
    --bk-font-size-hero: 3.5rem;         /* 56px */
    --bk-font-size-hero-description: 1.25rem; /* 20px */

    /* ========================================================================
     * LINE HEIGHTS
     * ======================================================================== */
    --bk-line-height-hero: 1.1;        /* Extra tight for large hero text */
    --bk-line-height-tight: 1.25;
    --bk-line-height-normal: 1.5;
    --bk-line-height-relaxed: 1.75;
    --bk-line-height-loose: 2;

    /* ========================================================================
     * FONT WEIGHTS
     * ======================================================================== */
    --bk-font-weight-light: 300;
    --bk-font-weight-normal: 400;
    --bk-font-weight-medium: 500;
    --bk-font-weight-semibold: 600;
    --bk-font-weight-bold: 700;

    /* ========================================================================
     * LETTER SPACING
     * ======================================================================== */
    --bk-letter-spacing-hero: -0.04em;   /* Extra tight for large hero text */
    --bk-letter-spacing-tight: -0.025em;
    --bk-letter-spacing-normal: 0;
    --bk-letter-spacing-wide: 0.025em;
    --bk-letter-spacing-wider: 0.05em;

    /* ========================================================================
     * FONT FAMILIES
     * Note: These can be overridden to match your application's fonts
     * ======================================================================== */
    --bk-font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --bk-font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas,
      'Courier New', monospace;
  }
`;

/**
 * TypeScript type definitions for typography tokens
 */
export type FontSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

export type LineHeight = 'tight' | 'normal' | 'relaxed' | 'loose';

export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export type LetterSpacing = 'tight' | 'normal' | 'wide' | 'wider';

export type FontFamily = 'sans' | 'mono';

/**
 * Helper function to get a font size token variable reference
 * @param size - The font size
 * @returns CSS variable reference string
 *
 * @example
 * ```tsx
 * const Heading = styled.h1`
 *   font-size: ${getFontSize('2xl')};
 * `;
 * ```
 */
export const getFontSize = (size: FontSize): string => {
    return `var(--bk-font-size-${size})`;
};

/**
 * Helper function to get a line height token variable reference
 * @param height - The line height
 * @returns CSS variable reference string
 */
export const getLineHeight = (height: LineHeight): string => {
    return `var(--bk-line-height-${height})`;
};

/**
 * Helper function to get a font weight token variable reference
 * @param weight - The font weight
 * @returns CSS variable reference string
 */
export const getFontWeight = (weight: FontWeight): string => {
    return `var(--bk-font-weight-${weight})`;
};

/**
 * Helper function to get a letter spacing token variable reference
 * @param spacing - The letter spacing
 * @returns CSS variable reference string
 */
export const getLetterSpacing = (spacing: LetterSpacing): string => {
    return `var(--bk-letter-spacing-${spacing})`;
};

/**
 * Helper function to get a font family token variable reference
 * @param family - The font family
 * @returns CSS variable reference string
 */
export const getFontFamily = (family: FontFamily): string => {
    return `var(--bk-font-family-${family})`;
};

export default typographyTokens;
