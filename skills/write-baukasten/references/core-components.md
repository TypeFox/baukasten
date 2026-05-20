# Core Components Reference

Full prop tables and examples for every component in `baukasten-ui/core`. Components are listed in the order they appear in the source.

> **Always use semantic design tokens** (`var(--bk-*)`) — never hardcode colors or sizes, never use `--vscode-*` directly. See [../reference/design-tokens.md](./design-tokens.md) for the token catalog.

---

### Icon

VSCode Codicon icon component. Type-safe with 600+ icon names.

```tsx
import { Icon } from 'baukasten-ui/core';

// Props
interface IconProps {
  name: CodiconName;           // e.g. 'check', 'close', 'search', 'file', 'chevron-right'
  size?: 'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'; // default: inherits from parent
  color?: string;              // CSS color value, default: inherits
  spin?: boolean;              // default: false - rotating animation
  rotate?: number;             // rotation degrees
  className?: string;
}

// Examples
<Icon name="check" />
<Icon name="search" size="lg" />
<Icon name="error" color="var(--bk-color-danger)" />
<Icon name="loading" spin />
<Icon name="chevron-right" rotate={90} />
```

### IconButton

Square icon-only button matching Button height. For toolbars and compact actions.

```tsx
import { IconButton } from 'baukasten-ui/core';

// Props (extends HTMLButtonAttributes)
interface IconButtonProps {
  icon: React.ReactNode;       // Typically <Icon name="..." />
  variant?: 'primary'|'secondary'|'ghost'|'link'; // default: 'primary'
  size?: Size;                 // default: 'md'
  outline?: boolean;           // default: false
}

// Examples
<IconButton icon={<Icon name="close" />} aria-label="Close" />
<IconButton icon={<Icon name="save" />} variant="ghost" size="sm" aria-label="Save" />
<IconButton icon={<Icon name="edit" />} outline aria-label="Edit" />
```

### Button

Versatile button with variants and sizes.

```tsx
import { Button } from 'baukasten-ui/core';

// Props (extends HTMLButtonAttributes)
interface ButtonProps {
  variant?: 'primary'|'secondary'|'ghost'|'link'; // default: 'primary'
  size?: Size;                 // default: 'md'
  width?: 'block'|'wide';     // 'block'=100%, 'wide'=max 256px
  outline?: boolean;           // default: false
  circular?: boolean;          // default: false
}

// Examples
<Button>Click me</Button>
<Button variant="secondary" size="lg">Large Secondary</Button>
<Button variant="ghost" outline>Outline Ghost</Button>
<Button width="block">Full Width</Button>
<Button circular><Icon name="add" /></Button>

// With icon
<Button><Icon name="save" /> Save Changes</Button>
```

### Input

Text input with error state support.

```tsx
import { Input } from 'baukasten-ui/core';

// Props (extends HTMLInputAttributes, omits 'size')
interface InputProps {
  size?: Size;                 // default: 'md'
  error?: string | boolean;    // string shows message, boolean shows border only
  fullWidth?: boolean;         // default: false
}

// Examples
<Input placeholder="Enter text..." />
<Input size="lg" placeholder="Large input" />
<Input error="This field is required" placeholder="Email" />
<Input error={!!hasError} placeholder="Email" />  // border only
<Input fullWidth type="email" placeholder="Email address" />
```

### TextArea

Multi-line text input with auto-grow support.

```tsx
import { TextArea } from 'baukasten-ui/core';

// Props (extends HTMLTextareaAttributes, omits 'size')
interface TextAreaProps {
  size?: Size;                 // default: 'md'
  error?: string | boolean;    // same as Input
  fullWidth?: boolean;         // default: false
  resize?: 'none'|'vertical'|'horizontal'|'both'; // default: 'vertical'
  rows?: number;               // default: 4 (static height)
  minRows?: number;            // enables auto-grow
  maxRows?: number;            // enables auto-grow
}

// Examples
<TextArea placeholder="Enter description..." />
<TextArea rows={6} resize="none" />
<TextArea minRows={2} maxRows={6} placeholder="Auto-growing textarea" />
<TextArea error="Required" fullWidth />
```

