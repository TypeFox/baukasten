# Extra Components Reference

Full prop tables and examples for every component in `baukasten-ui/extra` (except DataTable, which has its own file: [datatable.md](./datatable.md)).

`baukasten-ui/extra` provides higher-level compositions that may depend on core components. May require additional peer dependencies in some cases.

> **Always use semantic design tokens** (`var(--bk-*)`). See [./design-tokens.md](./design-tokens.md) for the catalog.

---

### Tabs

Tabbed interface with variants and orientation options.

```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'baukasten-ui/extra';

// Tabs props
interface TabsProps {
  value?: string;              // controlled mode
  defaultValue?: string;       // uncontrolled mode
  onChange?: (value: string) => void;
  orientation?: 'horizontal'|'vertical'; // default: 'horizontal'
  variant?: 'line'|'lifted'|'pills';     // default: 'line'
  indicatorPosition?: 'start'|'end';     // default: 'end'
  size?: Size;                 // default: 'md'
}

// Tab props
interface TabProps {
  value: string;               // unique identifier
  icon?: CodiconName;          // optional codicon
  closable?: boolean;          // default: false
  onClose?: (value: string) => void;
  disabled?: boolean;
}

// Basic
<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Overview</Tab>
    <Tab value="tab2">Settings</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="tab1">Overview content</TabPanel>
    <TabPanel value="tab2">Settings content</TabPanel>
  </TabPanels>
</Tabs>

// With icons and closable tabs
<Tabs defaultValue="file1" variant="line">
  <TabList>
    <Tab value="file1" icon="file" closable onClose={handleClose}>index.ts</Tab>
    <Tab value="file2" icon="file" closable>styles.css</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="file1">File content</TabPanel>
    <TabPanel value="file2">Styles content</TabPanel>
  </TabPanels>
</Tabs>

// Controlled
const [tab, setTab] = useState('tab1');
<Tabs value={tab} onChange={setTab}>...</Tabs>
```

### Breadcrumbs

Breadcrumb navigation with collapsing and icon support.

```tsx
import { Breadcrumbs } from 'baukasten-ui/extra';
import type { BreadcrumbItem } from 'baukasten-ui/extra';

// BreadcrumbItem
interface BreadcrumbItem {
  label: string;
  href?: string;                 // renders as <a> link
  onClick?: (e: React.MouseEvent) => void; // click handler (renders as <button> if no href)
  icon?: React.ReactNode;        // icon element before label
}

// Props
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;   // default: '/'
  variant?: 'default'|'pill';    // default: 'default'
  size?: Size;                   // default: 'md'
  maxItems?: number;             // collapse middle items with ellipsis when exceeded
  ariaLabel?: string;            // default: 'Breadcrumb'
  className?: string;
}

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },  // last item = current page (no link)
]} />

// With icons, pill variant, and collapsing
<Breadcrumbs
  items={[
    { label: 'Home', href: '/', icon: <Icon name="home" /> },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Phones', href: '/phones' },
    { label: 'Details' },
  ]}
  variant="pill"
  maxItems={3}
/>

// With click handlers
<Breadcrumbs items={[
  { label: 'Home', onClick: () => navigate('/') },
  { label: 'Products', onClick: () => navigate('/products') },
  { label: 'Current' },
]} />
```

### Pagination

Page navigation with range display, page size selector, and smart ellipsis.

```tsx
import { Pagination } from 'baukasten-ui/extra';

// Props
interface PaginationProps {
  totalItems: number;            // total number of data items
  currentPage: number;           // 1-indexed current page
  pageSize: number;              // items per page
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];    // default: [10, 25, 50, 100]
  onPageSizeChange?: (size: number) => void;
  showPageSizeSelector?: boolean; // default: true (only shows if onPageSizeChange is also provided)
  maxVisiblePages?: number;      // default: 7 — page buttons before ellipsis
  showRangeText?: boolean;       // default: true — shows "1-10 of 100"
  size?: Size;                   // default: 'md'
  className?: string;
}

// Basic usage
<Pagination
  totalItems={100}
  currentPage={page}
  pageSize={10}
  onPageChange={setPage}
/>

// With page size selector
<Pagination
  totalItems={500}
  currentPage={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[10, 25, 50, 100]}
/>

// Compact — no range text, no page size selector
<Pagination
  totalItems={1000}
  currentPage={page}
  pageSize={pageSize}
  onPageChange={setPage}
  size="sm"
  showRangeText={false}
  showPageSizeSelector={false}
/>
```

