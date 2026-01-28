/**
 * CSS Generation Script
 * 
 * Generates three CSS files for different platforms:
 * - baukasten-vscode.css: Uses --vscode-* variables
 * - baukasten-theia.css: Uses --theia-* variables (replaces --vscode)
 * - baukasten-web.css: Uses fallback/default values only
 * 
 * Run with: npx tsx scripts/generate-css.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// ============================================================================
// CSS CONTENT DEFINITIONS
// ============================================================================

/**
 * Color tokens - Uses --vscode-* variables with fallbacks
 */
const colorTokens = `
  :root {
    /* ========================================================================
     * BRAND COLORS
     * Primary colors for main actions and brand identity
     * ======================================================================== */
    --color-primary: var(--vscode-button-background, #0e639c);
    --color-primary-hover: var(--vscode-button-hoverBackground, #1177bb);
    --color-primary-active: var(--vscode-button-hoverBackground, #1177bb);
    --color-primary-foreground: var(--vscode-button-foreground, #ffffff);

    --color-secondary: var(--vscode-button-secondaryBackground, #3a3d41);
    --color-secondary-hover: var(--vscode-button-secondaryHoverBackground, #45494e);
    --color-secondary-active: var(--vscode-button-secondaryHoverBackground, #45494e);
    --color-secondary-foreground: var(--vscode-button-secondaryForeground, #ffffff);

    /* ========================================================================
     * SEMANTIC COLORS
     * Colors that convey meaning (success, warning, error, info)
     * ======================================================================== */
    --color-success: var(--vscode-testing-iconPassed, #4caf50);
    --color-success-hover: var(--vscode-testing-iconPassed, #45a049);
    --color-success-foreground: var(--vscode-button-foreground, #ffffff);

    --color-warning: var(--vscode-editorWarning-foreground, #ff9800);
    --color-warning-hover: var(--vscode-editorWarning-foreground, #f57c00);
    --color-warning-foreground: var(--vscode-button-foreground, #ffffff);

    --color-danger: var(--vscode-editorError-foreground, #f44336);
    --color-danger-hover: var(--vscode-editorError-foreground, #d32f2f);
    --color-danger-foreground: var(--vscode-button-foreground, #ffffff);

    --color-info: var(--vscode-editorInfo-foreground, #2196f3);
    --color-info-hover: var(--vscode-editorInfo-foreground, #1976d2);
    --color-info-foreground: var(--vscode-button-foreground, #ffffff);

    /* ========================================================================
     * NEUTRAL COLORS
     * Base colors for backgrounds, text, borders, etc.
     * ======================================================================== */

    /* Backgrounds */
    --color-background: var(--vscode-editor-background, #1e1e1e);
    --color-background-secondary: var(--vscode-sideBar-background, #252526);
    --color-background-tertiary: var(--vscode-panel-background, #1e1e1e);
    --color-background-elevated: var(--vscode-editorWidget-background, #252526);

    /* Foregrounds */
    --color-foreground: var(--vscode-foreground, #cccccc);
    --color-foreground-muted: var(--vscode-descriptionForeground, #8c8c8c);
    --color-foreground-disabled: var(--vscode-disabledForeground, #6c6c6c);

    /* Borders */
    --color-border: var(--vscode-input-border, rgba(128, 128, 128, 0.35));
    --color-border-focus: var(--vscode-focusBorder, #007fd4);
    --color-border-hover: var(--vscode-inputOption-activeBorder, #007fd4);

    /* Overlays */
    --color-overlay: rgba(0, 0, 0, 0.5);
    --color-overlay-light: rgba(0, 0, 0, 0.1);

    /* ========================================================================
     * INTERACTIVE STATES
     * Hover, active, focus, and disabled states
     * ======================================================================== */
    --color-hover: var(--vscode-list-hoverBackground, rgba(45, 45, 45, 0.6));
    --color-active: var(--vscode-list-activeSelectionBackground, #094771);
    --color-focus: var(--vscode-focusBorder, #007fd4);
    --color-selected: var(--vscode-list-activeSelectionBackground, #094771);
    --color-selected-foreground: var(--vscode-list-activeSelectionForeground, #ffffff);

    /* ========================================================================
     * INPUT COLORS
     * Form elements and inputs
     * ======================================================================== */
    --color-input-background: var(--vscode-input-background, #3c3c3c);
    --color-input-foreground: var(--vscode-input-foreground, #cccccc);
    --color-input-border: var(--vscode-input-border, rgba(128, 128, 128, 0.35));
    --color-input-placeholder: var(--vscode-input-placeholderForeground, #8c8c8c);
    --color-input-focus-border: var(--vscode-focusBorder, #007fd4);

    /* Input validation */
    --color-input-error: var(--vscode-inputValidation-errorBorder, #be1100);
    --color-input-error-background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    --color-input-error-foreground: var(--vscode-inputValidation-errorForeground, #ffffff);

    --color-input-warning: var(--vscode-inputValidation-warningBorder, #856404);
    --color-input-warning-background: var(--vscode-inputValidation-warningBackground, #352a05);
    --color-input-warning-foreground: var(--vscode-inputValidation-warningForeground, #ffffff);

    --color-input-info: var(--vscode-inputValidation-infoBorder, #007acc);
    --color-input-info-background: var(--vscode-inputValidation-infoBackground, #063b49);
    --color-input-info-foreground: var(--vscode-inputValidation-infoForeground, #ffffff);

    /* ========================================================================
     * BADGE COLORS
     * Badges, tags, and labels
     * ======================================================================== */
    --color-badge-background: var(--vscode-badge-background, #4d4d4d);
    --color-badge-foreground: var(--vscode-badge-foreground, #ffffff);

    /* ========================================================================
     * LINK COLORS
     * Links and anchor elements
     * ======================================================================== */
    --color-link: var(--vscode-textLink-foreground, #3794ff);
    --color-link-hover: var(--vscode-textLink-activeForeground, #3794ff);
    --color-link-active: var(--vscode-textLink-activeForeground, #3794ff);

    /* ========================================================================
     * CODE COLORS
     * Inline and block code elements
     * ======================================================================== */
    --color-code-background: var(--vscode-textCodeBlock-background, #0a0a0a);
    --color-code-foreground: var(--vscode-editor-foreground, #cccccc);

    /* ========================================================================
     * DROPDOWN COLORS
     * Dropdown menus and select elements
     * ======================================================================== */
    --color-dropdown-background: var(--vscode-dropdown-background, #252526);
    --color-dropdown-foreground: var(--vscode-dropdown-foreground, #cccccc);
    --color-dropdown-border: var(--vscode-dropdown-border, rgba(128, 128, 128, 0.35));
    --color-dropdown-list-background: var(--vscode-dropdown-listBackground, #252526);

    /* ========================================================================
     * CHECKBOX & RADIO COLORS
     * Checkbox and radio button elements
     * ======================================================================== */
    --color-checkbox-background: var(--vscode-checkbox-background, #3c3c3c);
    --color-checkbox-foreground: var(--vscode-checkbox-foreground, #f0f0f0);
    --color-checkbox-border: var(--vscode-checkbox-border, #6b6b6b);
    --color-checkbox-checked-background: var(--vscode-checkbox-selectBackground, #0e639c);
    --color-checkbox-checked-border: var(--vscode-checkbox-selectBorder, #0e639c);

    /* ========================================================================
     * LIST & TREE COLORS
     * List items, tree views, and table rows
     * ======================================================================== */
    --color-list-hover: var(--vscode-list-hoverBackground, rgba(45, 45, 45, 0.6));
    --color-list-active: var(--vscode-list-activeSelectionBackground, #094771);
    --color-list-active-foreground: var(--vscode-list-activeSelectionForeground, #ffffff);
    --color-list-focus: var(--vscode-list-focusBackground, #062f4a);
    --color-list-focus-outline: var(--vscode-list-focusOutline, #007fd4);

    /* ========================================================================
     * SCROLLBAR COLORS
     * Scrollbar styling
     * ======================================================================== */
    --color-scrollbar: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4));
    --color-scrollbar-hover: var(--vscode-scrollbarSlider-hoverBackground, rgba(100, 100, 100, 0.7));
    --color-scrollbar-active: var(--vscode-scrollbarSlider-activeBackground, rgba(191, 191, 191, 0.4));

    /* ========================================================================
     * DIVIDER COLORS
     * Separators and dividers
     * ======================================================================== */
    --color-divider: var(--vscode-panelSection-border, rgba(128, 128, 128, 0.2));

    /* ========================================================================
     * SHADOW COLORS
     * Shadows and elevation (complementing existing shadow scale)
     * ======================================================================== */
    --color-shadow: var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));

    /* ========================================================================
     * STATUS BAR COLORS
     * Status bar at the bottom of the window
     * ======================================================================== */
    --color-statusbar-background: var(--vscode-statusBar-background, #007acc);
    --color-statusbar-foreground: var(--vscode-statusBar-foreground, #ffffff);
    --color-statusbar-border: var(--vscode-statusBar-border, transparent);
    --color-statusbar-item-hover: var(--vscode-statusBarItem-hoverBackground, rgba(255, 255, 255, 0.12));
    --color-statusbar-item-active: var(--vscode-statusBarItem-activeBackground, rgba(255, 255, 255, 0.18));
    --color-statusbar-item-error: var(--vscode-statusBarItem-errorBackground, #c72e0f);
    --color-statusbar-item-warning: var(--vscode-statusBarItem-warningBackground, #7a6400);
  }
`;