### Checkbox

Checkbox with optional switch variant. Use with Label for accessible labels.

```tsx
import { Checkbox } from 'baukasten-ui/core';

// Props (extends HTMLInputAttributes, omits 'size'|'type')
interface CheckboxProps {
  variant?: 'checkbox'|'switch'; // default: 'checkbox'
  size?: Size;                 // default: 'md'
  indeterminate?: boolean;     // default: false
}

// Examples - ALWAYS wrap with Label for accessible text
<Label variant="checkbox" size="md">
  <Checkbox name="terms" />
  <span>Accept terms</span>
</Label>

// Switch variant
<Label variant="checkbox" size="md">
  <Checkbox variant="switch" name="notifications" />
  <span>Enable notifications</span>
</Label>

// Controlled
const [checked, setChecked] = useState(false);
<Label variant="checkbox" size="md">
  <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  <span>Controlled checkbox</span>
</Label>

// Indeterminate (select all)
<Label variant="checkbox" size="md">
  <Checkbox indeterminate name="select-all" />
  <span>Select all</span>
</Label>
```

### Radio & RadioGroup

Radio buttons for single selection from a group.

```tsx
import { Radio, RadioGroup, Label } from 'baukasten-ui/core';

// RadioGroup Props
interface RadioGroupProps {
  name: string;                // shared name for all radios
  value?: string | number;     // controlled value
  defaultValue?: string | number; // uncontrolled default
  onChange?: (value: string | number) => void;
  disabled?: boolean;          // default: false
  orientation?: 'vertical'|'horizontal'; // default: 'vertical'
}

// Radio Props (extends HTMLInputAttributes, omits 'size'|'type')
interface RadioProps {
  value: string | number;      // required
  size?: Size;                 // default: 'md'
}

// Example - controlled RadioGroup
const [theme, setTheme] = useState('light');
<RadioGroup name="theme" value={theme} onChange={setTheme}>
  <Label variant="checkbox" size="md">
    <Radio value="light" />
    <span>Light theme</span>
  </Label>
  <Label variant="checkbox" size="md">
    <Radio value="dark" />
    <span>Dark theme</span>
  </Label>
</RadioGroup>

// Horizontal layout
<RadioGroup name="size" value={size} onChange={setSize} orientation="horizontal">
  <Label variant="checkbox" size="sm">
    <Radio value="small" size="sm" />
    <span>Small</span>
  </Label>
  <Label variant="checkbox" size="sm">
    <Radio value="medium" size="sm" />
    <span>Medium</span>
  </Label>
</RadioGroup>
```

### Select

Custom dropdown with keyboard navigation, search, multi-select, and custom rendering.

```tsx
import { Select } from 'baukasten-ui/core';

// Option type
interface SelectOption<T = string> {
  value: T;
  label?: string;
  description?: string;        // for search filtering & description panel
  disabled?: boolean;
  defaultLabel?: string;       // right-side muted text (e.g. "recommended")
}

// Props (generic over value type T)
interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value?: T;                   // controlled (single) or T[] (multi)
  defaultValue?: T;            // uncontrolled
  onChange?: (value: T) => void; // or (value: T[]) => void for multi
  multiple?: boolean;          // default: false - enables multi-select with checkboxes
  placeholder?: string;        // default: 'Select an option...'
  size?: Size;                 // default: 'md'
  position?: 'auto'|'top'|'bottom'; // default: 'auto'
  disabled?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;        // default: false
  searchPlaceholder?: string;  // default: 'Search...'
  error?: string;
  filterOption?: (option, searchValue) => boolean;
  renderOption?: (option, isSelected) => ReactNode;
  renderValue?: (option) => ReactNode;
  maxDropdownHeight?: string;  // default: '300px'
  dropdownClassName?: string;  // custom class for the dropdown portal element
  showDescriptionPanel?: boolean; // default: true
  id?: string;                 // for label association
  onOpen?: () => void;
  onClose?: () => void;
}

// Basic
<Select
  options={[
    { value: 'ts', label: 'TypeScript' },
    { value: 'js', label: 'JavaScript' },
  ]}
  value={lang}
  onChange={setLang}
  placeholder="Select language"
/>

// Searchable with descriptions
<Select
  searchable
  options={[
    { value: 'ts', label: 'TypeScript', description: 'Typed superset of JavaScript' },
    { value: 'js', label: 'JavaScript', description: 'Dynamic scripting language' },
  ]}
/>

// Multi-select
<Select
  multiple
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
/>

// With custom rendering
<Select
  options={options}
  renderOption={(option) => (
    <span><Icon name="check" /> {option.label}</span>
  )}
/>
```

