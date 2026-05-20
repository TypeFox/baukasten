# Design Tokens Reference

Baukasten ships a CSS custom property design token system prefixed `--bk-*`. Tokens are platform-mapped: the three platform CSS files (`baukasten-vscode.css`, `baukasten-theia.css`, `baukasten-web.css`) map `--bk-*` to native VSCode `--vscode-*` variables, Theia `--theia-*` variables, or fallback values respectively. Components consume only `--bk-*` so the same code adapts to any host.

## Design Token Rules

**ALWAYS use semantic design tokens. NEVER hardcode values or use VSCode variables directly.**

```tsx
// CORRECT
backgroundColor: 'var(--bk-color-primary)';
padding: 'var(--bk-padding-md)';
fontSize: 'var(--bk-font-size-md)';
gap: 'var(--bk-gap-sm)';
borderRadius: 'var(--bk-radius-sm)';

// WRONG
backgroundColor: '#007acc';
padding: '8px 16px';
background: 'var(--vscode-button-background)';
```

Key token categories:

- Colors: `--bk-color-{primary|secondary|success|warning|danger|info|...}`
- Foreground: `--bk-color-{variant}-foreground`
- Hover: `--bk-color-{variant}-hover`
- Spacing: `--bk-padding-{xs|sm|md|lg|xl}`, `--bk-gap-{xs|sm|md|lg|xl}`
- Sizes: `--bk-size-{xs|sm|md|lg|xl}` (component heights)
- Typography: `--bk-font-size-{xs|sm|md|base|lg|xl}`, `--bk-font-weight-{normal|medium|semibold|bold}`
- Effects: `--bk-radius-{sm|md|lg|full}`, `--bk-shadow-{sm|md|lg}`, `--bk-transition-{fast|colors|slow}`

---

## Full Token Catalog

The following tokens are the authoritative list extracted from `packages/baukasten/src/styles/*.ts`.

### Colors

**Brand:**

- Primary: `--bk-color-primary`, `--bk-color-primary-hover`, `--bk-color-primary-active`, `--bk-color-primary-foreground`
- Secondary: `--bk-color-secondary`, `--bk-color-secondary-hover`, `--bk-color-secondary-active`, `--bk-color-secondary-foreground`

**Semantic** (each has `-hover` and `-foreground` variants):

- `--bk-color-success`, `--bk-color-success-hover`, `--bk-color-success-foreground`
- `--bk-color-warning`, `--bk-color-warning-hover`, `--bk-color-warning-foreground`
- `--bk-color-danger`, `--bk-color-danger-hover`, `--bk-color-danger-foreground`
- `--bk-color-info`, `--bk-color-info-hover`, `--bk-color-info-foreground`

Note: semantic colors do **not** have `-active` variants (only primary/secondary do).

**Neutral - Backgrounds:**

- `--bk-color-background`, `--bk-color-background-secondary`, `--bk-color-background-tertiary`, `--bk-color-background-elevated`

**Neutral - Foregrounds:**

- `--bk-color-foreground`, `--bk-color-foreground-muted`, `--bk-color-foreground-disabled`

**Neutral - Borders:**

- `--bk-color-border`, `--bk-color-border-focus`, `--bk-color-border-hover`

**Overlays & Backdrops:**

- `--bk-color-overlay`, `--bk-color-overlay-light`
- `--bk-color-backdrop`, `--bk-color-backdrop-blur`
- `--bk-color-overlay-gradient-start`, `--bk-color-overlay-foreground`
- `--bk-color-stripe-overlay`

**Interactive states:**

- `--bk-color-hover`, `--bk-color-active`, `--bk-color-focus`
- `--bk-color-selected`, `--bk-color-selected-foreground`
- `--bk-color-menu-selectionBackground`

**Inputs:**

- `--bk-color-input-background`, `--bk-color-input-foreground`, `--bk-color-input-border`, `--bk-color-input-placeholder`, `--bk-color-input-focus-border`
- Validation error: `--bk-color-input-error`, `--bk-color-input-error-background`, `--bk-color-input-error-foreground`
- Validation warning: `--bk-color-input-warning`, `--bk-color-input-warning-background`, `--bk-color-input-warning-foreground`
- Validation info: `--bk-color-input-info`, `--bk-color-input-info-background`, `--bk-color-input-info-foreground`

**Badge:** `--bk-color-badge-background`, `--bk-color-badge-foreground`

**Link:** `--bk-color-link`, `--bk-color-link-hover`, `--bk-color-link-active`

**Code:** `--bk-color-code-background`, `--bk-color-code-foreground`

**Dropdown:** `--bk-color-dropdown-background`, `--bk-color-dropdown-foreground`, `--bk-color-dropdown-border`, `--bk-color-dropdown-list-background`

**Checkbox / Radio:** `--bk-color-checkbox-background`, `--bk-color-checkbox-foreground`, `--bk-color-checkbox-border`, `--bk-color-checkbox-checked-background`, `--bk-color-checkbox-checked-border`

