# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baukasten is a VSCode webview UI toolkit built with React 19, TypeScript, vanilla-extract, and designed to match VSCode's native look and feel. This is a monorepo managed with npm workspaces.

## Monorepo Structure

```
baukasten/
├── packages/
│   ├── baukasten/           # Main UI component library (baukasten)
│   ├── web-wrapper/         # VSCode theme wrapper for browser demos
│   ├── website/             # Documentation website
│   └── examples/
│       ├── web-example/     # Web application example
│       └── vscode/          # VSCode extension example (Log Viewer)
```

## Common Commands

### Development

```bash
# Install dependencies (run from root)
npm install

# Start developing the component library (with Vite)
npm run dev

# Start Storybook for component documentation
npm run storybook
# Runs at http://localhost:6006

# Run web example
npm run example:web
# Runs at http://localhost:3000

# Run VSCode extension example (then press F5 in VSCode)
npm run example:vscode
```

### Building

```bash
# Build all packages
npm run build

# Build specific packages
npm run build:baukasten
npm run build:web-wrapper

# Build Storybook documentation
npm run build-storybook
```

### Linting

```bash
# Lint the baukasten package (from packages/baukasten directory)
cd packages/baukasten
npm run lint
```

## Design System Architecture

Baukasten uses a **semantic design token system** that provides platform-agnostic theming. This is the most critical architectural pattern to understand.

### Token Files (Source of Truth)

All design tokens are defined in `packages/baukasten/src/styles/`:

- **colors.ts** - Semantic color tokens (primary, secondary, success, warning, danger, info, etc.)
- **spacing.ts** - Spacing scale, gaps, padding, component sizes
- **typography.ts** - Font sizes, weights, line heights, font families
- **effects.ts** - Border radius, shadows, transitions, opacity, z-index

### CSS Variables

Design tokens are exported as CSS custom properties (e.g., `--bk-color-primary`, `--bk-padding-md`, `--bk-font-size-md`) that map to VSCode theme variables by default but can be customized.

### Critical Rule: Use Semantic Tokens

**ALWAYS use semantic design tokens. NEVER hardcode values or use VSCode variables directly.**

```tsx
// ✅ CORRECT
background-color: var(--bk-color-primary);
padding: var(--bk-padding-md);
font-size: var(--bk-font-size-md);

// ❌ WRONG
background-color: #007acc;              // Never hardcode
padding: 8px 16px;                      // Never hardcode
background: var(--vscode-button-background);  // Too specific
```

### Component Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx         # Implementation
├── ComponentName.css.ts      # vanilla-extract styles
├── ComponentName.stories.tsx # Storybook documentation
└── index.ts                  # Exports
```

**For components** (using vanilla-extract):
1. Use semantic tokens from the design system via CSS variables
2. Export TypeScript types for props
3. Include comprehensive Storybook stories
4. Use `recipe` API for variant-based styling
5. Use `style` API for base styles
6. Use `styleVariants` for simple variant maps

### Theming System

The project supports two environments:

**VSCode Webview** (native environment):
```tsx
import { GlobalStyles } from "baukasten-ui/core";
// No wrapper needed - uses native VSCode theme
<GlobalStyles />
```

**Web Application** (browser demos/Storybook):
```tsx
import { GlobalStyles } from "baukasten-ui/core";
import { VSCodeThemeWrapper } from "baukasten-ui-web-wrapper";
// Wrapper simulates VSCode theming
<>
  <GlobalStyles />
  <VSCodeThemeWrapper>...</VSCodeThemeWrapper>
