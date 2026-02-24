"use client";

/**
 * baukasten-ui/core
 *
 * Fundamental UI primitives — form controls, typography, feedback, layout,
 * and the shared design-token infrastructure.  Every component in this
 * entry point is either a leaf (no cross-component deps) or depends only
 * on Icon / PortalProvider which are also part of core.
 *
 * For higher-level compositions (DataTable, Tabs, Menu, etc.) import from
 * "baukasten-ui/extra".
 */

// ─── Foundation ──────────────────────────────────────────────────────────────

export { Icon } from "./components/Icon";
export type { IconProps, IconSize, CodiconName } from "./components/Icon";

export { IconButton } from "./components/IconButton";
export type {
    IconButtonProps,
    IconButtonVariant,
} from "./components/IconButton";

// ─── Form Controls ──────────────────────────────────────────────────────────

export { Button } from "./components/Button";
export type {
    ButtonProps,
    ButtonVariant,
    ButtonWidth,
} from "./components/Button";

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
    SelectBaseProps,
    SingleSelectProps,
    MultiSelectProps,
    SelectOption,
    SelectPosition,
} from "./components/Select";

export { Slider } from "./components/Slider";
export type { SliderProps } from "./components/Slider";

// ─── Form Helpers ───────────────────────────────────────────────────────────

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

// ─── Typography ─────────────────────────────────────────────────────────────

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

// ─── Data Display ───────────────────────────────────────────────────────────

export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";

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

// ─── Feedback ───────────────────────────────────────────────────────────────

export { Alert } from "./components/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert";

export { Spinner } from "./components/Spinner";
export type { SpinnerProps } from "./components/Spinner";

export { ProgressBar } from "./components/ProgressBar";
export type {
    ProgressBarProps,
    ProgressBarVariant,
} from "./components/ProgressBar";

export { Tooltip } from "./components/Tooltip";
export type {
    TooltipProps,
    TooltipPlacement,
    TooltipVariant,
} from "./components/Tooltip";

export { Modal, ModalHeader, ModalBody, ModalFooter } from "./components/Modal";
export type {
    ModalProps,
    ModalHeaderProps,
    ModalBodyProps,
    ModalFooterProps,
    ModalSize,
    BackdropVariant,
} from "./components/Modal";

// ─── Layout ─────────────────────────────────────────────────────────────────

export { Divider } from "./components/Divider";
export type {
    DividerProps,
    DividerOrientation,
    DividerStyle,
    DividerLabelAlign,
} from "./components/Divider";

export { Dropdown } from "./components/Dropdown";
export type { DropdownProps, DropdownPlacement } from "./components/Dropdown";

// ─── Context Providers ──────────────────────────────────────────────────────

export { PortalProvider, usePortalRoot } from "./context";
export type { PortalProviderProps, PortalContextValue } from "./context";

// ─── Style Utilities ────────────────────────────────────────────────────────

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
