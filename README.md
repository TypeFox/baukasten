# Baukasten

A webview UI toolkit for VSCode extensions, built with React, styled-components, and designed to match VSCode's native look and feel.

## Project Structure

This is a monorepo managed with npm workspaces:

```
baukasten/
├── packages/
│   ├── baukasten/           # Main UI component library
│   ├── web-wrapper/         # VSCode theme wrapper for browser demos
│   ├── website/             # Source code of the website
│   └── examples/
│       ├── web-example/     # Web application example
└── package.json             # Root package with workspace config
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd baukasten
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

#### Quick Start with VSCode:

This project includes pre-configured VSCode launch configurations. Simply:

1. Open the project in VSCode
2. Press **F5** to launch the VSCode extension example, or
3. Use the **Run and Debug** panel to select:
   - **Launch VSCode Extension Example**
   - **Attach to Web Example (Chrome)**
   - **Attach to Storybook (Chrome)**
   - **Launch All Examples** (runs multiple at once)

See [.vscode/README.md](.vscode/README.md) for detailed instructions.

#### Manual Commands:

**Start the component library development:**

```bash
npm run dev
```

**Start Storybook for component documentation:**

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

**Run the examples:**

_Web example_ (browser application with theme wrapper):

```bash
npm run example:web
```

The web example will be available at `http://localhost:3000`

**Run the website:**

_Web example_ (browser application with theme wrapper):

```bash
npm run website
```

Then visit `localhost:3000/baukasten`


### Building

Build all packages:

```bash
npm run build
```

Build Storybook documentation:

```bash
npm run build-storybook
```

## Packages

### @baukasten/ui

The main UI component library with VSCode-inspired components. All components use VSCode CSS variables (like `--vscode-button-background`) to match the native VSCode look and feel.

- **Button**: Versatile button component with variants and sizes
- **Input**: Text input with label and error state support
- **Badge**: Status indicator component
- ... etc

[View Package Documentation](./packages/baukasten/README.md)

### @baukasten/web-wrapper

A theme wrapper that provides VSCode CSS variables for browser environments (Storybook, demos, etc.). In real VSCode extensions, these variables are provided by VSCode itself. This package simulates that environment for development and demos.

**Features:**

- 5 VSCode theme presets (Dark+, Light+, Monokai, GitHub Dark, Solarized Dark)
- Built-in theme switcher with dropdown
- Real VSCode CSS variables

[View Package Documentation](./packages/web-wrapper/README.md)

### @baukasten/examples

Example implementations showing how to use the component library in real applications.

[View Examples Documentation](./packages/examples/README.md)

## Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety and developer experience
- **styled-components**: CSS-in-JS styling solution
- **VSCode CSS Variables**: Native VSCode styling
- **Vite**: Fast build tool and dev server
- **Storybook 8**: Component documentation and development
- **npm workspaces**: Monorepo management

## Features

- 🎨 VSCode-native design system using CSS variables
- 🌗 Multiple theme support (Dark+, Light+, Monokai, GitHub Dark, Solarized Dark)
- 📦 Tree-shakeable component exports
- 📚 Comprehensive Storybook documentation
- 💪 Full TypeScript support
- ⚡ Fast development with Vite and React 19
- 🧩 Modular component architecture
- 🔄 Theme switcher for demos and development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