### Slider

Range slider with marks, value display, and drag optimization.

```tsx
import { Slider } from 'baukasten-ui/core';

// Props (extends HTMLInputAttributes, omits 'size'|'type'|'onChange')
interface SliderProps {
  size?: Size;                 // default: 'md'
  min?: number;                // default: 0
  max?: number;                // default: 100
  step?: number;               // default: 1
  value?: number;              // default: midpoint
  defaultValue?: number;
  onChange?: (value: number) => void;          // fires during drag
  onChangeCommitted?: (value: number) => void; // fires on release
  showMinMax?: boolean;        // default: false
  showValue?: boolean;         // default: false
  formatValue?: (value: number) => string;
  fullWidth?: boolean;
  marks?: boolean | number | SliderMark[]; // default: false
}

// Examples
<Slider value={50} onChange={setValue} />
<Slider min={0} max={200} step={10} showMinMax showValue />
<Slider marks={10} step={5} />
<Slider
  marks={[
    { value: 0, label: 'Min' },
    { value: 50, label: 'Mid' },
    { value: 100, label: 'Max' },
  ]}
/>
<Slider showValue formatValue={(v) => `${v}%`} />
```

### Label

Form label wrapper for inputs, textareas, and checkboxes/radios. Provides styled containers with error support.

```tsx
import { Label } from 'baukasten-ui/core';

// Props (extends HTMLLabelAttributes)
interface LabelProps {
  variant?: 'input'|'textarea'|'checkbox'; // default: 'input'
  size?: Size;                 // default: 'md'
  fullWidth?: boolean;         // default: false
  error?: string;              // error message below the label
}

// Input variant (default) - wraps inputs/selects with border container
<Label variant="input" size="md">
  <span className="label">https://</span>
  <Input size="md" type="text" placeholder="URL" />
</Label>

<Label variant="input" size="md">
  <span className="label"><Icon name="search" /></span>
  <Input size="md" placeholder="Search..." />
</Label>

<Label variant="input" size="md" error="This field is required">
  <Input size="md" placeholder="Username" />
</Label>

// Textarea variant - vertical layout with label text on top
<Label variant="textarea">
  <span className="label">Description</span>
  <TextArea placeholder="Enter description..." />
</Label>

<Label variant="textarea" fullWidth>
  <span className="label">
    <Icon name="note" />
    Comments
  </span>
  <TextArea placeholder="Enter your comments..." rows={6} />
</Label>

// Checkbox variant - wraps checkboxes/radios/switches
<Label variant="checkbox" size="md">
  <Checkbox name="agree" />
  <span>I agree</span>
</Label>
```

### FieldLabel

Field label with optional required indicator. Unlike Label (which wraps inputs), FieldLabel is a traditional text label.

```tsx
import { FieldLabel } from 'baukasten-ui/core';

// Props (extends HTMLLabelAttributes)
interface FieldLabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;          // default: false — shows red * indicator
  disabled?: boolean;          // default: false — dims label text
}

<FieldLabel htmlFor="name" required>Full Name</FieldLabel>
<Input id="name" />

<FieldLabel htmlFor="readonly" disabled>Read-only Field</FieldLabel>
<Input id="readonly" disabled />
```

### FormGroup

Groups form elements with consistent spacing.

