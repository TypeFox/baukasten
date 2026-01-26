# baukasten-ui-web-wrapper

A theme wrapper that provides VSCode CSS variables for browser environments (Storybook, demos, etc.).

## Overview

When building VSCode extensions, components use CSS variables like `--vscode-button-background` that are provided by VSCode itself. This package simulates that environment for browser-based demos and development.

## Features

- Multiple VSCode theme presets (Dark+, Light+, Monokai, GitHub Dark, Solarized Dark)
- Theme switcher with dropdown selector
- Many VSCode CSS variables
- Lightweight with zero dependencies (except React peer deps)
- Saves the selected theme to localStorage, so it persists across page reloads

## Usage

### Basic Usage

```tsx
import { VSCodeThemeWrapper } from "baukasten-ui-web-wrapper";

function App() {
  return (
    <VSCodeThemeWrapper>
      {/* Your components that use VSCode CSS variables */}
      <YourComponent />
    </VSCodeThemeWrapper>
  );
}
```

### With Storybook

```tsx
// .storybook/preview.tsx
import { VSCodeThemeWrapper } from "baukasten-ui-web-wrapper";

export const decorators = [
  (Story) => (
    <VSCodeThemeWrapper>
      <Story />
    </VSCodeThemeWrapper>
  ),
];
```

### Props

- `defaultThemeId?: string` - Initial theme ID (default: 'dark-plus')
- `showThemeSelector?: boolean` - Show/hide theme dropdown (default: true)

### Available Themes

- `dark-plus` - Dark+ (default dark)
- `light-plus` - Light+ (default light)
- `monokai` - Monokai
- `github-dark` - GitHub Dark
- `solarized-dark` - Solarized Dark

Each theme is defined in its own file in `src/themes/` for easy maintenance and extension.

## Available CSS Variables

See the individual theme files in [src/themes/](./src/themes/) for the complete list of available variables.

## Adding a New Theme

To add a new theme:

1. Create a new file in `src/themes/` (e.g., `my-theme.ts`)
2. Define your theme using the `VSCodeTheme` interface:

```typescript
import { VSCodeTheme } from "./types";

export const myTheme: VSCodeTheme = {
  name: "My Theme",
  id: "my-theme",
  variables: {
    "--vscode-editor-background": "#...",
    "--vscode-editor-foreground": "#...",
    // ... add all required variables
  },
};
```

3. Export it in `src/themes/index.ts`:

```typescript
export { myTheme } from "./my-theme";
```

4. Add it to the themes array:

```typescript
export const themes: VSCodeTheme[] = [
  darkPlus,
  lightPlus,
  myTheme, // Add your theme here
  // ...
];
```

## License

MIT
