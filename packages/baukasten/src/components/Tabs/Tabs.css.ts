import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

/**
 * Tabs container with orientation
 */
export const tabs = recipe({
  base: {
    display: "flex",
    width: "100%",
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "column",
        overflow: "scroll",
      },
      vertical: {
        flexDirection: "row",
        overflow: "scroll",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

/**
 * Tab list container
 */
export const tabList = recipe({
  base: {
    display: "flex",
    gap: 0,
    backgroundColor: "var(--bk-color-background-secondary)",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "none",
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
        borderBottom: "var(--bk-border-width-1) solid var(--bk-color-border)",
      },
      vertical: {
        flexDirection: "column",
        borderRight: "var(--bk-border-width-1) solid var(--bk-color-border)",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

// Hide scrollbar in tab list
globalStyle(`${tabList.classNames.base}::-webkit-scrollbar`, {
  display: "none",
});

/**
 * Tab button with all variants and states
 * This is complex due to orientation × variant × indicatorPosition combinations
 */
export const tab = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    transition: "var(--bk-transition-colors)",
    position: "relative",

    selectors: {
      "&:focus-visible": {
        outline: "var(--bk-border-width-1) solid var(--bk-color-focus)",
        outlineOffset: "-2px", // Negative offset to draw focus ring inside tab boundary
      },
    },
  },
  variants: {
    size: {
      xs: {
        padding: "var(--bk-padding-xs)",
        fontSize: "var(--bk-font-size-xs)",
        minHeight: "var(--bk-size-xs)",
        gap: "var(--bk-gap-xs)",
      },
      sm: {
        padding: "var(--bk-padding-sm)",
        fontSize: "var(--bk-font-size-sm)",
        minHeight: "var(--bk-size-sm)",
        gap: "var(--bk-gap-sm)",
      },
      md: {
        padding: "var(--bk-padding-md)",
        fontSize: "var(--bk-font-size-md)",
        minHeight: "var(--bk-size-md)",
        gap: "var(--bk-gap-sm)",
      },
      lg: {
        padding: "var(--bk-padding-lg)",
        fontSize: "var(--bk-font-size-base)",
        minHeight: "var(--bk-size-lg)",
        gap: "var(--bk-gap-md)",
      },
      xl: {
        padding: "var(--bk-padding-xl)",
        fontSize: "var(--bk-font-size-lg)",
        minHeight: "var(--bk-size-xl)",
        gap: "var(--bk-gap-md)",
      },
    },
    variant: {
      line: {},
      lifted: {
        border: "var(--bk-border-width-1) solid transparent",
      },
      pills: {
        borderRadius: "var(--bk-radius-md)",
        margin: "var(--bk-spacing-1)",
      },
    },
    active: {
      true: {
        backgroundColor: "var(--bk-color-background)",
        color: "var(--bk-color-foreground)",
      },
      false: {
        color: "var(--bk-color-foreground-muted)",
      },
    },
    disabled: {
      true: {
        opacity: "var(--bk-opacity-disabled)",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      false: {
        cursor: "pointer",
      },
    },
  },
  compoundVariants: [
    // Pills variant active state
    {
      variants: { variant: "pills", active: true },
      style: {
        backgroundColor: "var(--bk-color-primary)",
        color: "var(--bk-color-primary-foreground)",
      },
    },
    // Pills hover when active
    {
      variants: { variant: "pills", active: true, disabled: false },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: "var(--bk-color-primary-hover)",
          },
        },
      },
    },
    // Pills hover when not active
    {
      variants: { variant: "pills", active: false, disabled: false },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: "var(--bk-color-hover)",
          },
        },
      },
    },
    // Line/lifted hover when not active and not disabled
    {
      variants: { variant: "line", active: false, disabled: false },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: "var(--bk-color-hover)",
            color: "var(--bk-color-foreground)",
          },
        },
      },
    },
    {
      variants: { variant: "lifted", active: false, disabled: false },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: "var(--bk-color-hover)",
            color: "var(--bk-color-foreground)",
          },
        },
      },
    },
    // Lifted active border
    {
      variants: { variant: "lifted", active: true },
      style: {
        borderColor: "var(--bk-color-border)",
        zIndex: 1, // Lift above adjacent tabs to show border properly
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "line",
    active: false,
    disabled: false,
  },
});

/**
 * Tab content wrapper
 */
export const tabContent = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--bk-gap-sm)",
  flex: 1,
});

/**
 * Tab close button
 */
export const tabCloseButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "var(--bk-spacing-0-5)",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: "var(--bk-radius-sm)",
  color: "var(--bk-color-foreground-muted)",
  cursor: "pointer",
  transition: "var(--bk-transition-colors), var(--bk-transition-opacity)",
  marginLeft: "var(--bk-spacing-1)",
  opacity: 0,
  pointerEvents: "none",

  selectors: {
    "&:hover": {
      backgroundColor: "var(--bk-color-hover)",
      color: "var(--bk-color-foreground)",
    },
    "&:focus-visible": {
      outline: "var(--bk-border-width-1) solid var(--bk-color-focus)",
    },
  },
});

// Show close button on tab hover or when tab is active
globalStyle(`${tab.classNames.base}:hover ${tabCloseButton}`, {
  opacity: 1,
  pointerEvents: "auto",
});

globalStyle(`${tab.classNames.base}[data-active="true"] ${tabCloseButton}`, {
  opacity: 1,
  pointerEvents: "auto",
});

/**
 * Tab panels container
 */
export const tabPanels = style({
  flex: 1,
  overflow: "auto",
});

/**
 * Individual tab panel
 */
