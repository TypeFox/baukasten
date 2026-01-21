import { recipe } from "@vanilla-extract/recipes";
import { globalStyle, style } from "@vanilla-extract/css";

/**
 * ButtonGroup wrapper
 */
export const buttonGroup = recipe({
  base: {
    display: "inline-flex",
    position: "relative",
  },

  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {},
    },
    showSeparator: {
      true: {},
      false: {},
    },
  },

  defaultVariants: {
    fullWidth: false,
    showSeparator: false,
  },
});

/**
 * Remove border radius and borders between buttons
 * Using [class] attribute selector for higher specificity without !important
 */
globalStyle(
  `${buttonGroup.classNames.base} > button[class]:not(:first-child):not(:last-child)`,
  {
    borderRadius: 0,
  }
);

globalStyle(
  `${buttonGroup.classNames.base} > div > button[class]:not(:first-child):not(:last-child)`,
  {
    borderRadius: 0,
  }
);

/**
 * First button - keep left radius
 * Using [class] attribute selector for higher specificity without !important
 */
globalStyle(`${buttonGroup.classNames.base} > button[class]:first-child`, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

globalStyle(
  `${buttonGroup.classNames.base} > div:first-child > button[class]`,
  {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }
);

/**
 * Last button - keep right radius
 * Using [class] attribute selector for higher specificity without !important
 */
globalStyle(`${buttonGroup.classNames.base} > button[class]:last-child`, {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

globalStyle(`${buttonGroup.classNames.base} > div:last-child > button[class]`, {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

/**
 * Remove right border from all but last button to avoid double borders
 * Using [class] attribute selector for higher specificity without !important
 */
globalStyle(`${buttonGroup.classNames.base} > button[class]:not(:last-child)`, {
  borderRight: "none",
});

globalStyle(
  `${buttonGroup.classNames.base} > div:not(:last-child) > button[class]`,
  {
    borderRight: "none",
  }
);

/**
 * Full width children
 */
globalStyle(`${buttonGroup.classNames.variants.fullWidth.true} > button`, {
  flex: 1,
});

globalStyle(`${buttonGroup.classNames.variants.fullWidth.true} > div`, {
  flex: 1,
});

/**
 * Add separator line between buttons when showSeparator is true
 */
globalStyle(`${buttonGroup.classNames.variants.showSeparator.true} > button:not(:last-child)::after`, {
  content: "",
  position: "absolute",
  right: 0,
  top: "20%",
  bottom: "20%",
  width: "var(--border-width-1)",
  backgroundColor: "currentColor",
  opacity: 0.2,
  pointerEvents: "none",
});

globalStyle(
  `${buttonGroup.classNames.variants.showSeparator.true} > div:not(:last-child) > button::after`,
  {
    content: "",
    position: "absolute",
    right: 0,
    top: "20%",
    bottom: "20%",
    width: "var(--border-width-1)",
    backgroundColor: "currentColor",
    opacity: 0.2,
    pointerEvents: "none",
  }
);

/**
 * Dropdown trigger wrapper
 */
export const dropdownTriggerWrapper = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
  },

  variants: {
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },

  defaultVariants: {
    size: "md",
  },
});

/**
 * Make dropdown button more compact with size-specific widths
 */
globalStyle(`${dropdownTriggerWrapper.classNames.base} > button`, {
  minWidth: "auto",
  paddingLeft: 0,
  paddingRight: 0,
  justifyContent: "center",
});

globalStyle(`${dropdownTriggerWrapper.classNames.variants.size.xs} > button`, {
  width: "var(--size-xs)",
});

globalStyle(`${dropdownTriggerWrapper.classNames.variants.size.sm} > button`, {
  width: "var(--size-sm)",
});

globalStyle(`${dropdownTriggerWrapper.classNames.variants.size.md} > button`, {
  width: "var(--size-md)",
});

globalStyle(`${dropdownTriggerWrapper.classNames.variants.size.lg} > button`, {
  width: "var(--size-lg)",
});

globalStyle(`${dropdownTriggerWrapper.classNames.variants.size.xl} > button`, {
  width: "var(--size-xl)",
});

/**
 * Dropdown content container - positioned by Floating UI
 */
export const dropdownPortalContent = style({
  zIndex: "var(--z-index-dropdown)",
  minWidth: "var(--spacing-20)",
  backgroundColor: "var(--color-dropdown-list-background)",
  border: "var(--border-width-1) solid var(--color-dropdown-border)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-lg)",
  opacity: 0,
  transform: "scale(0.95)",
  transition: "opacity var(--transition-fast) ease, transform var(--transition-fast) ease",
  overflow: "auto",
  maxHeight: "var(--spacing-80)",
  selectors: {
    '&[data-status="open"]': {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});
