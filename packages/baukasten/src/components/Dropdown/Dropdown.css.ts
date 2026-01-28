import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

/**
 * Dropdown wrapper
 */
export const dropdownWrapper = style({
  position: "relative",
  display: "inline-block",
});

/**
 * Trigger wrapper
 */
export const triggerWrapper = recipe({
  base: {},

  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: "var(--bk-opacity-disabled)",
      },
      false: {
        cursor: "pointer",
        opacity: 1,
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

/**
 * Dropdown content (legacy - kept for backward compatibility)
 */
export const dropdownContent = recipe({
  base: {
    position: "absolute",
    zIndex: "var(--bk-z-index-dropdown)",
    minWidth: "calc(var(--bk-spacing-20) * 2)",
    backgroundColor: "var(--bk-color-dropdown-list-background)",
    border: "var(--bk-border-width-1) solid var(--bk-color-dropdown-border)",
    borderRadius: "var(--bk-radius-md)",
    boxShadow: "var(--bk-shadow-lg)",
    transition:
      "opacity var(--bk-transition-fast), transform var(--bk-transition-fast), visibility var(--bk-transition-fast)",
  },

  variants: {
    placement: {
      "bottom-start": {
        top: "calc(100% + var(--bk-spacing-1))",
        left: 0,
      },
      "bottom-end": {
        top: "calc(100% + var(--bk-spacing-1))",
        right: 0,
      },
      "top-start": {
        bottom: "calc(100% + var(--bk-spacing-1))",
        left: 0,
      },
      "top-end": {
        bottom: "calc(100% + var(--bk-spacing-1))",
        right: 0,
      },
    },
    isOpen: {
      true: {
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
        userSelect: "auto",
        pointerEvents: "auto",
      },
      false: {
        opacity: 0,
        visibility: "hidden",
        userSelect: "none",
        pointerEvents: "none",
      },
    },
  },

  compoundVariants: [
    // Closed transform for top placements
    {
      variants: { isOpen: false, placement: "top-start" },
      style: { transform: "translateY(var(--bk-spacing-1))" },
    },
    {
      variants: { isOpen: false, placement: "top-end" },
      style: { transform: "translateY(var(--bk-spacing-1))" },
    },
    // Closed transform for bottom placements
    {
      variants: { isOpen: false, placement: "bottom-start" },
      style: { transform: "translateY(calc(-1 * var(--bk-spacing-1)))" },
    },
    {
      variants: { isOpen: false, placement: "bottom-end" },
      style: { transform: "translateY(calc(-1 * var(--bk-spacing-1)))" },
    },
  ],

  defaultVariants: {
    placement: "bottom-start",
    isOpen: false,
  },
});

/**
 * Portal content - positioned by Floating UI
 */
export const portalContent = style({
  zIndex: "var(--bk-z-index-dropdown)",
  minWidth: "calc(var(--bk-spacing-20) * 2)",
  backgroundColor: "var(--bk-color-dropdown-list-background)",
  border: "var(--bk-border-width-1) solid var(--bk-color-dropdown-border)",
  borderRadius: "var(--bk-radius-md)",
  boxShadow: "var(--bk-shadow-lg)",
  opacity: 0,
  transform: "scale(0.95)",
  transition: "opacity var(--bk-transition-fast) ease, transform var(--bk-transition-fast) ease",
  overflow: "visible", // Allow submenus to overflow (changed from "auto" to allow nested SubMenu components to render independently)
  selectors: {
    "&[data-status='open']": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});