export const tabPanel = style({
  padding: "var(--bk-spacing-4)",
  height: "100%",
});

/**
 * Classes for orientation + indicator position combinations
 * These are used for styling pseudo-elements and lifted borders
 */
export const lineIndicatorHorizontalEnd = style({});
export const lineIndicatorHorizontalStart = style({});
export const lineIndicatorVerticalEnd = style({});
export const lineIndicatorVerticalStart = style({});

// Line variant indicators using ::after pseudo-element
globalStyle(`${tab.classNames.base}${lineIndicatorHorizontalEnd}::after`, {
  content: "",
  position: "absolute",
  bottom: "-1px", // Overlap bottom border (var(--bk-border-width-1))
  left: 0,
  right: 0,
  height: "var(--bk-border-width-2)",
  backgroundColor: "transparent",
  transition: "background-color var(--bk-transition-base)",
  zIndex: 1, // Draw above border
});

globalStyle(
  `${tab.classNames.base}${lineIndicatorHorizontalEnd}[data-active="true"]::after`,
  {
    backgroundColor: "var(--bk-color-primary)",
  }
);

globalStyle(`${tab.classNames.base}${lineIndicatorHorizontalStart}::after`, {
  content: "",
  position: "absolute",
  top: "-1px",
  left: 0,
  right: 0,
  height: "var(--bk-border-width-2)",
  backgroundColor: "transparent",
  transition: "background-color var(--bk-transition-base)",
  zIndex: 1,
});

globalStyle(
  `${tab.classNames.base}${lineIndicatorHorizontalStart}[data-active="true"]::after`,
  {
    backgroundColor: "var(--bk-color-primary)",
  }
);

globalStyle(`${tab.classNames.base}${lineIndicatorVerticalEnd}::after`, {
  content: "",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: "-1px",
  width: "var(--bk-border-width-2)",
  backgroundColor: "transparent",
  transition: "background-color var(--bk-transition-base)",
  zIndex: 1,
});

globalStyle(
  `${tab.classNames.base}${lineIndicatorVerticalEnd}[data-active="true"]::after`,
  {
    backgroundColor: "var(--bk-color-primary)",
  }
);

globalStyle(`${tab.classNames.base}${lineIndicatorVerticalStart}::after`, {
  content: "",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "-1px",
  width: "var(--bk-border-width-2)",
  backgroundColor: "transparent",
  transition: "background-color var(--bk-transition-base)",
  zIndex: 1,
});

globalStyle(
  `${tab.classNames.base}${lineIndicatorVerticalStart}[data-active="true"]::after`,
  {
    backgroundColor: "var(--bk-color-primary)",
  }
);

/**
 * Lifted variant border radius classes
 */
export const liftedHorizontalEnd = style({
  borderRadius: "var(--bk-radius-md) var(--bk-radius-md) 0 0",
  marginBottom: "calc(-1 * var(--bk-border-width-1))",
});

export const liftedHorizontalStart = style({
  borderRadius: "0 0 var(--bk-radius-md) var(--bk-radius-md)",
  marginTop: "calc(-1 * var(--bk-border-width-1))",
});

export const liftedVerticalEnd = style({
  borderRadius: "var(--bk-radius-md) 0 0 var(--bk-radius-md)",
  marginRight: "calc(-1 * var(--bk-border-width-1))",
});

export const liftedVerticalStart = style({
  borderRadius: "0 var(--bk-radius-md) var(--bk-radius-md) 0",
  marginLeft: "calc(-1 * var(--bk-border-width-1))",
});

// Lifted active border removal with ::before pseudo-element
globalStyle(
  `${tab.classNames.base}${liftedHorizontalEnd}[data-active="true"]`,
  {
    borderBottom: "none",
  }
);

globalStyle(
  `${tab.classNames.base}${liftedHorizontalEnd}[data-active="true"]::before`,
  {
    content: "",
    position: "absolute",
    bottom: "-1px",
    left: 0,
    right: 0,
    height: "var(--bk-border-width-1)",
    backgroundColor: "var(--bk-color-background)",
    zIndex: 2,
  }
);

globalStyle(
  `${tab.classNames.base}${liftedHorizontalStart}[data-active="true"]`,
  {
    borderTop: "none",
  }
);

globalStyle(
  `${tab.classNames.base}${liftedHorizontalStart}[data-active="true"]::before`,
  {
    content: "",
    position: "absolute",
    top: "-1px",
    left: 0,
    right: 0,
    height: "var(--bk-border-width-1)",
    backgroundColor: "var(--bk-color-background)",
    zIndex: 2,
  }
);

globalStyle(`${tab.classNames.base}${liftedVerticalEnd}[data-active="true"]`, {
  borderRight: "none",
});

globalStyle(
  `${tab.classNames.base}${liftedVerticalEnd}[data-active="true"]::before`,
  {
    content: "",
    position: "absolute",
    right: "-1px",
    top: 0,
    bottom: 0,
    width: "var(--bk-border-width-1)",
    backgroundColor: "var(--bk-color-background)",
    zIndex: 2,
  }
);

globalStyle(
  `${tab.classNames.base}${liftedVerticalStart}[data-active="true"]`,
  {
    borderLeft: "none",
  }
);

globalStyle(
  `${tab.classNames.base}${liftedVerticalStart}[data-active="true"]::before`,
  {
    content: "",
    position: "absolute",
    left: "-1px",
    top: 0,
    bottom: 0,
    width: "var(--bk-border-width-1)",
    backgroundColor: "var(--bk-color-background)",
    zIndex: 2,
  }
);
