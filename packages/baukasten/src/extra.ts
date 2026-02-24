"use client";

/**
 * baukasten-ui/extra
 *
 * Higher-level compositions, specialized components, and components with
 * heavy external dependencies.  Everything here may depend on core
 * components (Button, Icon, Select, etc.) but core never depends on extra.
 *
 * For fundamental primitives import from "baukasten-ui/core".
 * For everything at once import from "baukasten-ui".
 */

// ─── Data ───────────────────────────────────────────────────────────────────

export { DataTable, createSelectColumn, useDataTable } from "./components/DataTable";
export type {
    DataTableProps,
    DataTableVariant,
    DataTableColumnAlign,
    ColumnDef,
    SortingState,
    PaginationState,
    RowSelectionState,
    ColumnResizeMode,
    Row,
} from "./components/DataTable";

// ─── Navigation ─────────────────────────────────────────────────────────────

export { Tabs, TabList, Tab, TabPanels, TabPanel } from "./components/Tabs";
export type {
    TabsProps,
    TabProps,
    TabListProps,
    TabPanelProps,
    TabPanelsProps,
    TabsOrientation,
    TabsVariant,
    TabsIndicatorPosition,
} from "./components/Tabs";

export { Breadcrumbs } from "./components/Breadcrumbs";
export type { BreadcrumbsProps, BreadcrumbItem, BreadcrumbVariant } from "./components/Breadcrumbs";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination";

export { Menu, MenuItem, MenuDivider, SubMenu } from "./components/Menu";
export type {
    MenuProps,
    MenuItemProps,
    MenuDividerProps,
    SubMenuProps,
} from "./components/Menu";

export { ContextMenu } from "./components/ContextMenu";
export type { ContextMenuProps } from "./components/ContextMenu";

// ─── Form ───────────────────────────────────────────────────────────────────

export { ButtonGroup } from "./components/ButtonGroup";
export type {
    ButtonGroupProps,
    ButtonGroupDropdownProps,
} from "./components/ButtonGroup";

export { FileUpload } from "./components/FileUpload";
export type { FileUploadProps, FileUploadVariant } from "./components/FileUpload";

// ─── Layout ─────────────────────────────────────────────────────────────────

export { Accordion, AccordionItem } from "./components/Accordion";
export type { AccordionProps, AccordionItemProps } from "./components/Accordion";

export { SplitPane, Pane } from "./components/SplitPane";
export type {
    SplitPaneProps,
    PaneProps,
    SplitPaneOrientation,
} from "./components/SplitPane";

// ─── Specialized ────────────────────────────────────────────────────────────

export { StatusBar, StatusBarSection, StatusBarItem } from "./components/StatusBar";
export type {
    StatusBarProps,
    StatusBarSectionProps,
    StatusBarItemProps,
    StatusBarAlign,
    StatusBarItemVariant,
} from "./components/StatusBar";

export { Hero } from "./components/Hero";
export type { HeroProps } from "./components/Hero";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarShape } from "./components/Avatar";