**List / Tree:** `--bk-color-list-hover`, `--bk-color-list-active`, `--bk-color-list-active-foreground`, `--bk-color-list-focus`, `--bk-color-list-focus-outline`

**Scrollbar:** `--bk-color-scrollbar`, `--bk-color-scrollbar-hover`, `--bk-color-scrollbar-active`

**Divider:** `--bk-color-divider`

**Shadow color:** `--bk-color-shadow`

**Status bar:** `--bk-color-statusbar-background`, `--bk-color-statusbar-foreground`, `--bk-color-statusbar-border`, `--bk-color-statusbar-item-hover`, `--bk-color-statusbar-item-active`, `--bk-color-statusbar-item-error`, `--bk-color-statusbar-item-warning`

### Spacing Scale (raw)

Base unit 4px. Available steps: `--bk-spacing-{0, 0-5, 1, 1-5, 2, 2-5, 3, 3-5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24}`.

Prefer semantic tokens (`--bk-padding-*`, `--bk-gap-*`) over raw spacing for components.

### Gap

- `--bk-gap-xs`, `--bk-gap-sm`, `--bk-gap-md`, `--bk-gap-lg`, `--bk-gap-xl`

### Padding (shorthand: vertical horizontal)

- `--bk-padding-xs`, `--bk-padding-sm`, `--bk-padding-md`, `--bk-padding-lg`, `--bk-padding-xl`

### Component Sizes (heights)

- Standard: `--bk-size-xs`, `--bk-size-sm`, `--bk-size-md`, `--bk-size-lg`, `--bk-size-xl`
- Circular/square (icon buttons, avatars): `--bk-size-circular-xs`, `--bk-size-circular-sm`, `--bk-size-circular-md`, `--bk-size-circular-lg`, `--bk-size-circular-xl`

### Font Size

- Body scale: `--bk-font-size-xs`, `--bk-font-size-sm`, `--bk-font-size-md`, `--bk-font-size-base`, `--bk-font-size-lg`, `--bk-font-size-xl`
- Heading scale: `--bk-font-size-2xl`, `--bk-font-size-3xl`, `--bk-font-size-4xl`, `--bk-font-size-5xl`
- Hero: `--bk-font-size-hero`, `--bk-font-size-hero-description`

### Font Weight

- `--bk-font-weight-light` (300), `--bk-font-weight-normal` (400), `--bk-font-weight-medium` (500), `--bk-font-weight-semibold` (600), `--bk-font-weight-bold` (700)

### Line Height

- `--bk-line-height-hero`, `--bk-line-height-tight`, `--bk-line-height-normal`, `--bk-line-height-relaxed`, `--bk-line-height-loose`

### Letter Spacing

- `--bk-letter-spacing-hero`, `--bk-letter-spacing-tight`, `--bk-letter-spacing-normal`, `--bk-letter-spacing-wide`, `--bk-letter-spacing-wider`

### Font Family

- `--bk-font-family-sans`, `--bk-font-family-mono`

### Border Radius

- `--bk-radius-none`, `--bk-radius-sm`, `--bk-radius-md`, `--bk-radius-lg`, `--bk-radius-xl`, `--bk-radius-2xl`, `--bk-radius-3xl`, `--bk-radius-full`

### Shadow

- `--bk-shadow-sm`, `--bk-shadow-base`, `--bk-shadow-md`, `--bk-shadow-lg`, `--bk-shadow-xl`, `--bk-shadow-2xl`, `--bk-shadow-inner`

### Transition

- Durations: `--bk-transition-fast` (100ms), `--bk-transition-base` (150ms), `--bk-transition-slow` (300ms)
- Property shorthands: `--bk-transition-colors`, `--bk-transition-all`, `--bk-transition-transform`, `--bk-transition-opacity`

### Z-Index

- `--bk-z-index-base` (0), `--bk-z-index-overlay-content` (1)
- `--bk-z-index-sticky` (1020), `--bk-z-index-fixed` (1030)
- `--bk-z-index-modal-backdrop` (1040), `--bk-z-index-modal` (1050)
- `--bk-z-index-dropdown` (1060), `--bk-z-index-popover` (1060)
- `--bk-z-index-context-menu` (1065), `--bk-z-index-tooltip` (1070), `--bk-z-index-notification` (1080)

### Opacity

- Scale: `--bk-opacity-0`, `--bk-opacity-10`, `--bk-opacity-20`, `--bk-opacity-30`, `--bk-opacity-40`, `--bk-opacity-50`, `--bk-opacity-60`, `--bk-opacity-70`, `--bk-opacity-80`, `--bk-opacity-90`, `--bk-opacity-100`
- Semantic: `--bk-opacity-disabled` (= 40), `--bk-opacity-hover` (= 80), `--bk-opacity-muted` (= 60)

### Border Width

- `--bk-border-width-0`, `--bk-border-width-1`, `--bk-border-width-2`, `--bk-border-width-4`, `--bk-border-width-8`
