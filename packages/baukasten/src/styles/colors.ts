/**
 * Semantic color tokens for the design system
 * These provide platform-agnostic color variables that map to VSCode variables by default
 * but can be easily customized for web or other platforms
 * 
 * All tokens include fallback values for standalone web usage.
 * The CSS generation script uses these same definitions to generate platform-specific CSS files.
 */

/**
 * Semantic color system
 * Maps design system colors to VSCode theme variables with fallback defaults
 */
export const colorTokens = `
  :root {
    /* ========================================================================
     * BRAND COLORS
     * Primary colors for main actions and brand identity
     * ======================================================================== */
    --bk-color-primary: var(--vscode-button-background, #0e639c);
    --bk-color-primary-hover: var(--vscode-button-hoverBackground, #1177bb);
    --bk-color-primary-active: var(--vscode-button-hoverBackground, #1177bb);
    --bk-color-primary-foreground: var(--vscode-button-foreground, #ffffff);

    --bk-color-secondary: var(--vscode-button-secondaryBackground, #3a3d41);
    --bk-color-secondary-hover: var(--vscode-button-secondaryHoverBackground, #45494e);
    --bk-color-secondary-active: var(--vscode-button-secondaryHoverBackground, #45494e);
    --bk-color-secondary-foreground: var(--vscode-button-secondaryForeground, #ffffff);

    /* ========================================================================
     * SEMANTIC COLORS
     * Colors that convey meaning (success, warning, error, info)
     * ======================================================================== */
    --bk-color-success: var(--vscode-testing-iconPassed, #4caf50);
    --bk-color-success-hover: var(--vscode-testing-iconPassed, #45a049);
    --bk-color-success-foreground: var(--vscode-button-foreground, #ffffff);

    --bk-color-warning: var(--vscode-editorWarning-foreground, #ff9800);
    --bk-color-warning-hover: var(--vscode-editorWarning-foreground, #f57c00);
    --bk-color-warning-foreground: var(--vscode-button-foreground, #ffffff);

    --bk-color-danger: var(--vscode-editorError-foreground, #f44336);
    --bk-color-danger-hover: var(--vscode-editorError-foreground, #d32f2f);
    --bk-color-danger-foreground: var(--vscode-button-foreground, #ffffff);

    --bk-color-info: var(--vscode-editorInfo-foreground, #2196f3);
    --bk-color-info-hover: var(--vscode-editorInfo-foreground, #1976d2);
    --bk-color-info-foreground: var(--vscode-button-foreground, #ffffff);

    /* ========================================================================
     * NEUTRAL COLORS
     * Base colors for backgrounds, text, borders, etc.
     * ======================================================================== */

    /* Backgrounds */
    --bk-color-background: var(--vscode-editor-background, #1e1e1e);
    --bk-color-background-secondary: var(--vscode-sideBar-background, #252526);
    --bk-color-background-tertiary: var(--vscode-panel-background, #1e1e1e);
    --bk-color-background-elevated: var(--vscode-editorWidget-background, #252526);

    /* Foregrounds */
    --bk-color-foreground: var(--vscode-foreground, #cccccc);
    --bk-color-foreground-muted: var(--vscode-descriptionForeground, #8c8c8c);
    --bk-color-foreground-disabled: var(--vscode-disabledForeground, #6c6c6c);

    /* Borders */
    --bk-color-border: var(--vscode-input-border, rgba(128, 128, 128, 0.35));
    --bk-color-border-focus: var(--vscode-focusBorder, #007fd4);
    --bk-color-border-hover: var(--vscode-inputOption-activeBorder, #007fd4);

    /* Overlays */
    --bk-color-overlay: rgba(0, 0, 0, 0.5);
    --bk-color-overlay-light: rgba(0, 0, 0, 0.1);

    /* ========================================================================
     * INTERACTIVE STATES
     * Hover, active, focus, and disabled states
     * ======================================================================== */
    --bk-color-hover: var(--vscode-list-hoverBackground, rgba(45, 45, 45, 0.6));
    --bk-color-active: var(--vscode-list-activeSelectionBackground, #094771);
    --bk-color-focus: var(--vscode-focusBorder, #007fd4);
    --bk-color-selected: var(--vscode-list-activeSelectionBackground, #094771);
    --bk-color-selected-foreground: var(--vscode-list-activeSelectionForeground, #ffffff);

    /* ========================================================================
     * INPUT COLORS
     * Form elements and inputs
     * ======================================================================== */
    --bk-color-input-background: var(--vscode-input-background, #3c3c3c);
    --bk-color-input-foreground: var(--vscode-input-foreground, #cccccc);
    --bk-color-input-border: var(--vscode-input-border, rgba(128, 128, 128, 0.35));
    --bk-color-input-placeholder: var(--vscode-input-placeholderForeground, #8c8c8c);
    --bk-color-input-focus-border: var(--vscode-focusBorder, #007fd4);

    /* Input validation */
    --bk-color-input-error: var(--vscode-inputValidation-errorBorder, #be1100);
    --bk-color-input-error-background: var(--vscode-inputValidation-errorBackground, #5a1d1d);
    --bk-color-input-error-foreground: var(--vscode-inputValidation-errorForeground, #ffffff);

    --bk-color-input-warning: var(--vscode-inputValidation-warningBorder, #856404);
    --bk-color-input-warning-background: var(--vscode-inputValidation-warningBackground, #352a05);
    --bk-color-input-warning-foreground: var(--vscode-inputValidation-warningForeground, #ffffff);

    --bk-color-input-info: var(--vscode-inputValidation-infoBorder, #007acc);
    --bk-color-input-info-background: var(--vscode-inputValidation-infoBackground, #063b49);
    --bk-color-input-info-foreground: var(--vscode-inputValidation-infoForeground, #ffffff);

    /* ========================================================================
     * BADGE COLORS
     * Badges, tags, and labels
     * ======================================================================== */
    --bk-color-badge-background: var(--vscode-badge-background, #4d4d4d);
    --bk-color-badge-foreground: var(--vscode-badge-foreground, #ffffff);

    /* ========================================================================
     * LINK COLORS
     * Links and anchor elements
     * ======================================================================== */
    --bk-color-link: var(--vscode-textLink-foreground, #3794ff);
    --bk-color-link-hover: var(--vscode-textLink-activeForeground, #3794ff);
    --bk-color-link-active: var(--vscode-textLink-activeForeground, #3794ff);

    /* ========================================================================
     * CODE COLORS
     * Inline and block code elements
     * ======================================================================== */
    --bk-color-code-background: var(--vscode-textCodeBlock-background, #0a0a0a);
    --bk-color-code-foreground: var(--vscode-editor-foreground, #cccccc);

    /* ========================================================================
     * DROPDOWN COLORS
     * Dropdown menus and select elements
     * ======================================================================== */
    --bk-color-dropdown-background: var(--vscode-dropdown-background, #252526);
    --bk-color-dropdown-foreground: var(--vscode-dropdown-foreground, #cccccc);
    --bk-color-dropdown-border: var(--vscode-dropdown-border, rgba(128, 128, 128, 0.35));
    --bk-color-dropdown-list-background: var(--vscode-dropdown-listBackground, #252526);

    /* ========================================================================
     * CHECKBOX & RADIO COLORS
     * Checkbox and radio button elements
     * ======================================================================== */
    --bk-color-checkbox-background: var(--vscode-checkbox-background, #3c3c3c);
    --bk-color-checkbox-foreground: var(--vscode-checkbox-foreground, #f0f0f0);
    --bk-color-checkbox-border: var(--vscode-checkbox-border, #6b6b6b);
    --bk-color-checkbox-checked-background: var(--vscode-checkbox-selectBackground, #0e639c);
    --bk-color-checkbox-checked-border: var(--vscode-checkbox-selectBorder, #0e639c);

    /* ========================================================================
     * LIST & TREE COLORS
     * List items, tree views, and table rows
     * ======================================================================== */
    --bk-color-list-hover: var(--vscode-list-hoverBackground, rgba(45, 45, 45, 0.6));
    --bk-color-list-active: var(--vscode-list-activeSelectionBackground, #094771);
    --bk-color-list-active-foreground: var(--vscode-list-activeSelectionForeground, #ffffff);
    --bk-color-list-focus: var(--vscode-list-focusBackground, #062f4a);
    --bk-color-list-focus-outline: var(--vscode-list-focusOutline, #007fd4);

    /* ========================================================================
     * SCROLLBAR COLORS
     * Scrollbar styling
     * ======================================================================== */
    --bk-color-scrollbar: var(--vscode-scrollbarSlider-background, rgba(121, 121, 121, 0.4));
    --bk-color-scrollbar-hover: var(--vscode-scrollbarSlider-hoverBackground, rgba(100, 100, 100, 0.7));
    --bk-color-scrollbar-active: var(--vscode-scrollbarSlider-activeBackground, rgba(191, 191, 191, 0.4));

    /* ========================================================================
     * DIVIDER COLORS
     * Separators and dividers
     * ======================================================================== */
    --bk-color-divider: var(--vscode-panelSection-border, rgba(128, 128, 128, 0.2));

    /* ========================================================================
     * SHADOW COLORS
     * Shadows and elevation (complementing existing shadow scale)
     * ======================================================================== */
    --bk-color-shadow: var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));

    /* ========================================================================
     * STATUS BAR COLORS
     * Status bar at the bottom of the window
     * ======================================================================== */
    --bk-color-statusbar-background: var(--vscode-statusBar-background, #007acc);
    --bk-color-statusbar-foreground: var(--vscode-statusBar-foreground, #ffffff);
    --bk-color-statusbar-border: var(--vscode-statusBar-border, transparent);
    --bk-color-statusbar-item-hover: var(--vscode-statusBarItem-hoverBackground, rgba(255, 255, 255, 0.12));
    --bk-color-statusbar-item-active: var(--vscode-statusBarItem-activeBackground, rgba(255, 255, 255, 0.18));
    --bk-color-statusbar-item-error: var(--vscode-statusBarItem-errorBackground, #c72e0f);
    --bk-color-statusbar-item-warning: var(--vscode-statusBarItem-warningBackground, #7a6400);
  }
`;

