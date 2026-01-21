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
 */

// Core types
export * from "./types";

// Design tokens
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./effects";

// Combined CSS variables and global styles
export { cssVariables, default as defaultCssVariables } from "./css-variables";
export { GlobalStyles, default as defaultGlobalStyles } from "./global-styles";
