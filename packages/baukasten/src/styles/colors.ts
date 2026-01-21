/**
 * Semantic color tokens for the design system
 * These provide platform-agnostic color variables that map to VSCode variables by default
 * but can be easily customized for web or other platforms
 */

/**
 * Semantic color system
 * Maps design system colors to VSCode theme variables as defaults
 */
export const colorTokens = `
  :root {
    /* ========================================================================
     * BRAND COLORS
     * Primary colors for main actions and brand identity
     * ======================================================================== */
    --color-primary: var(--vscode-button-background);
    --color-primary-hover: var(--vscode-button-hoverBackground);
    --color-primary-active: var(--vscode-button-hoverBackground);
    --color-primary-foreground: var(--vscode-button-foreground);

    --color-secondary: var(--vscode-button-secondaryBackground);
    --color-secondary-hover: var(--vscode-button-secondaryHoverBackground);
    --color-secondary-active: var(--vscode-button-secondaryHoverBackground);
    --color-secondary-foreground: var(--vscode-button-secondaryForeground);

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
    --color-background: var(--vscode-editor-background);
    --color-background-secondary: var(--vscode-sideBar-background);
    --color-background-tertiary: var(--vscode-panel-background);
    --color-background-elevated: var(--vscode-editorWidget-background);

    /* Foregrounds */
    --color-foreground: var(--vscode-foreground);
    --color-foreground-muted: var(--vscode-descriptionForeground);
    --color-foreground-disabled: var(--vscode-disabledForeground);

    /* Borders */
    --color-border: var(
      --vscode-input-border,
      var(--vscode-contrastBorder, transparent)
    );
    --color-border-focus: var(--vscode-focusBorder);
    --color-border-hover: var(
      --vscode-inputOption-activeBorder,
      var(--vscode-focusBorder)
    );

    /* Overlays */
    --color-overlay: rgba(0, 0, 0, 0.5);
    --color-overlay-light: rgba(0, 0, 0, 0.1);

    /* ========================================================================
     * INTERACTIVE STATES
     * Hover, active, focus, and disabled states
     * ======================================================================== */
    --color-hover: var(--vscode-list-hoverBackground);
    --color-active: var(--vscode-list-activeSelectionBackground);
    --color-focus: var(--vscode-focusBorder);
    --color-selected: var(--vscode-list-activeSelectionBackground);
    --color-selected-foreground: var(--vscode-list-activeSelectionForeground);

    /* ========================================================================
     * INPUT COLORS
     * Form elements and inputs
     * ======================================================================== */
    --color-input-background: var(--vscode-input-background);
    --color-input-foreground: var(--vscode-input-foreground);
    --color-input-border: var(
      --vscode-input-border,
      var(--vscode-contrastBorder, transparent)
    );
    --color-input-placeholder: var(--vscode-input-placeholderForeground);
    --color-input-focus-border: var(--vscode-focusBorder);

    /* Input validation */
    --color-input-error: var(--vscode-inputValidation-errorBorder);
    --color-input-error-background: var(
      --vscode-inputValidation-errorBackground
    );
    --color-input-error-foreground: var(
      --vscode-inputValidation-errorForeground
    );

    --color-input-warning: var(--vscode-inputValidation-warningBorder);
    --color-input-warning-background: var(
      --vscode-inputValidation-warningBackground
    );
    --color-input-warning-foreground: var(
      --vscode-inputValidation-warningForeground
    );

    --color-input-info: var(--vscode-inputValidation-infoBorder);
    --color-input-info-background: var(--vscode-inputValidation-infoBackground);
    --color-input-info-foreground: var(--vscode-inputValidation-infoForeground);

    /* ========================================================================
     * BADGE COLORS
     * Badges, tags, and labels
     * ======================================================================== */
    --color-badge-background: var(--vscode-badge-background);
    --color-badge-foreground: var(--vscode-badge-foreground);

    /* ========================================================================
     * LINK COLORS
     * Links and anchor elements
     * ======================================================================== */
    --color-link: var(--vscode-textLink-foreground);
    --color-link-hover: var(--vscode-textLink-activeForeground);
    --color-link-active: var(--vscode-textLink-activeForeground);

    /* ========================================================================
     * CODE COLORS
     * Inline and block code elements
     * ======================================================================== */
    --color-code-background: var(--vscode-textCodeBlock-background);
    --color-code-foreground: var(--vscode-editor-foreground);

    /* ========================================================================
     * DROPDOWN COLORS
     * Dropdown menus and select elements
     * ======================================================================== */
    --color-dropdown-background: var(--vscode-dropdown-background, var(--vscode-input-background, #252526));
    --color-dropdown-foreground: var(--vscode-dropdown-foreground, var(--vscode-foreground, #cccccc));
    --color-dropdown-border: var(--vscode-dropdown-border, var(--vscode-input-border, rgba(128, 128, 128, 0.35)));
    --color-dropdown-list-background: var(--vscode-dropdown-listBackground, var(--vscode-input-background, #252526));

    /* ========================================================================
     * CHECKBOX & RADIO COLORS
     * Checkbox and radio button elements
     * ======================================================================== */
    --color-checkbox-background: var(--vscode-checkbox-background);
    --color-checkbox-foreground: var(--vscode-checkbox-foreground);
    --color-checkbox-border: var(--vscode-checkbox-border);
    --color-checkbox-checked-background: var(
      --vscode-checkbox-selectBackground
    );
    --color-checkbox-checked-border: var(--vscode-checkbox-selectBorder);

    /* ========================================================================
     * LIST & TREE COLORS
     * List items, tree views, and table rows
     * ======================================================================== */
    --color-list-hover: var(--vscode-list-hoverBackground);
    --color-list-active: var(--vscode-list-activeSelectionBackground);
    --color-list-active-foreground: var(
      --vscode-list-activeSelectionForeground
    );
    --color-list-focus: var(--vscode-list-focusBackground);
    --color-list-focus-outline: var(--vscode-list-focusOutline);

    /* ========================================================================
     * SCROLLBAR COLORS
     * Scrollbar styling
     * ======================================================================== */
    --color-scrollbar: var(--vscode-scrollbarSlider-background);
    --color-scrollbar-hover: var(--vscode-scrollbarSlider-hoverBackground);
    --color-scrollbar-active: var(--vscode-scrollbarSlider-activeBackground);

    /* ========================================================================
     * DIVIDER COLORS
     * Separators and dividers
     * ======================================================================== */
    --color-divider: var(
      --vscode-panelSection-border,
      var(--vscode-contrastBorder, rgba(128, 128, 128, 0.2))
    );

    /* ========================================================================
     * SHADOW COLORS
     * Shadows and elevation (complementing existing shadow scale)
     * ======================================================================== */
    --color-shadow: var(--vscode-widget-shadow, rgba(0, 0, 0, 0.36));

    /* ========================================================================
     * STATUS BAR COLORS
     * Status bar at the bottom of the window
     * ======================================================================== */
    --color-statusbar-background: var(--vscode-statusBar-background);
    --color-statusbar-foreground: var(--vscode-statusBar-foreground);
    --color-statusbar-border: var(--vscode-statusBar-border, transparent);
    --color-statusbar-item-hover: var(--vscode-statusBarItem-hoverBackground);
    --color-statusbar-item-active: var(--vscode-statusBarItem-activeBackground);
    --color-statusbar-item-error: var(--vscode-statusBarItem-errorBackground);
    --color-statusbar-item-warning: var(--vscode-statusBarItem-warningBackground);
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
  return `var(--color-${token})`;
};

export default colorTokens;
