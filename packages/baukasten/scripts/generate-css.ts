/**
 * CSS Generation Script
 * 
 * Generates three CSS files for different platforms:
 * - baukasten-vscode.css: Uses --vscode-* variables
 * - baukasten-theia.css: Uses --theia-* variables (replaces --vscode)
 * - baukasten-web.css: Uses fallback/default values only
 * 
 * This script imports the token definitions from the source files,
 * ensuring consistency between the generated CSS files and the
 * runtime GlobalStyles component.
 * 
 * Run with: npx tsx scripts/generate-css.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import tokens from source files - single source of truth
import { colorTokens } from '../src/styles/colors';
import { spacingTokens } from '../src/styles/spacing';
import { typographyTokens } from '../src/styles/typography';
import { effectsTokens } from '../src/styles/effects';
import { globalStylesContent } from '../src/styles/global-styles-content';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// ============================================================================
// CSS GENERATION FUNCTIONS
// ============================================================================

/**
 * Combine all tokens into a full CSS string
 * CSS variables remain outside the layer (they don't need cascade protection)
 * Global styles are wrapped in @layer baukasten for easy overriding
 */
function buildFullCSS(): string {
  return `/**
 * Baukasten UI - CSS Variables and Global Styles
 * Generated automatically - do not edit manually
 *
 * This file contains all design tokens and global styles for the Baukasten UI library.
 */

${colorTokens}

${spacingTokens}

${typographyTokens}

${effectsTokens}

@layer baukasten {
${globalStylesContent}
}
`;
}

/**
 * Convert VSCode variables to Theia variables
 */
function convertToTheia(css: string): string {
  return css.replace(/--vscode-/g, '--theia-');
}

/**
 * Extract fallback values and remove var() references for web version
 * This creates a standalone CSS file that doesn't depend on any external variables
 */
function convertToWeb(css: string): string {
  // Replace var(--vscode-*, fallback) with just the fallback value
  // Also handle nested var() calls
  let result = css;

  // Pattern to match var(--vscode-*, fallback) or var(--theia-*, fallback)
  // This regex handles the var() function with a fallback value
  const varWithFallbackPattern = /var\(--(?:vscode|theia)-[^,)]+,\s*([^)]+)\)/g;

  // Keep replacing until no more matches (handles nested var())
  let prevResult = '';
  while (prevResult !== result) {
    prevResult = result;
    result = result.replace(varWithFallbackPattern, '$1');
  }

  // Remove any remaining var(--vscode-*) or var(--theia-*) without fallbacks
  // Replace with a reasonable default
  result = result.replace(/var\(--(?:vscode|theia)-[^)]+\)/g, 'inherit');

  return result;
}

/**
 * Add header comment to generated file
 */
function addHeader(css: string, variant: 'vscode' | 'theia' | 'web'): string {
  const descriptions = {
    vscode: 'Uses --vscode-* CSS variables. Include this file when running inside VS Code.',
    theia: 'Uses --theia-* CSS variables. Include this file when running inside Eclipse Theia.',
    web: 'Uses default fallback values only. Include this file for standalone web applications.'
  };

  return `/**
 * Baukasten UI - ${variant.toUpperCase()} Variant
 * ${descriptions[variant]}
 *
 * Generated automatically - do not edit manually
 *
 * Global styles are wrapped in @layer baukasten for easy overriding.
 * CSS variables remain outside the layer (they don't need cascade protection).
 */

${css}`;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  // Ensure dist directory exists
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Build the base CSS (layer wrapping is done at source level in css-variables.ts)
  const baseCss = buildFullCSS();

  // Generate VSCode variant (uses --vscode-* variables)
  const vscodeCss = addHeader(baseCss, 'vscode');
  writeFileSync(join(distDir, 'baukasten-vscode.css'), vscodeCss);
  console.log('✓ Generated baukasten-vscode.css');

  // Generate Theia variant (replaces --vscode-* with --theia-*)
  const theiaCss = addHeader(convertToTheia(baseCss), 'theia');
  writeFileSync(join(distDir, 'baukasten-theia.css'), theiaCss);
  console.log('✓ Generated baukasten-theia.css');

  // Generate Web variant (uses only fallback values)
  const webCss = addHeader(convertToWeb(baseCss), 'web');
  writeFileSync(join(distDir, 'baukasten-web.css'), webCss);
  console.log('✓ Generated baukasten-web.css');

  console.log('\nCSS files generated successfully in dist/');
}

main();
