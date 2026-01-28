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
 * For global styles, import the appropriate CSS file based on your target platform:
 * - `baukasten-ui/dist/baukasten-vscode.css` - For VS Code extensions
 * - `baukasten-ui/dist/baukasten-theia.css` - For Eclipse Theia applications
 * - `baukasten-ui/dist/baukasten-web.css` - For standalone web applications
 */

// Core types
export * from "./types";

// Design tokens
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./effects";

// Combined CSS variables (for programmatic use)
export { cssVariables, default as defaultCssVariables } from "./css-variables";

/**
 * @deprecated Use pre-built CSS files instead:
 * - baukasten-vscode.css for VS Code
 * - baukasten-theia.css for Eclipse Theia
 * - baukasten-web.css for standalone web apps
 */
export { GlobalStyles, default as defaultGlobalStyles } from "./global-styles";