### Menu & MenuItem

Menu items for use inside Dropdown or ContextMenu.

```tsx
import { Menu, MenuItem, MenuDivider, SubMenu } from 'baukasten-ui/extra';

// Menu props
interface MenuProps {
    size?: Size; // default: 'md'
    iconOnly?: boolean; // default: false - reduces padding
    direction?: 'vertical' | 'horizontal'; // default: 'vertical'
}

// MenuItem props (extends HTMLDivAttributes)
interface MenuItemProps {
    icon?: React.ReactNode;
    rightContent?: React.ReactNode; // badges, shortcuts
    disabled?: boolean;
    selected?: boolean;
}

// SubMenu props
interface SubMenuProps {
    label: React.ReactNode;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode; // default: chevron-right icon
    disabled?: boolean;
}

// Inside a Dropdown
<Dropdown trigger={<Button>File</Button>}>
    <Menu>
        <MenuItem
            icon={<Icon name="new-file" />}
            rightContent={
                <Text size="xs" color="muted">
                    Ctrl+N
                </Text>
            }
        >
            New File
        </MenuItem>
        <MenuItem icon={<Icon name="folder-opened" />}>Open Folder</MenuItem>
        <MenuDivider />
        <SubMenu label="Recent" icon={<Icon name="history" />}>
            <MenuItem>project-a</MenuItem>
            <MenuItem>project-b</MenuItem>
        </SubMenu>
        <MenuDivider />
        <MenuItem icon={<Icon name="close" />}>Exit</MenuItem>
    </Menu>
</Dropdown>;
```

### ContextMenu

Right-click context menu. Respects PortalProvider.

```tsx
import { ContextMenu } from 'baukasten-ui/extra';

// Props
interface ContextMenuProps {
    menu: React.ReactNode; // Menu component
    children: React.ReactNode; // trigger area
    disabled?: boolean;
    size?: Size; // default: 'md' — passed to Menu
    onOpen?: () => void;
    onClose?: () => void;
}

<ContextMenu
    menu={
        <Menu>
            <MenuItem icon={<Icon name="edit" />}>Edit</MenuItem>
            <MenuItem icon={<Icon name="copy" />}>Copy</MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon name="trash" />}>Delete</MenuItem>
        </Menu>
    }
>
    <div style={{ padding: 'var(--bk-padding-lg)' }}>Right-click anywhere here</div>
</ContextMenu>;
```

### ButtonGroup

Groups related buttons together with connected styling.

```tsx
import { ButtonGroup } from 'baukasten-ui/extra';

// ButtonGroup props (extends HTMLDivAttributes)
interface ButtonGroupProps {
  children: React.ReactNode;   // Button elements
  fullWidth?: boolean;         // take full width, default: false
  showSeparator?: boolean;     // show separator lines between buttons, default: false
}

// ButtonGroup.Dropdown props - split button dropdown trigger
interface ButtonGroupDropdownProps {
  content: React.ReactNode;    // dropdown menu content (NOT children)
  placement?: 'bottom-start'|'bottom-end'|'top-start'|'top-end'; // default: 'bottom-end'
  closeOnClick?: boolean;      // default: true
  open?: boolean;              // controlled mode
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;          // default: false
  variant?: ButtonVariant;     // default: 'primary'
  size?: Size;                 // default: 'md'
  outline?: boolean;           // default: false
  icon?: React.ReactNode;      // custom icon, default: chevron-down
  ariaLabel?: string;          // default: 'Open dropdown'
}

// Basic button group
<ButtonGroup>
  <Button variant="primary">Cut</Button>
  <Button variant="primary">Copy</Button>
  <Button variant="primary">Paste</Button>
</ButtonGroup>

// Full width with separators
<ButtonGroup fullWidth showSeparator>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>

// Split button pattern - uses `content` prop for the menu
<ButtonGroup>
  <Button variant="primary" onClick={() => console.log('Save')}>Save</Button>
  <ButtonGroup.Dropdown variant="primary" content={
    <Menu>
      <MenuItem>Save As...</MenuItem>
      <MenuItem>Save All</MenuItem>
    </Menu>
  } />
</ButtonGroup>
```