</>
```

## Storybook Guidelines

When creating Storybook stories, follow this exact order:

1. **Interactive** (FIRST - required) - Playground with all props exposed via controls
2. **Property Groups** - Variants, Sizes, States (grouped comparisons)
3. **Usage Examples** - WithIcons, WidthOptions, FormExamples (practical patterns)
4. **Showcase** (LAST - required) - Comprehensive overview with `layout: "fullscreen"`

All stories must:
- Use design tokens for spacing/styling
- Include `tags: ['autodocs']` in meta
- Have clear descriptions in `parameters.docs.description.story`
- Document all argTypes with descriptions and defaults

Reference: `packages/baukasten/src/components/Button/Button.stories.tsx`

## Available Components

Components are split across two entry points:

### Core Components (`baukasten-ui/core`)

**Form Controls:**
- **Button** - Versatile button with variants (primary, secondary, ghost, outline) and sizes
- **IconButton** - Square icon-only button matching Button height, for toolbar and compact actions
- **Input** - Text input with label and error state support
- **TextArea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox with label support
- **Radio** - Radio button and RadioGroup components
- **Slider** - Range slider input

**Form Helpers:**
- **Label** - Form label component
- **FieldLabel** - Field label with optional required indicator
- **FormGroup** - Group form elements with consistent spacing
- **FormHelper** - Helper text for form fields

**Typography:**
- **Heading** - h1-h6 headings with semantic sizing
- **Text** - Inline text with size and weight variants
- **Paragraph** - Block text element
- **Code** - Inline and block code display
- **Link** - Anchor links with variants
- **Image** - Responsive images with loading states and captions

**Data Display:**
- **Badge** - Status indicator component
- **Tag** - Categorization and labeling component with rounded-rectangle shape
- **Table** - Basic table components with sorting and variants

**Feedback:**
- **Alert** - Alert messages with variants (info, success, warning, danger)
- **Modal** - Modal dialog component
- **Tooltip** - Hover tooltips
- **Spinner** - Loading spinner
- **ProgressBar** - Progress indicator with variants

**Layout:**
- **Divider** - Horizontal/vertical divider
- **Dropdown** - Generic dropdown container

**Specialized:**
- **Icon** - VSCode Codicons integration

**Context Providers:**
- **PortalProvider** - Configures portal root for multi-window support (Theia secondary windows)
- **GlobalStyles** - Global CSS reset and design token injection

### Extra Components (`baukasten-ui/extra`)

**Form Controls:**
- **ButtonGroup** - Group of related buttons
- **FileUpload** - File upload component with drag & drop

**Data Display:**
- **DataTable** - Advanced data table with virtualization, sorting, filtering
- **Avatar** - User avatar with image/initials fallback

**Navigation:**
- **Tabs** - Tabbed navigation component
- **Breadcrumbs** - Breadcrumb navigation
- **Menu** - Dropdown menu component
- **ContextMenu** - Right-click context menu
- **Pagination** - Page navigation controls

**Layout:**
- **SplitPane** - Resizable split pane layout
- **Accordion** - Collapsible content panels

**Specialized:**
- **StatusBar** - VSCode-style status bar
- **Hero** - Hero section component

## Key Technical Details

### Build System
- **Vite** - Build tool and dev server
- **TypeScript** - Strict mode enabled
- **vanilla-extract** - Zero-runtime CSS-in-TypeScript styling
- **Storybook 8** - Component documentation

### Package Exports
Main package (`baukasten-ui`) provides three entry points:
- `baukasten-ui` (`.`) — All components and types (re-exports core + extra)
- `baukasten-ui/core` (`./core`) — Fundamental primitives (Button, Input, Icon, Typography, etc.)
- `baukasten-ui/extra` (`./extra`) — Higher-level compositions (DataTable, Tabs, Menu, etc.)
- `baukasten-ui/styles` (`./styles`) — Design token utilities

**Core components** (23 families): Icon, IconButton, Button, Input, TextArea, Checkbox, Radio/RadioGroup, Select, Slider, Label, FieldLabel, FormGroup, FormHelper, Typography (Heading/Text/Paragraph/Code/Link/Image), Badge, Tag, Table, Alert, Spinner, ProgressBar, Tooltip, Modal, Divider, Dropdown, PortalProvider, Styles, GlobalStyles

**Extra components** (14 families): DataTable, Tabs, Breadcrumbs, Pagination, Menu, ContextMenu, ButtonGroup, FileUpload, Accordion, SplitPane, StatusBar, Hero, Avatar

`@tanstack/react-table` is an **optional peer dependency** — only needed when importing DataTable from extra.

### Core / Extra Split Criteria

| Criterion                | Core                                                  | Extra                                        |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------- |
| **Usage frequency**      | Used in 80%+ of UIs                                   | Used in specific scenarios                   |
| **Complexity**           | Atomic / molecular                                    | Composed from multiple core components       |
| **External deps**        | Only `clsx`, `@floating-ui/react`, `@vscode/codicons` | `@tanstack/react-table` or future heavy deps |
| **Cross-component deps** | May depend on Icon and styles only                    | May depend on any core component             |
| **Self-contained**       | Can work alone with just styles                       | Needs core components at runtime             |

**Key rule**: Extra can import from Core. Core **never** imports from Extra.

### VSCode Integration
- Uses `@vscode/codicons` for icons
- Maps to VSCode CSS variables for seamless integration
- No runtime dependencies on VSCode API (pure React)

## Development Workflow

1. **Start development**: `npm run storybook` (most common)
2. **Add new component**:
   - Create component directory in `packages/baukasten/src/components/`
   - Implement component with design tokens
   - Create Storybook stories following the guidelines
   - Export from `packages/baukasten/src/core.ts` (if fundamental primitive) or `packages/baukasten/src/extra.ts` (if higher-level / composed)
   - `src/index.ts` re-exports both automatically
3. **Test in examples**:
   - Web example for browser testing
4. **Build**: `npm run build` before committing

## Important Files

- `.cursor/rules/design-system.mdc` - Complete design system documentation
- `.cursor/rules/quick-reference.mdc` - Quick patterns and component template
- `.cursor/rules/storybook.mdc` - Detailed Storybook guidelines
- `packages/baukasten/src/styles/` - Design token definitions (source of truth)
- `packages/baukasten/src/DesignSystem.stories.tsx` - Visual token documentation

## Testing Changes

- View in Storybook: `npm run storybook`
- Test in web: `npm run example:web`
- Test in VSCode: `npm run example:vscode` then F5
- Use .vscode launch configurations for debugging

## Notes

- Node >= 18.0.0, npm >= 9.0.0 required
- React 19 with vanilla-extract
- All components are tree-shakeable
- VSCode theme wrapper provides 5 theme presets for demos

## Vanilla-Extract Coding Style Guide

### File Naming Convention

**Always use `.css.ts` extension** for style files:
```
Button.css.ts  ✅
Button.styles.ts  ❌
```

### Import Style

```typescript
// In component file
import * as styles from './Button.css';
// or
import { button, buttonVariants } from './Button.css';
```

### Basic Styling Patterns

#### 1. Simple Static Styles

Use `style` for static styles:

```typescript
// Button.css.ts
import { style } from '@vanilla-extract/css';