```tsx
import { FormGroup } from 'baukasten-ui/core';

// Props
interface FormGroupProps {
    orientation?: 'vertical' | 'horizontal'; // default: 'horizontal'
    compact?: boolean; // default: false - use compact spacing
    labelWidth?: string; // default: '30%' - label column width (horizontal only)
    children: ReactNode;
    className?: string;
}

// Example
<FormGroup>
    <FieldLabel htmlFor="name" required>
        Name
    </FieldLabel>
    <Input id="name" placeholder="Enter name" />
    <FormHelper>Your full legal name</FormHelper>
</FormGroup>;
```

### FormHelper

Helper or error text below form fields.

```tsx
import { FormHelper } from 'baukasten-ui/core';

// Props
interface FormHelperProps {
  variant?: 'default'|'error'|'warning'|'success'|'info'; // default: 'default'
  children: ReactNode;
  className?: string;
}

// Examples
<FormHelper>Enter your email address</FormHelper>
<FormHelper variant="error">This field is required</FormHelper>
<FormHelper variant="warning">Password strength: weak</FormHelper>
<FormHelper variant="success">Looks good!</FormHelper>
<FormHelper variant="info">Your API key will be encrypted at rest</FormHelper>
```

### Typography: Heading

Semantic heading (h1-h6).

```tsx
import { Heading } from 'baukasten-ui/core';

// Props (extends HTMLHeadingAttributes)
interface HeadingProps {
  level?: 1|2|3|4|5|6;        // default: 1
  align?: 'left'|'center'|'right'; // default: 'left'
  marginBottom?: boolean;      // default: true
  marginTop?: boolean;         // default: true
}

<Heading>Main Title</Heading>
<Heading level={2} align="center">Centered Subtitle</Heading>
<Heading level={3} marginBottom={false}>Tight Heading</Heading>
```

### Typography: Text

Versatile inline/block text with styling variants.

```tsx
import { Text } from 'baukasten-ui/core';

// Props (extends HTMLSpanAttributes, omits 'color')
interface TextProps {
  size?: FontSize;             // default: 'md'
  weight?: 'light'|'normal'|'medium'|'semibold'|'bold'; // default: 'normal'
  color?: 'default'|'muted'|'primary'|'success'|'warning'|'danger'|'info'; // default: 'default'
  block?: boolean;             // renders as div, default: false
  align?: 'left'|'center'|'right'|'justify'; // only when block=true
  truncate?: boolean;          // default: false
  italic?: boolean;            // default: false
  monospace?: boolean;         // default: false
}

<Text>Regular text</Text>
<Text weight="bold" color="primary">Important</Text>
<Text size="sm" color="muted">Helper text</Text>
<Text block align="center" size="lg">Centered block</Text>
<Text truncate>Very long text that will be truncated...</Text>
<Text monospace italic>Code-like text</Text>
```

### Typography: Paragraph, Code, Link, Image