### FileUpload

File upload with drag & drop.

```tsx
import { FileUpload } from 'baukasten-ui/extra';

// Props (extends HTMLDivAttributes, omits 'onChange')
interface FileUploadProps {
  onChange?: (files: File[]) => void; // callback when files are selected/dropped
  accept?: string;             // MIME types (e.g., 'image/*,.pdf')
  multiple?: boolean;          // default: false
  maxFiles?: number;           // maximum number of files allowed
  maxSize?: number;            // max file size in bytes
  size?: Size;                 // default: 'md'
  variant?: 'default'|'primary'|'dashed'; // default: 'dashed'
  disabled?: boolean;          // default: false
  label?: string;              // default: "Drop files here or click to browse"
  description?: string;        // description text below the label
  showFileList?: boolean;      // default: true - show list of selected files
  files?: File[];              // for controlled component
}

// Basic usage
<FileUpload onChange={(files) => console.log(files)} />

// With restrictions
<FileUpload
  accept="image/*"
  multiple
  maxFiles={5}
  maxSize={5 * 1024 * 1024}  // 5MB
  onChange={(files) => handleFiles(files)}
/>

// Custom styling and labels
<FileUpload
  variant="primary"
  size="lg"
  label="Upload your documents"
  description="PDF, DOC, DOCX up to 10MB"
/>

// Controlled component
const [files, setFiles] = useState<File[]>([]);
<FileUpload
  files={files}
  onChange={setFiles}
  showFileList
/>
```

### Drawer

Slide-in panel from any edge. Composable like Modal.

```tsx
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from 'baukasten-ui/extra';

// Props
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  placement?: 'top'|'right'|'bottom'|'left'; // default: 'right'
  size?: Size | 'fullscreen' | string; // default: 'md', accepts CSS values like '400px'
  backdropVariant?: 'solid'|'blur'|'transparent'; // default: 'solid'
  closeOnBackdropClick?: boolean; // default: true
  closeOnEscape?: boolean;     // default: true
}

// DrawerHeader accepts: onClose, showCloseButton?(default true), children, className
// DrawerBody/DrawerFooter accept: children, className

<Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" size="md">
  <DrawerHeader onClose={() => setIsOpen(false)}>Settings</DrawerHeader>
  <DrawerBody>
    <FormGroup>
      <FieldLabel>Theme</FieldLabel>
      <Select options={themeOptions} value={theme} onChange={setTheme} />
    </FormGroup>
  </DrawerBody>
  <DrawerFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </DrawerFooter>
</Drawer>

// Left navigation drawer
<Drawer open={navOpen} onClose={closeNav} placement="left" size="sm">
  <DrawerHeader onClose={closeNav}>Navigation</DrawerHeader>
  <DrawerBody><nav>...</nav></DrawerBody>
</Drawer>

// Custom size
<Drawer open={isOpen} onClose={close} size="400px">...</Drawer>
```

### Accordion

Collapsible content panels.

```tsx
import { Accordion, AccordionItem } from 'baukasten-ui/extra';

// Accordion props (extends HTMLDivAttributes, omits 'onToggle')
interface AccordionProps {
  exclusive?: boolean;         // only one open at a time, default: false
  defaultOpen?: string;        // default open item key
  onAccordionChange?: (key: string) => void;
}

// AccordionItem props (extends HTMLDivAttributes, omits 'title')
interface AccordionItemProps {
  title: React.ReactNode;      // header text
  id?: string;                 // unique key (for exclusive mode)
  defaultOpen?: boolean;       // default: false
  icon?: React.ReactNode;      // optional icon before title
  disabled?: boolean;
}

// Basic
<Accordion>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>

// Exclusive (only one open at a time)
<Accordion exclusive defaultOpen="section-1">
  <AccordionItem id="section-1" title="General">General settings</AccordionItem>
  <AccordionItem id="section-2" title="Advanced">Advanced settings</AccordionItem>
</Accordion>
```

### Tree

Hierarchical tree view with expand/collapse, single-selection, optional guide edges, custom expand icons, keyboard navigation (arrow keys / Home / End / Enter / Space), and ARIA tree semantics.