export const baseButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'var(--bk-transition-colors)',
  outline: 'none',

  // Use CSS variables for design tokens
  padding: 'var(--bk-padding-md)',
  fontSize: 'var(--bk-font-size-md)',
  backgroundColor: 'var(--bk-color-primary)',
  color: 'var(--bk-color-primary-foreground)',

  // Pseudo-selectors
  ':hover:not(:disabled)': {
    backgroundColor: 'var(--bk-color-primary-hover)',
  },

  ':disabled': {
    opacity: 'var(--bk-opacity-disabled)',
    cursor: 'not-allowed',
  },
});
```

#### 2. Variants with `styleVariants`

Use `styleVariants` for simple variant maps:

```typescript
// Button.css.ts
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  padding: 'var(--bk-padding-md)',
});

// Simple variants
export const buttonSize = styleVariants({
  xs: [base, {
    fontSize: 'var(--bk-font-size-xs)',
    minHeight: 'var(--bk-size-xs)',
  }],
  sm: [base, {
    fontSize: 'var(--bk-font-size-sm)',
    minHeight: 'var(--bk-size-sm)',
  }],
  md: [base, {
    fontSize: 'var(--bk-font-size-md)',
    minHeight: 'var(--bk-size-md)',
  }],
  lg: [base, {
    fontSize: 'var(--bk-font-size-base)',
    minHeight: 'var(--bk-size-lg)',
  }],
});
```

#### 3. Complex Variants with `recipe`

Use `recipe` for components with multiple variant dimensions:

```typescript
// Button.css.ts
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    // Base styles applied to all variants
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'var(--bk-transition-colors)',
    outline: 'none',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    gap: 'var(--bk-gap-sm)',
  },

  variants: {
    // First variant dimension
    variant: {
      primary: {
        backgroundColor: 'var(--bk-color-primary)',
        color: 'var(--bk-color-primary-foreground)',
        ':hover:not(:disabled)': {
          backgroundColor: 'var(--bk-color-primary-hover)',
        },
      },
      secondary: {
        backgroundColor: 'var(--bk-color-secondary)',
        color: 'var(--bk-color-secondary-foreground)',
        ':hover:not(:disabled)': {
          backgroundColor: 'var(--bk-color-secondary-hover)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--bk-color-foreground)',
        ':hover:not(:disabled)': {
          backgroundColor: 'var(--bk-color-secondary-hover)',
        },
      },
    },

    // Second variant dimension
    size: {
      xs: {
        padding: 'var(--bk-padding-xs)',
        fontSize: 'var(--bk-font-size-xs)',
        minHeight: 'var(--bk-size-xs)',
      },
      sm: {
        padding: 'var(--bk-padding-sm)',
        fontSize: 'var(--bk-font-size-sm)',
        minHeight: 'var(--bk-size-sm)',
      },
      md: {
        padding: 'var(--bk-padding-md)',
        fontSize: 'var(--bk-font-size-md)',
        minHeight: 'var(--bk-size-md)',
      },
    },

    // Boolean variants
    outline: {
      true: {
        backgroundColor: 'transparent',
        borderColor: 'var(--bk-color-primary)',
      },
      false: {},
    },

    circular: {
      true: {
        borderRadius: 'var(--bk-radius-full)',
        aspectRatio: '1',
        padding: '0',
      },
      false: {
        borderRadius: 'var(--bk-radius-sm)',
      },
    },
  },

  // Compound variants - for variant combinations
  compoundVariants: [
    {
      variants: {
        variant: 'primary',
        outline: true,
      },
      style: {
        color: 'var(--bk-color-primary)',
        borderColor: 'var(--bk-color-primary)',
        ':hover:not(:disabled)': {
          backgroundColor: 'var(--bk-color-primary)',
          color: 'var(--bk-color-primary-foreground)',
        },
      },
    },
  ],

  // Default variants
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    outline: false,
    circular: false,
  },
});
```

#### 4. Using Recipes in Components

```typescript
// Button.tsx
import React from 'react';
import { button } from './Button.css';
import type { RecipeVariants } from '@vanilla-extract/recipes';