```tsx
import { Paragraph, Code, Link, Image } from 'baukasten-ui/core';

// Paragraph - block text element with alignment, line height, and truncation
// Props: size?, align?('left'|'center'|'right'|'justify'), lineHeight?('tight'|'normal'|'relaxed'|'loose'),
//        marginBottom?(boolean, default true), maxLines?(number)
<Paragraph>Block of text content.</Paragraph>
<Paragraph size="sm">Small paragraph.</Paragraph>
<Paragraph align="center" marginBottom={false}>Centered, no margin.</Paragraph>
<Paragraph lineHeight="relaxed" maxLines={3}>Truncated after 3 lines...</Paragraph>

// Code - inline or block code display
// Props: block?(boolean, default false), size?('xs'|'sm'|'md'|'base', default 'sm'),
//        wrap?(boolean, default false for inline / true for block), maxHeight?(string, block only)
<Code>const x = 1;</Code>           // inline
<Code block>{codeString}</Code>     // block
<Code block wrap maxHeight="200px">{longCode}</Code>

// Link - anchor with variants, underline control, and external indicator
// Props: size?, variant?('default'|'muted'|'primary'), underline?('always'|'hover'|'never', default: 'hover'),
//        external?(boolean, default: false - adds target="_blank" rel="noopener noreferrer")
<Link href="/docs">Documentation</Link>
<Link href="https://example.com" variant="muted">Muted Link</Link>
<Link href="https://example.com" external>External Site</Link>
<Link variant="primary" underline="always" href="/important">Always Underlined</Link>
<Link variant="muted" underline="never" href="/about">No Underline</Link>

// Image - responsive with loading states and captions (extends HTMLImgAttributes)
// Props: aspectRatio?('1/1'|'4/3'|'16/9'|'21/9'|'3/2'|string), fit?('cover'|'contain'|'fill'|'none'|'scale-down', default 'cover'),
//        radius?('none'|'sm'|'md'|'lg'|'full', default 'none'), bordered?(boolean), shadow?(boolean),
//        caption?(ReactNode), captionPosition?('bottom'|'overlay', default 'bottom'), captionAlign?('left'|'center'|'right', default 'center'),
//        showSkeleton?(boolean, default true), placeholder?(ReactNode), errorContent?(ReactNode)
<Image src="/photo.jpg" alt="Description" />
<Image src="/photo.jpg" alt="Photo" caption="A lovely photo" radius="md" />
<Image src="/photo.jpg" alt="Wide" aspectRatio="16/9" fit="cover" shadow bordered />
<Image src="/photo.jpg" alt="Avatar" aspectRatio="1/1" radius="full" />
```

### Badge

Small status indicator/label.

```tsx
import { Badge } from 'baukasten-ui/core';

// Props (extends HTMLSpanAttributes)
interface BadgeProps {
  variant?: 'default'|'success'|'warning'|'error'|'info'; // default: 'default'
  size?: Size;                 // default: 'md'
  outline?: boolean;           // default: false
}

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">Failed</Badge>
<Badge variant="info" outline>Beta</Badge>
```

### Tag

Categorization/labeling with rounded-rectangle shape. Distinct from Badge (pill-shaped status).

```tsx
import { Tag } from 'baukasten-ui/core';

// Props (extends HTMLSpanAttributes)
interface TagProps {
  variant?: 'default'|'primary'|'secondary'|'success'|'warning'|'error'|'info'; // default: 'default'
  size?: Size;                 // default: 'md'
  outline?: boolean;           // default: false
}

<Tag variant="primary">React</Tag>
<Tag variant="success" outline>Approved</Tag>
<Tag variant="info"><Icon name="tag" /> Category</Tag>
```

### Table

Feature-rich compound table with sorting, sticky headers, loading/empty states, and style variants.

```tsx
import { Table } from 'baukasten-ui/core';

// Table is a compound component accessed via Table.* sub-components
// Table props (extends HTMLTableAttributes)
interface TableProps {
  variant?: 'default'|'zebra';   // default: 'default' — 'zebra' = alternating row colors
  size?: Size;                   // default: 'md'
  bordered?: boolean;            // default: true — show cell borders
  fullWidth?: boolean;           // default: true — table takes full width
  maxHeight?: number | string;   // scrollable container height (enables sticky headers)
  caption?: React.ReactNode;     // table caption for accessibility
  captionSide?: 'top'|'bottom';  // default: 'top'
}

// Table.Head props
interface TableHeadProps {
  sticky?: boolean;              // default: false — sticky header on scroll (needs maxHeight on Table)
}

// Table.Row props
interface TableRowProps {
  selected?: boolean;            // default: false — highlighted row
  hoverable?: boolean;           // default: true — hover effect on row
}

// Table.HeaderCell props
interface TableHeaderCellProps {
  align?: 'left'|'center'|'right'; // default: 'left'
  sortable?: boolean;            // default: false — enables click-to-sort
  sortDirection?: 'asc'|'desc'|null; // current sort direction
  onSort?: () => void;           // sort callback
}

// Table.Cell props
interface TableCellProps {
  align?: 'left'|'center'|'right'; // default: 'left'
}

// Table.Footer — wraps <tfoot> (extends HTMLTableSectionElement attributes)

// Table.Body props (with loading/empty states)
interface TableBodyProps {
  loading?: boolean;             // default: false
  loadingText?: string;          // default: 'Loading...'
  loadingComponent?: React.ReactNode;
  empty?: boolean;               // default: false
  emptyText?: string;            // default: 'No data available'
  emptyComponent?: React.ReactNode;
  colSpan?: number;              // default: 999 — colspan for loading/empty row
}

// Basic usage
<Table variant="zebra">
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

// With sticky header and scrollable area
<Table maxHeight={400} bordered={false}>
  <Table.Head sticky>
    <Table.Row>
      <Table.HeaderCell sortable sortDirection="asc" onSort={() => handleSort('name')}>
        Name
      </Table.HeaderCell>
      <Table.HeaderCell align="right">Amount</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body loading={isLoading} empty={data.length === 0} emptyText="No records found" colSpan={2}>
    {data.map(row => (
      <Table.Row key={row.id} selected={row.id === selectedId} hoverable>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell align="right">{row.amount}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

### Alert

Alert messages with auto-icon per variant.

```tsx
import { Alert } from 'baukasten-ui/core';

