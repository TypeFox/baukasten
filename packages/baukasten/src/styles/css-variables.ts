/**
 * CSS custom properties for the design system
 * Combines all design tokens into a single import
 * 
 * This module serves as the single source of truth for CSS variables,
 * used by both the runtime GlobalStyles component and the build-time CSS generation.
 */

import { colorTokens } from './colors';
import { spacingTokens } from './spacing';
import { typographyTokens } from './typography';
import { effectsTokens } from './effects';
import { globalStylesContent } from './global-styles-content';

/**
 * Global CSS variables for the design system
 * Apply these to your root element or theme provider
 *
 * This combines all design tokens:
 * - Colors (semantic color system)
 * - Spacing (scale, gaps, component sizes)
 * - Typography (fonts, sizes, weights, line heights)
 * - Effects (shadows, borders, transitions, opacity, z-index)
 */
export const cssVariables = `
  /* Inject semantic color tokens */
  ${colorTokens}
  
  /* Inject spacing tokens */
  ${spacingTokens}
  
  /* Inject typography tokens */
  ${typographyTokens}
  
  /* Inject effects tokens */
  ${effectsTokens}
`;

/**
 * Complete CSS including variables and global styles
 * This includes scrollbar styling and utility classes
 */
export const cssVariablesWithGlobalStyles = `
${cssVariables}

${globalStylesContent}
`;

/**
 * Helper to inject CSS variables into your app
 * Use this in a global style component or at the root of your app
 */
export default cssVariables;

// Re-export global styles content for convenience
export { globalStylesContent } from './global-styles-content';