// Extract prop types from recipe
export type ButtonVariants = RecipeVariants<typeof button>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  // Additional props
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  outline,
  circular,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={button({ variant, size, outline, circular, className })}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Critical Rules for vanilla-extract

1. **Always Use CSS Variables for Design Tokens**
   ```typescript
   // ✅ CORRECT
   backgroundColor: 'var(--bk-color-primary)',
   padding: 'var(--bk-padding-md)',

   // ❌ WRONG
   backgroundColor: '#007acc',
   padding: '8px 16px',
   ```

2. **No Runtime Logic in Style Files**
   ```typescript
   // ❌ WRONG - .css.ts files run at build time
   const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

   // ✅ CORRECT - Use variants or CSS variables
   export const theme = styleVariants({
     light: { backgroundColor: 'var(--bk-color-background)' },
     dark: { backgroundColor: 'var(--bk-color-background-dark)' },
   });
   ```

3. **Use `recipe` for Components with Variants**
   - More than 2 variant dimensions → `recipe`
   - Simple variant map → `styleVariants`
   - Static styles → `style`

4. **Compound Variants for Conditional Styling**
   ```typescript
   compoundVariants: [
     {
       variants: { size: 'lg', variant: 'primary' },
       style: { fontWeight: 'bold' },
     },
   ],
   ```

5. **className Prop Pattern**
   ```typescript
   // Always allow className override
   className={button({ variant, size, className })}
   ```

6. **Type Safety**
   ```typescript
   import type { RecipeVariants } from '@vanilla-extract/recipes';

   export type ButtonVariants = RecipeVariants<typeof button>;
   ```

7. **Pseudo-selectors and Nested Selectors**
   ```typescript
   export const button = style({
     // Pseudo-classes
     ':hover': { opacity: 0.8 },
     ':focus-visible': { outline: '2px solid var(--bk-color-focus)' },
     ':disabled': { opacity: 0.5 },

     // Nested selectors
     selectors: {
       '&:hover:not(:disabled)': { backgroundColor: 'var(--bk-color-hover)' },
       '& svg': { width: '1em', height: '1em' },
     },
   });
   ```

8. **Media Queries**
   ```typescript
   import { style } from '@vanilla-extract/css';

   export const responsive = style({
     padding: 'var(--bk-padding-sm)',

     '@media': {
       'screen and (min-width: 768px)': {
         padding: 'var(--bk-padding-md)',
       },
     },
   });
 ```

## Multi-Window Support (Eclipse Theia)

### The Portal Problem

Portal-based components (Select, Dropdown, Tooltip, ContextMenu, ButtonGroup) use `FloatingPortal` from `@floating-ui/react` to render floating content. By default, portals render to `document.body` of the main window. In Eclipse Theia's multi-window scenarios, this causes dropdowns opened in secondary/popup windows to appear in the main window instead.

### Solution: PortalProvider

The `PortalProvider` context allows specifying a custom root element for all portal-based components:

```tsx
import { PortalProvider, Select, Dropdown, Button } from 'baukasten-ui/core';
import { Menu } from 'baukasten-ui/extra';

function SecondaryWindowContent() {
const rootRef = useRef<HTMLDivElement>(null);
const [ready, setReady] = useState(false);

useEffect(() => setReady(true), []);

return (
 <div ref={rootRef} className="secondary-window-container">
   {ready && (
     <PortalProvider root={rootRef.current}>
       {/* All dropdowns, tooltips, etc. will render in this window */}
       <Select options={options} />
       <Dropdown trigger={<Button>Menu</Button>}>
         <Menu>...</Menu>
       </Dropdown>
     </PortalProvider>
   )}
 </div>
);
}
```

### Components Using PortalProvider

These components respect the `PortalProvider` context:
- **Select** - Dropdown options list
- **Dropdown** - Generic dropdown container
- **Tooltip** - Hover tooltips
- **ContextMenu** - Right-click menus
- **ButtonGroup.Dropdown** - Split button dropdowns

### Implementation Notes

1. **Backward Compatible**: If `PortalProvider` is not used, components fall back to default portal behavior (`document.body`)
2. **Hook**: Use `usePortalRoot()` hook to access the portal root in custom components
3. **Context Location**: Defined in `packages/baukasten/src/context/PortalProvider.tsx`

