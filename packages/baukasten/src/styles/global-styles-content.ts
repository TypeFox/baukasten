/**
 * Global styles content for the design system
 * 
 * This file contains shared CSS content that is used by both:
 * - The runtime GlobalStyles React component
 * - The build-time CSS generation script
 * 
 * This ensures consistency between the static CSS files and the dynamic component.
 */

/**
 * Global styles including scrollbars and utility classes
 * This CSS is applied on top of the design tokens
 */
export const globalStylesContent = `
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
  background-color: var(--bk-color-scrollbar);
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--bk-color-scrollbar-hover);
}

*::-webkit-scrollbar-thumb:active {
  background-color: var(--bk-color-scrollbar-active);
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
  scrollbar-color: var(--bk-color-scrollbar) transparent;
}

/* ========================================================================
 * TYPOGRAPHY UTILITY CLASSES
 * Quick styling classes for inline text formatting
 * ======================================================================== */

/* Font weights */
.text-light { font-weight: var(--bk-font-weight-light); }
.text-normal { font-weight: var(--bk-font-weight-normal); }
.text-medium { font-weight: var(--bk-font-weight-medium); }
.text-semibold { font-weight: var(--bk-font-weight-semibold); }
.text-bold { font-weight: var(--bk-font-weight-bold); }

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
.font-sans { font-family: var(--bk-font-family-sans); }
.font-mono { font-family: var(--bk-font-family-mono); }

/* Font sizes */
.text-xs { font-size: var(--bk-font-size-xs); }
.text-sm { font-size: var(--bk-font-size-sm); }
.text-md { font-size: var(--bk-font-size-md); }
.text-base { font-size: var(--bk-font-size-base); }
.text-lg { font-size: var(--bk-font-size-lg); }
.text-xl { font-size: var(--bk-font-size-xl); }
.text-2xl { font-size: var(--bk-font-size-2xl); }
.text-3xl { font-size: var(--bk-font-size-3xl); }
.text-4xl { font-size: var(--bk-font-size-4xl); }
.text-5xl { font-size: var(--bk-font-size-5xl); }

/* Line heights */
.leading-tight { line-height: var(--bk-line-height-tight); }
.leading-normal { line-height: var(--bk-line-height-normal); }
.leading-relaxed { line-height: var(--bk-line-height-relaxed); }
.leading-loose { line-height: var(--bk-line-height-loose); }

/* Letter spacing */
.tracking-tight { letter-spacing: var(--bk-letter-spacing-tight); }
.tracking-normal { letter-spacing: var(--bk-letter-spacing-normal); }
.tracking-wide { letter-spacing: var(--bk-letter-spacing-wide); }
.tracking-wider { letter-spacing: var(--bk-letter-spacing-wider); }

/* Text colors */
.text-foreground { color: var(--bk-color-foreground); }
.text-muted { color: var(--bk-color-secondary-foreground); }
.text-primary { color: var(--bk-color-primary); }
.text-success { color: var(--bk-color-success); }
.text-warning { color: var(--bk-color-warning); }
.text-danger { color: var(--bk-color-danger); }
.text-info { color: var(--bk-color-info); }

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

export default globalStylesContent;