/**
 * Spacing tokens
 */
const spacingTokens = `
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
 * Typography tokens
 */
const typographyTokens = `
  :root {
    /* ========================================================================
     * FONT SIZES
     * ======================================================================== */
    --font-size-xs: 0.6875rem;  /* 11px */
    --font-size-sm: 0.75rem;    /* 12px */
    --font-size-md: 0.8125rem;  /* 13px */
    --font-size-base: 0.875rem; /* 14px */
    --font-size-lg: 1rem;       /* 16px */
    --font-size-xl: 1.125rem;   /* 18px */
    --font-size-2xl: 1.25rem;   /* 20px */
    --font-size-3xl: 1.5rem;    /* 24px */
    --font-size-4xl: 1.875rem;  /* 30px */
    --font-size-5xl: 2.25rem;   /* 36px */

    /* Hero typography - for large, impactful headers */
    --font-size-hero: 3.5rem;         /* 56px */
    --font-size-hero-description: 1.25rem; /* 20px */

    /* ========================================================================
     * LINE HEIGHTS
     * ======================================================================== */
    --line-height-hero: 1.1;        /* Extra tight for large hero text */
    --line-height-tight: 1.25;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.75;
    --line-height-loose: 2;

    /* ========================================================================
     * FONT WEIGHTS
     * ======================================================================== */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* ========================================================================
     * LETTER SPACING
     * ======================================================================== */
    --letter-spacing-hero: -0.04em;   /* Extra tight for large hero text */
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.025em;
    --letter-spacing-wider: 0.05em;

    /* ========================================================================
     * FONT FAMILIES
     * Note: These can be overridden to match your application's fonts
     * ======================================================================== */
    --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas,
      'Courier New', monospace;
  }