```tsx
import { Tree } from 'baukasten-ui/extra';
import type { TreeNodeData, TreeEdgeStyle, ExpandIconRenderProps } from 'baukasten-ui/extra';

// TreeNodeData — data shape for each node
interface TreeNodeData {
  id: string;                  // unique identifier
  label: React.ReactNode;      // displayed in the row
  icon?: React.ReactNode;      // icon before label
  badge?: React.ReactNode;     // content on the right (badges, actions)
  children?: TreeNodeData[];
  disabled?: boolean;
}

// Tree props (extends HTMLDivAttributes, omits 'onSelect')
interface TreeProps {
  nodes: TreeNodeData[];
  size?: Size;                                                          // default: 'md'

  // Expansion (controlled or uncontrolled)
  expandedKeys?: string[];                                              // controlled
  defaultExpandedKeys?: string[];                                       // default: []
  onExpandChange?: (
    expandedKeys: string[],
    info: { key: string; expanded: boolean; node: TreeNodeData },
  ) => void;

  // Selection (single, controlled or uncontrolled)
  selectable?: boolean;                                                 // default: true
  selectedKey?: string | null;                                          // controlled
  defaultSelectedKey?: string | null;
  onSelect?: (key: string, node: TreeNodeData) => void;

  // Customization
  expandIcon?: (props: ExpandIconRenderProps) => React.ReactNode;       // return null to hide
  edgeStyle?: 'solid'|'dashed'|'dotted'|'none';                         // default: 'none' — guide lines
  indentSize?: number;                                                  // default: 20 (px per level)
  expandOnClick?: boolean;                                              // default: true — clicking row toggles
}

// ExpandIconRenderProps — passed to custom expandIcon renderer
interface ExpandIconRenderProps {
  expanded: boolean;
  node: TreeNodeData;
  hasChildren: boolean;
}

// Basic file tree
const nodes: TreeNodeData[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Icon name="folder" />,
    children: [
      { id: 'src/index.ts', label: 'index.ts', icon: <Icon name="file" /> },
      { id: 'src/App.tsx', label: 'App.tsx', icon: <Icon name="file" /> },
    ],
  },
  { id: 'package.json', label: 'package.json', icon: <Icon name="file" /> },
];
<Tree nodes={nodes} defaultExpandedKeys={['src']} />

// With guide edges and badges
<Tree
  nodes={nodes}
  edgeStyle="dashed"
  defaultExpandedKeys={['src']}
/>

// Controlled selection + expansion
const [expanded, setExpanded] = useState<string[]>(['src']);
const [selected, setSelected] = useState<string | null>(null);
<Tree
  nodes={nodes}
  expandedKeys={expanded}
  onExpandChange={setExpanded}
  selectedKey={selected}
  onSelect={(key) => setSelected(key)}
/>

// Nodes with badges (right-side content) and disabled state
const nodes: TreeNodeData[] = [
  {
    id: 'errors',
    label: 'Errors',
    icon: <Icon name="error" />,
    badge: <Badge variant="error" size="sm">3</Badge>,
    children: [...],
  },
  { id: 'legacy', label: 'Legacy', disabled: true },
];

// Custom expand icon (return null to hide it for leaves)
<Tree
  nodes={nodes}
  expandIcon={({ expanded, hasChildren }) =>
    hasChildren ? <Icon name={expanded ? 'chevron-down' : 'chevron-right'} /> : null
  }
/>
```

### SplitPane

Resizable split layout. Uses `SplitPane.Pane` sub-components with `preferredSize` for initial sizing.

