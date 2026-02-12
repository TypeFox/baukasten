"use client";

// Components
export { Accordion, AccordionItem } from "./components/Accordion";
export type { AccordionProps, AccordionItemProps } from "./components/Accordion";

export { Alert } from "./components/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarShape } from "./components/Avatar";

export { Button } from "./components/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonWidth,
} from "./components/Button";

export { ButtonGroup } from "./components/ButtonGroup";
export type {
  ButtonGroupProps,
  ButtonGroupDropdownProps,
} from "./components/ButtonGroup";

export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";

export { TextArea } from "./components/TextArea";
export type { TextAreaProps, TextAreaResize } from "./components/TextArea";

export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps, CheckboxVariant } from "./components/Checkbox";

export { Radio, RadioGroup, useRadioGroup } from "./components/Radio";
export type {
  RadioProps,
  RadioGroupProps,
  RadioGroupOrientation,
} from "./components/Radio";

export { Select } from "./components/Select";
export type {
  SelectProps,
  SelectOption,
  SelectPosition,
} from "./components/Select";

export { Slider } from "./components/Slider";
export type { SliderProps } from "./components/Slider";

export { Dropdown } from "./components/Dropdown";
export type { DropdownProps, DropdownPlacement } from "./components/Dropdown";

export { FileUpload } from "./components/FileUpload";
export type { FileUploadProps, FileUploadVariant } from "./components/FileUpload";

export { Menu, MenuItem, MenuDivider, SubMenu } from "./components/Menu";
export type {
  MenuProps,
  MenuItemProps,
  MenuDividerProps,
  SubMenuProps,
} from "./components/Menu";

export { ContextMenu } from "./components/ContextMenu";
export type { ContextMenuProps } from "./components/ContextMenu";

export { Modal, ModalHeader, ModalBody, ModalFooter } from "./components/Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
  BackdropVariant,
} from "./components/Modal";

export { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./components/Drawer";
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerPlacement,
  DrawerSize,
} from "./components/Drawer";

export { Label } from "./components/Label";
export type { LabelProps, LabelVariant } from "./components/Label";

export { FieldLabel } from "./components/FieldLabel";
export type { FieldLabelProps } from "./components/FieldLabel";

export { FormHelper } from "./components/FormHelper";
export type {
  FormHelperProps,
  FormHelperVariant,
} from "./components/FormHelper";

export { FormGroup } from "./components/FormGroup";
export type {
  FormGroupProps,
  FormGroupOrientation,
} from "./components/FormGroup";

export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

export { Breadcrumbs } from "./components/Breadcrumbs";
export type { BreadcrumbsProps, BreadcrumbItem, BreadcrumbVariant } from "./components/Breadcrumbs";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination";

export { ProgressBar } from "./components/ProgressBar";
export type {
  ProgressBarProps,
  ProgressBarVariant,
} from "./components/ProgressBar";

export { Spinner } from "./components/Spinner";
export type { SpinnerProps } from "./components/Spinner";

export { SplitPane, Pane } from "./components/SplitPane";
export type {
  SplitPaneProps,
  PaneProps,
  SplitPaneOrientation,
} from "./components/SplitPane";

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

export { Divider } from "./components/Divider";
export type {
  DividerProps,
  DividerOrientation,
  DividerStyle,
  DividerLabelAlign,
} from "./components/Divider";

export { Tooltip } from "./components/Tooltip";
export type {
  TooltipProps,
  TooltipPlacement,
  TooltipVariant,
} from "./components/Tooltip";

export { Icon } from "./components/Icon";
export type { IconProps, IconSize, CodiconName } from "./components/Icon";

export {
  Heading,
  Text,
  Paragraph,
  Code,
  Link,
  Image,
} from "./components/Typography";
export type {
  HeadingProps,
  HeadingLevel,
  TextProps,
  ParagraphProps,
  CodeProps,
  LinkProps,
  ImageProps,
} from "./components/Typography";

export { Hero } from "./components/Hero";
export type { HeroProps } from "./components/Hero";

export { Table } from "./components/Table";
export type {
  TableProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TableVariant,
  ColumnAlign,
  SortDirection,
} from "./components/Table";

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

export { StatusBar, StatusBarSection, StatusBarItem } from "./components/StatusBar";
export type {
  StatusBarProps,
  StatusBarSectionProps,
  StatusBarItemProps,
  StatusBarAlign,
  StatusBarItemVariant,
} from "./components/StatusBar";

// Context providers
export { PortalProvider, usePortalRoot } from "./context";
export type { PortalProviderProps, PortalContextValue } from "./context";

// Style utilities
export * from "./styles";

/**
 * GlobalStyles component for runtime CSS injection
 *
 * Use this component OR pre-built CSS files:
 * - baukasten-ui/dist/baukasten-vscode.css for VS Code
 * - baukasten-ui/dist/baukasten-theia.css for Eclipse Theia
 * - baukasten-ui/dist/baukasten-web.css for standalone web apps
 *
 * Both approaches use the same token definitions, ensuring consistency.
 */
export { GlobalStyles } from "./styles/global-styles";
