/**
 * Style utilities and shared styles for Baukasten components
 *
 * This module exports a comprehensive design token system:
 * - **colors**: Semantic color tokens (primary, secondary, success, etc.)
 * - **spacing**: Spacing scale, gaps, and component sizes
 * - **typography**: Font sizes, weights, line heights, and families
 * - **effects**: Shadows, borders, transitions, opacity, and z-index
 *
 * All tokens use CSS variables and can be customized by overriding the variables.
 *
 * For global styles, you can either:
 * 1. Use the `GlobalStyles` React component for runtime injection
 * 2. Import pre-built CSS files for your target platform:
 *    - `baukasten-ui/dist/baukasten-vscode.css` - For VS Code extensions
 *    - `baukasten-ui/dist/baukasten-theia.css` - For Eclipse Theia applications
 *    - `baukasten-ui/dist/baukasten-web.css` - For standalone web applications
 * 
 * Both approaches use the same token definitions.
 */

// Core types
export * from "./types";

// Design tokens
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./effects";

// Combined CSS variables (for programmatic use)
export {
    cssVariables,
    cssVariablesWithGlobalStyles,
    globalStylesContent,
    default as defaultCssVariables
} from "./css-variables";

// Global styles React component
export { GlobalStyles, default as defaultGlobalStyles } from "./global-styles";

// Global styles content (for direct use without React)
export { globalStylesContent as globalStyles } from "./global-styles-content";