```tsx
import { SplitPane } from 'baukasten-ui/extra';

// SplitPane props
interface SplitPaneProps {
  orientation?: 'horizontal'|'vertical'; // default: 'horizontal'
  minSize?: number;            // minimum pane size in px for all panes (default: 50)
  children: React.ReactNode;   // SplitPane.Pane elements
}

// Pane props (SplitPane.Pane)
interface PaneProps {
  minSize?: number;            // override min for this pane (px)
  maxSize?: number;            // max size for this pane (px)
  preferredSize?: number;      // initial size: px (>1) or fraction (0-1)
  children: React.ReactNode;
}

// Horizontal split with preferred sizes (fractions 0-1)
<SplitPane orientation="horizontal">
  <SplitPane.Pane preferredSize={0.3} minSize={200}>
    <nav>Sidebar</nav>
  </SplitPane.Pane>
  <SplitPane.Pane>
    <main>Main Content</main>
  </SplitPane.Pane>
</SplitPane>

// Vertical split with pixel sizes
<SplitPane orientation="vertical">
  <SplitPane.Pane>Editor</SplitPane.Pane>
  <SplitPane.Pane preferredSize={200} minSize={100}>Terminal</SplitPane.Pane>
</SplitPane>

// Three-pane layout
<SplitPane orientation="horizontal">
  <SplitPane.Pane preferredSize={0.2} minSize={150}>Sidebar</SplitPane.Pane>
  <SplitPane.Pane>Main</SplitPane.Pane>
  <SplitPane.Pane preferredSize={0.25} minSize={200}>Details</SplitPane.Pane>
</SplitPane>
```

### StatusBar

VSCode-style status bar.

```tsx
import { StatusBar, StatusBarSection, StatusBarItem } from 'baukasten-ui/extra';

// StatusBar props
interface StatusBarProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

// StatusBarItem props (extends HTMLDivAttributes)
interface StatusBarItemProps {
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'error' | 'warning' | 'info' | 'success'; // default: 'default'
    active?: boolean; // default: false - active/selected state
    tooltip?: string; // native title tooltip
}

<StatusBar>
    <StatusBarSection align="left">
        <StatusBarItem icon={<Icon name="git-branch" />}>main</StatusBarItem>
        <StatusBarItem icon={<Icon name="sync" />}>0 changes</StatusBarItem>
    </StatusBarSection>
    <StatusBarSection align="right">
        <StatusBarItem>Ln 42, Col 18</StatusBarItem>
        <StatusBarItem>UTF-8</StatusBarItem>
        <StatusBarItem icon={<Icon name="bell" />} onClick={handleNotifs} />
    </StatusBarSection>
</StatusBar>;
```

### Hero

Hero section component with large, impactful typography.

```tsx
import { Hero } from 'baukasten-ui/extra';

// Props (extends HTMLDivAttributes, omits 'title')
interface HeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left'|'center'|'right'; // default: 'left'
  size?: 'sm'|'md'|'lg'|'xl'|'full'; // default: 'md' (height: sm=20vh, md=40vh, lg=60vh, xl=80vh, full=100vh)
  background?: 'default'|'secondary'|'tertiary'|'elevated'; // default: 'default'
  children?: React.ReactNode;  // rendered below title/description (for CTAs, buttons, etc.)
}

// Basic usage
<Hero
  title="Welcome to My App"
  description="Build amazing VSCode extensions"
/>

// With CTA buttons (use children, not actions)
<Hero
  title="Welcome to My App"
  description="Build amazing VSCode extensions"
  align="center"
>
  <div style={{ display: 'flex', gap: 'var(--bk-spacing-4)', marginTop: 'var(--bk-spacing-6)' }}>
    <Button variant="primary" size="lg">Get Started</Button>
    <Button variant="secondary" size="lg">Documentation</Button>
  </div>
</Hero>

// Large hero with custom background
<Hero
  title="Transform Your Workflow"
  description="Powerful tools for modern development"
  size="lg"
  background="secondary"
/>

// Full viewport hero
<Hero title="Welcome" size="full" align="center" />
```

### Avatar

User avatar with image/initials fallback and optional tooltip.

```tsx
import { Avatar } from 'baukasten-ui/extra';

// Props (extends HTMLDivAttributes, omits 'children')
interface AvatarProps {
  src?: string;                // image URL
  alt?: string;                // default: name prop value
  name?: string;               // for initials fallback and tooltip
  size?: Size;                 // default: 'md'
  shape?: 'circular'|'square'; // default: 'circular'
  tooltip?: string;            // tooltip content; defaults to name if not provided
  showTooltip?: boolean;       // default: true
}

<Avatar src="/avatar.jpg" alt="John" name="John" />
<Avatar name="John Doe" size="lg" />  // shows "JD" initials
<Avatar name="Alice" tooltip="Project Manager" />
<Avatar name="Bob" shape="square" size="xl" />
<Avatar name="Jane" showTooltip={false} />
```
