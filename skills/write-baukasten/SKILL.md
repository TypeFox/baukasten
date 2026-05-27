---
name: write-baukasten
description: Use when writing, generating, or reviewing baukasten-ui components or applications using the baukasten design system. TRIGGER when code imports `baukasten-ui`, `baukasten-ui/core`, `baukasten-ui/extra`, or user asks to create UI with baukasten components. DO NOT TRIGGER for general React, CSS, or unrelated UI library work.
license: MIT
user-invocable: true
argument-hint: <component or feature to build>
metadata:
    version: '0.3.0'
---

# Baukasten UI

Baukasten is a React 19 + TypeScript + vanilla-extract UI toolkit that matches the native look-and-feel of VS Code and Eclipse Theia hosts (and falls back gracefully on the web). All styling flows through `--bk-*` semantic design tokens — never hardcode colors or sizes, never reach for `--vscode-*` directly.

This skill is split into a slim index (here) plus lazy-loaded reference files. Read the relevant detail file before generating component code.

## Installation

```bash
# Core library (required)
npm install baukasten-ui react react-dom

# For DataTable component (optional peer dep)
npm install @tanstack/react-table
```

## Setup & Imports

### Entry Points

```tsx
import { Button, Input, Icon } from 'baukasten-ui/core'; // Core primitives
import { Tabs, Menu, DataTable } from 'baukasten-ui/extra'; // Higher-level compositions
```

- `baukasten-ui/core` — fundamental primitives (no heavy deps)
- `baukasten-ui/extra` — composed components, may depend on core
- `baukasten-ui/styles` — design token utilities and types
- `baukasten-ui` — re-exports everything from core + extra

### CSS Files

Every app must import **base CSS** plus **one platform CSS** file:

```tsx
// Always required — component styles
import 'baukasten-ui/dist/baukasten-base.css';

// Then choose ONE platform file:
import 'baukasten-ui/dist/baukasten-vscode.css'; // VS Code extensions (--vscode-* vars)
// OR
import 'baukasten-ui/dist/baukasten-theia.css'; // Eclipse Theia (--theia-* vars)
// OR
import 'baukasten-ui/dist/baukasten-web.css'; // Standalone web apps (fallback values)
```

| File                   | Maps to                | Use case            |
| ---------------------- | ---------------------- | ------------------- |
| `baukasten-base.css`   | vanilla-extract styles | **Always required** |
| `baukasten-vscode.css` | `--vscode-*`           | VS Code extensions  |
| `baukasten-theia.css`  | `--theia-*`            | Eclipse Theia       |
| `baukasten-web.css`    | default values         | Standalone web apps |

### App Root Setup

**VSCode webview:**

```tsx
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-vscode.css';

function App() {
    return <YourApp />;
}
```

**Eclipse Theia:**

```tsx
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-theia.css';

function App() {
    return <YourApp />;
}
```

**Eclipse Theia — multi-window** (secondary/popup windows): wrap children in `PortalProvider` with the window's root element so dropdowns/tooltips render in the right window:

```tsx
import { PortalProvider } from 'baukasten-ui/core';

function SecondaryWindowContent() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);

    return (
        <div ref={rootRef}>
            {ready && (
                <PortalProvider root={rootRef.current}>
                    <YourContent />
                </PortalProvider>
            )}
        </div>
    );
}
```

Portal-aware components: `Select`, `Dropdown`, `Tooltip`, `ContextMenu`, `ButtonGroup.Dropdown`.

**Standalone web app** (no VSCode/Theia host):

```tsx
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';

function App() {
    return <YourApp />;
}
```

### Shared Types

```tsx
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// Most components accept `size?: Size` defaulting to 'md'.
```

---

## Design Token Rules

**ALWAYS use `--bk-*` semantic tokens. NEVER hardcode values or use `--vscode-*` / `--theia-*` directly.** Components consume only `--bk-*`, so the same code adapts to any host.

```tsx
// CORRECT
backgroundColor: 'var(--bk-color-primary)';
padding: 'var(--bk-padding-md)';

// WRONG
backgroundColor: '#007acc';
padding: '8px 16px';
background: 'var(--vscode-button-background)';
```

Common categories:

- Colors: `--bk-color-{primary|secondary|success|warning|danger|info|foreground|background|border|muted}` (+ `-foreground`, `-hover`, `-active` variants where applicable)
- Spacing: `--bk-padding-{xs|sm|md|lg|xl}`, `--bk-gap-{xs|sm|md|lg|xl}`
- Sizes (heights): `--bk-size-{xs|sm|md|lg|xl}`
- Typography: `--bk-font-size-{xs|sm|md|base|lg|xl}`, `--bk-font-weight-{light|normal|medium|semibold|bold}`
- Effects: `--bk-radius-{sm|md|lg|full}`, `--bk-shadow-{sm|md|lg}`, `--bk-transition-{fast|colors|slow}`, `--bk-opacity-disabled`

**Full catalog with platform-mapping notes:** [references/design-tokens.md](./references/design-tokens.md). Read it before writing custom CSS.

---

## Component Index

Each line below points to the section of the relevant reference file where full props, defaults, variants, and examples live. **Read the referenced file before generating code for that component** — these reference files are the source of truth.

### Core (`baukasten-ui/core`)

Full reference: [references/core-components.md](./references/core-components.md)

| Component              | Role                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Icon`                 | VSCode Codicon (600+ type-safe names). Used by most components.                                                                       |
| `IconButton`           | Square icon-only button matching `Button` heights.                                                                                    |
| `Button`               | Variants: `primary` \| `secondary` \| `ghost` \| `link`. Supports `outline`, `circular`, `width="block"` / `"wide"`.                  |
| `Input`                | Text input with optional error state, `fullWidth`.                                                                                    |
| `TextArea`             | Multi-line input with `resize`, auto-grow via `minRows`/`maxRows`.                                                                    |
| `Checkbox`             | `variant: 'checkbox' \| 'switch'`, supports `indeterminate`.                                                                          |
| `Radio` & `RadioGroup` | Single-select group via context.                                                                                                      |
| `Select`               | Floating UI dropdown; single or multi (discriminated union).                                                                          |
| `Slider`               | Range input with `marks` and `onChangeCommitted`.                                                                                     |
| `Label`                | Wrapper-style label. Variants: `input` \| `textarea` \| `checkbox`.                                                                   |
| `FieldLabel`           | Traditional text label above/beside inputs. Supports `required`, `disabled`.                                                          |
| `FormGroup`            | Horizontal (default) or vertical row layout for label + control.                                                                      |
| `FormHelper`           | Helper / error / warning / info text below a field.                                                                                   |
| `Heading`              | h1–h6 (`level={1..6}`).                                                                                                               |
| `Text`                 | Inline/block text with size, weight, color variants.                                                                                  |
| `Paragraph`            | Block text with line-height, max-lines truncation.                                                                                    |
| `Code`                 | Inline `<code>` or block `<pre><code>` with optional wrap and max-height.                                                             |
| `Link`                 | Anchor with `underline` and `external` indicator.                                                                                     |
| `Image`                | Responsive with skeleton, aspect-ratio, caption support.                                                                              |
| `Badge`                | Pill status indicator.                                                                                                                |
| `Tag`                  | Rounded-rectangle categorization label.                                                                                               |
| `Table`                | Compound: `Table.Head` / `Row` / `HeaderCell` / `Cell` / `Body` / `Footer`. Manual data; for virtualized / sortable, use `DataTable`. |
| `Alert`                | Info/success/warning/error message with auto-icon per variant.                                                                        |
| `Spinner`              | Loading indicator (standalone interface — does NOT extend HTML attrs).                                                                |
| `ProgressBar`          | Determinate (with `value`) or indeterminate (omit `value`).                                                                           |
| `Tooltip`              | Floating UI hover tip with placement and arrow. Portal-aware.                                                                         |
| `Modal`                | Composed: `Modal` + `ModalHeader` + `ModalBody` + `ModalFooter`.                                                                      |
| `Divider`              | Horizontal/vertical separator with optional label.                                                                                    |
| `Dropdown`             | Generic floating dropdown container. Portal-aware.                                                                                    |
| `PortalProvider`       | Context for multi-window portal targeting (Theia).                                                                                    |

### Extra (`baukasten-ui/extra`)

Full reference: [references/extra-components.md](./references/extra-components.md) (DataTable lives in [references/datatable.md](./references/datatable.md) due to its size.)

| Component                                                 | Role                                                                                                                             |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `DataTable`                                               | TanStack-Table-backed grid: sorting, pagination, row selection, column resize, global filter. Peer dep: `@tanstack/react-table`. |
| `Tabs` / `TabList` / `Tab` / `TabPanels` / `TabPanel`     | Tabbed interface; variants: `line` \| `lifted` \| `pills`.                                                                       |
| `Breadcrumbs`                                             | Navigation breadcrumb with optional `pill` variant and `maxItems` collapsing.                                                    |
| `Pagination`                                              | Page navigation; API is `totalItems` + `pageSize` (NOT totalPages).                                                              |
| `Menu` / `MenuItem` / `MenuDivider` / `SubMenu`           | Menu primitives for use inside `Dropdown` or `ContextMenu`.                                                                      |
| `ContextMenu`                                             | Right-click menu wrapper. Portal-aware.                                                                                          |
| `ButtonGroup`                                             | Connected button group + `ButtonGroup.Dropdown` for split buttons (note: uses `content` prop, not children).                     |
| `FileUpload`                                              | Drag-and-drop file picker. Variants: `default` \| `primary` \| `dashed`.                                                         |
| `Drawer` / `DrawerHeader` / `DrawerBody` / `DrawerFooter` | Slide-in panel from any edge.                                                                                                    |
| `Accordion` / `AccordionItem`                             | Collapsible panels; optional `exclusive` mode.                                                                                   |
| `Tree`                                                    | Hierarchical view with expand/collapse, selection, keyboard nav, edge guides.                                                    |
| `SplitPane` / `SplitPane.Pane`                            | Resizable horizontal or vertical split.                                                                                          |
| `StatusBar` / `StatusBarSection` / `StatusBarItem`        | VSCode-style bottom bar (variants live on `StatusBarItem`, not `StatusBar`).                                                     |
| `Hero`                                                    | Top-of-page banner.                                                                                                              |
| `Avatar`                                                  | User avatar (`circular` \| `square`) with image or initials fallback.                                                            |

---

## Recipes Index

Practical compositions. Each file is self-contained — read it when the task matches.

### General patterns

- [recipes/form-layout.md](./recipes/form-layout.md) — labels + controls using `FormGroup` + `FieldLabel`
- [recipes/confirmation-dialog.md](./recipes/confirmation-dialog.md) — blocking confirm via `Modal`
- [recipes/toolbar.md](./recipes/toolbar.md) — horizontal action bar with grouped buttons + dividers
- [recipes/sidebar-navigation.md](./recipes/sidebar-navigation.md) — vertical nav list using `Menu` with icons

### VSCode extension recipes

Realistic webview compositions. Read these for VSCode/Theia extension UIs.

- [recipes/vscode-file-explorer-panel.md](./recipes/vscode-file-explorer-panel.md) — `Tree` + `ContextMenu` for file/folder navigation
- [recipes/vscode-settings-panel.md](./recipes/vscode-settings-panel.md) — `Accordion` + horizontal `FormGroup` rows + sticky footer
- [recipes/vscode-command-palette.md](./recipes/vscode-command-palette.md) — `Modal` + `Input` + `Menu` with keyboard navigation

---

## How to use this skill

1. **Setup questions** (which CSS file? imports? PortalProvider?) — answered in this file.
2. **Building UI with one or two components** — open the relevant reference file (`core-components.md` for primitives, `extra-components.md` for compositions, `datatable.md` for tables) and use its prop tables verbatim. Don't invent props.
3. **Building a feature with multiple components** — check the recipe index first; a matching recipe gives you tested composition. Then open the reference files for any props you need to tweak.
4. **Writing custom CSS** — open [references/design-tokens.md](./references/design-tokens.md) and use only listed `--bk-*` tokens.

---

## Appendix: Debug / Preview Only

> **Not for production.** The following is only for previewing components outside their host (VSCode/Theia) — for example in Storybook, standalone debug pages, or component galleries. Do NOT use `VSCodeThemeWrapper` in shipped extension or Theia code; rely on the platform CSS (`baukasten-vscode.css` / `baukasten-theia.css`) instead.

`baukasten-ui-web-wrapper` provides a `VSCodeThemeWrapper` that simulates VSCode's CSS variables in a regular browser context so components render with VSCode-like styling without an actual VSCode host.

```bash
# Install only when building previews / docs / Storybook
npm install --save-dev baukasten-ui-web-wrapper
```

```tsx
// Debug-only preview page (e.g. Storybook story, design playground)
import 'baukasten-ui/dist/baukasten-base.css';
import 'baukasten-ui/dist/baukasten-web.css';
import { VSCodeThemeWrapper } from 'baukasten-ui-web-wrapper';

export function ComponentPreview() {
    return (
        <VSCodeThemeWrapper>
            <YourComponentUnderReview />
        </VSCodeThemeWrapper>
    );
}
```
