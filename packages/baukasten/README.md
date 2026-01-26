# baukasten

A webview UI toolkit for Eclipse Theia and VSCode extensions, built with React and `vanilla-extract` . Components use Theia/VSCode CSS variables to match the host platform look and feel.

## Installation

```bash
npm install baukasten react react-dom 
```

## Usage

### In a VSCode Extension (Webview)

Components automatically use CSS variables provided by VSCode:

```tsx
import { Button, Input, Badge } from 'baukasten-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input label="Username" placeholder="Enter username" />
      <Badge variant="success">Active</Badge>
    </div>
  );
}
```

### In Browser (Storybook, demos, etc.)

Use `baukasten-ui-web-wrapper` to simulate VSCode's environment:

```bash
npm install baukasten-ui-web-wrapper
```

```tsx
import { Button, Input, Badge } from 'baukasten-ui';
import { VSCodeThemeWrapper } from 'baukasten-ui-web-wrapper';

function App() {
  return (
    <VSCodeThemeWrapper>
      <div>
        <Button variant="primary">Click me</Button>
        <Input label="Username" placeholder="Enter username" />
        <Badge variant="success">Active</Badge>
      </div>
    </VSCodeThemeWrapper>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
<Button variant="primary" size="medium">
  Click me
</Button>
```

### Input

A text input component with label and error support.

```tsx
<Input 
  label="Email" 
  placeholder="Enter email"
  error="Invalid email"
/>
```

### Badge

A badge component for status indicators.

```tsx
<Badge variant="success">Active</Badge>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build library
npm run build
```

## License

MIT