// Props (extends HTMLDivAttributes)
interface AlertProps {
  variant?: 'info'|'success'|'warning'|'error'; // default: 'info'
  title?: string;
  icon?: React.ReactNode;     // null to hide, custom ReactNode to override
  closable?: boolean;          // default: false
  onClose?: () => void;
}

<Alert>Informational message</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="error" closable onClose={handleClose}>Something went wrong</Alert>
<Alert variant="warning" icon={<Icon name="flame" />}>Custom icon alert</Alert>
```

### Spinner

Loading indicator.

```tsx
import { Spinner } from 'baukasten-ui/core';

// Props (standalone interface — does NOT extend HTML attributes)
interface SpinnerProps {
  size?: Size;                 // default: 'md'
  color?: string;              // CSS color value, default: 'var(--bk-color-primary)'
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

<Spinner />
<Spinner size="lg" aria-label="Loading data..." />
<Spinner color="var(--bk-color-success)" />
```

### ProgressBar

Progress indicator with variants. Supports determinate and indeterminate modes.

```tsx
import { ProgressBar } from 'baukasten-ui/core';

// Props
interface ProgressBarProps {
  value?: number;              // 0-100; when undefined, shows indeterminate loading state
  variant?: 'default'|'primary'|'success'|'warning'|'danger'|'info'; // default: 'default'
  height?: string;             // CSS height value, default: 'var(--bk-spacing-2)' (8px)
  showLabel?: boolean;         // shows percentage text, default: false
  striped?: boolean;           // striped pattern, default: false
  animated?: boolean;          // animate stripes (requires striped), default: false
  className?: string;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

<ProgressBar value={65} />
<ProgressBar value={100} variant="success" showLabel />
<ProgressBar variant="primary" />              {/* indeterminate (no value) */}
<ProgressBar value={80} height="12px" />
<ProgressBar value={60} striped />
<ProgressBar value={70} striped animated />
```

### Tooltip

Hover tooltip using Floating UI. Respects PortalProvider.

```tsx
import { Tooltip } from 'baukasten-ui/core';

// Props
interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement; // default: 'top'
    // All 12 Floating UI placements:
    // 'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'
    // 'left'|'left-start'|'left-end'|'right'|'right-start'|'right-end'
  variant?: 'default'|'primary'|'success'|'warning'|'error'|'info'; // default: 'default'
  showArrow?: boolean;         // default: true
  maxWidth?: string;           // default: '320px'
  delay?: number;              // ms before showing, default: 0
  children: React.ReactNode;   // trigger element
}

<Tooltip content="Delete this item" placement="top">
  <IconButton icon={<Icon name="trash" />} variant="ghost" aria-label="Delete" />
</Tooltip>

<Tooltip content="Error details" variant="error" placement="bottom-start">
  <Icon name="error" />
</Tooltip>

<Tooltip content="No arrow" showArrow={false}>
  <Button>Hover</Button>
</Tooltip>
```

### Modal

Dialog overlay with composable header/body/footer.

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'baukasten-ui/core';

// Modal props
interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: Size | 'fullscreen';  // default: 'md'
  backdropVariant?: 'solid'|'blur'|'transparent'; // default: 'solid'
  closeOnBackdropClick?: boolean; // default: true
  closeOnEscape?: boolean;     // default: true
  children: React.ReactNode;
  className?: string;
}

// ModalHeader props (ModalBody/ModalFooter also accept children + className)
interface ModalHeaderProps {
  showCloseButton?: boolean;   // default: true
  onClose?: () => void;        // needed for close button to work
  children: React.ReactNode;
  className?: string;
}

// Example
<Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
  <ModalHeader onClose={() => setIsOpen(false)}>
    Confirm Delete
  </ModalHeader>
  <ModalBody>
    Are you sure you want to delete this file?
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleDelete}>Delete</Button>
  </ModalFooter>
</Modal>

// Fullscreen with blur backdrop
<Modal open={isOpen} onClose={handleClose} size="fullscreen" backdropVariant="blur">
  <ModalHeader onClose={handleClose}>Preview</ModalHeader>
  <ModalBody>...</ModalBody>
</Modal>
```

### Divider

Horizontal/vertical separator with optional label, custom spacing, and color.

```tsx
import { Divider } from 'baukasten-ui/core';

// Props
interface DividerProps {
  orientation?: 'horizontal'|'vertical'; // default: 'horizontal'
  variant?: 'solid'|'dashed'|'dotted';   // default: 'solid'
  label?: React.ReactNode;      // label text (horizontal only)
  labelAlign?: 'left'|'center'|'right'; // default: 'center'
  spacing?: string;              // default: 'var(--bk-spacing-4)' — vertical margin (horizontal) or horizontal margin (vertical)
  color?: string;                // custom border color, default: 'var(--bk-color-border)'
  className?: string;
  style?: React.CSSProperties;
}

<Divider />
<Divider variant="dashed" />
<Divider label="OR" />
<Divider label="Section" labelAlign="left" />
<Divider orientation="vertical" />
<Divider spacing="var(--bk-spacing-8)" />
<Divider color="var(--bk-color-primary)" />
```

### Dropdown

Generic floating dropdown container. Respects PortalProvider.

```tsx
import { Dropdown } from 'baukasten-ui/core';

// Props
interface DropdownProps {
    trigger: React.ReactNode; // element that opens dropdown
    children: React.ReactNode; // dropdown content
    open?: boolean; // controlled mode
    onOpenChange?: (open: boolean) => void;
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'; // default: 'bottom-start'
    closeOnClick?: boolean; // close on content click, default: true
    disabled?: boolean; // default: false
    minWidth?: string | number; // default: '10rem'
    maxWidth?: string | number; // default: '24rem'
    modal?: boolean; // trap focus within dropdown, default: false
    className?: string; // CSS class for trigger wrapper
}

// Used with Menu for dropdown menus
<Dropdown
    trigger={
        <Button variant="ghost">
            Options <Icon name="chevron-down" />
        </Button>
    }
>
    <Menu>
        <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
        <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
    </Menu>
</Dropdown>;

// Controlled with placement
const [open, setOpen] = useState(false);
<Dropdown
    trigger={<Button>Toggle</Button>}
    open={open}
    onOpenChange={setOpen}
    placement="top-end"
    closeOnClick={false}
>
    <div>Content stays open on click</div>
</Dropdown>;
```

### PortalProvider

Context for multi-window portal support (Eclipse Theia).

```tsx
import { PortalProvider } from 'baukasten-ui/core';

// Props
interface PortalProviderProps {
    root: HTMLElement | null; // portal target element
    children: React.ReactNode;
}

// For secondary windows (Theia)
const rootRef = useRef<HTMLDivElement>(null);
<div ref={rootRef}>
    <PortalProvider root={rootRef.current}>
        {/* Select, Dropdown, Tooltip, ContextMenu portals render here */}
        <YourContent />
    </PortalProvider>
</div>;
```