`;

/**
 * Effects tokens
 */
const effectsTokens = `
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
 * Global styles (scrollbars, utility classes, etc.)
 */
const globalStyles = `
/* ============================================================================
 * GLOBAL STYLES
 * Box-sizing, scrollbars, and utility classes
 * ============================================================================ */

/* Box sizing reset */
* {
  box-sizing: border-box;
}

/* ========================================================================
 * SCROLLBAR STYLING (VSCode-style)
 * Custom scrollbars that match VSCode's native appearance
 * ======================================================================== */

/* For Webkit browsers (Chrome, Safari, Edge) */
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: var(--color-scrollbar);
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-scrollbar-hover);
}

*::-webkit-scrollbar-thumb:active {
  background-color: var(--color-scrollbar-active);
}

*::-webkit-scrollbar-corner {
  background: transparent;
}

*::-webkit-scrollbar-button {
  display: none;
  height: 0;
  width: 0;
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-scrollbar) transparent;
}

/* ========================================================================
 * TYPOGRAPHY UTILITY CLASSES
 * Quick styling classes for inline text formatting
 * ======================================================================== */

/* Font weights */
.text-light { font-weight: var(--font-weight-light); }
.text-normal { font-weight: var(--font-weight-normal); }
.text-medium { font-weight: var(--font-weight-medium); }
.text-semibold { font-weight: var(--font-weight-semibold); }
.text-bold { font-weight: var(--font-weight-bold); }

/* Font styles */
.text-italic { font-style: italic; }
.text-normal-style { font-style: normal; }

/* Text decoration */
.text-underline { text-decoration: underline; }
.text-line-through { text-decoration: line-through; }
.text-no-underline { text-decoration: none; }

/* Text transform */
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

/* Font families */
.font-sans { font-family: var(--font-family-sans); }
.font-mono { font-family: var(--font-family-mono); }

/* Font sizes */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-md { font-size: var(--font-size-md); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }
.text-5xl { font-size: var(--font-size-5xl); }

/* Line heights */
.leading-tight { line-height: var(--line-height-tight); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }

/* Letter spacing */
.tracking-tight { letter-spacing: var(--letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--letter-spacing-wider); }

/* Text colors */
.text-foreground { color: var(--color-foreground); }
.text-muted { color: var(--color-secondary-foreground); }
.text-primary { color: var(--color-primary); }
.text-success { color: var(--color-success); }
.text-warning { color: var(--color-warning); }
.text-danger { color: var(--color-danger); }
.text-info { color: var(--color-info); }

/* Text overflow */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-wrap { white-space: normal; }
.text-nowrap { white-space: nowrap; }
.text-pre { white-space: pre; }
.text-pre-wrap { white-space: pre-wrap; }
`;

// ============================================================================
// CSS GENERATION FUNCTIONS
// ============================================================================

/**
 * Combine all tokens into a full CSS string
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

${globalStyles}
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

    // Build the base CSS
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