/**
 * TypeScript type definitions for color tokens
 * Useful for type-safe theme customization
 */
export type ColorToken =
  // Brand
  | "primary"
  | "primary-hover"
  | "primary-active"
  | "primary-foreground"
  | "secondary"
  | "secondary-hover"
  | "secondary-active"
  | "secondary-foreground"
  // Semantic
  | "success"
  | "success-hover"
  | "success-foreground"
  | "warning"
  | "warning-hover"
  | "warning-foreground"
  | "danger"
  | "danger-hover"
  | "danger-foreground"
  | "info"
  | "info-hover"
  | "info-foreground"
  // Neutral
  | "background"
  | "background-secondary"
  | "background-tertiary"
  | "background-elevated"
  | "foreground"
  | "foreground-muted"
  | "foreground-disabled"
  | "border"
  | "border-focus"
  | "border-hover"
  // Interactive
  | "hover"
  | "active"
  | "focus"
  | "selected"
  | "selected-foreground"
  // Input
  | "input-background"
  | "input-foreground"
  | "input-border"
  | "input-placeholder"
  | "input-focus-border"
  | "input-error"
  | "input-error-background"
  | "input-error-foreground"
  | "input-warning"
  | "input-warning-background"
  | "input-warning-foreground"
  | "input-info"
  | "input-info-background"
  | "input-info-foreground"
  // Badge
  | "badge-background"
  | "badge-foreground"
  // Link
  | "link"
  | "link-hover"
  | "link-active"
  // Code
  | "code-background"
  | "code-foreground"
  // Dropdown
  | "dropdown-background"
  | "dropdown-foreground"
  | "dropdown-border"
  | "dropdown-list-background"
  // Checkbox
  | "checkbox-background"
  | "checkbox-foreground"
  | "checkbox-border"
  | "checkbox-checked-background"
  | "checkbox-checked-border"
  // List
  | "list-hover"
  | "list-active"
  | "list-active-foreground"
  | "list-focus"
  | "list-focus-outline"
  // Scrollbar
  | "scrollbar"
  | "scrollbar-hover"
  | "scrollbar-active"
  // Divider
  | "divider"
  // Shadow
  | "shadow"
  // Status Bar
  | "statusbar-background"
  | "statusbar-foreground"
  | "statusbar-border"
  | "statusbar-item-hover"
  | "statusbar-item-active"
  | "statusbar-item-error"
  | "statusbar-item-warning";

/**
 * Helper function to get a color token variable reference
 * @param token - The color token name
 * @returns CSS variable reference string
 *
 * @example
 * ```tsx
 * const Button = styled.button`
 *   background-color: ${getColorToken('primary')};
 *   color: ${getColorToken('primary-foreground')};
 * `;
 * ```
 */
export const getColorToken = (token: ColorToken): string => {
  return `var(--bk-color-${token})`;
};

export default colorTokens;
