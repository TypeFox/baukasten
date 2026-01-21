# Baukasten Examples

This directory contains three example implementations demonstrating different use cases for the Baukasten UI library.

## Examples

### 1. Web Example (`web-example/`)

**Purpose**: Demonstrates using Baukasten components in a standalone web application.

**Key Features**:

- Uses `VSCodeThemeWrapper` to simulate VSCode theming
- Manual theme selection (Dark+, Light+, GitHub Dark, Monokai, etc.)
- Perfect for testing components in a browser
- Shows how to integrate Baukasten in React web apps

**Run it**:

```bash
npm run example:web
```

**Use Case**:

- Prototyping VSCode extension UIs in the browser
- Component demos and testing
- Web apps that want VSCode-style theming

---

### 2. Table Performance Benchmark (`table-example/`)

**Purpose**: Stress test the Table component with large datasets for performance benchmarking.

**Key Features**:

- Dynamic data generation (1 to 100,000 rows)
- Real-time performance metrics (render time, scroll performance)
- Interactive controls for variants, sizes, and sorting
- Memory usage estimation
- Live scroll performance tracking
- Comprehensive dataset with 10 columns

**Run it**:

```bash
npm run example:table
```

**Use Case**:

- Performance testing and benchmarking
- Identifying optimization opportunities
- Comparing table performance against other libraries
- Stress testing UI with extreme datasets
- Development and testing of virtual scrolling features

---

### 3. VSCode Extension (`vscode/`)

**Purpose**: Demonstrates using Baukasten components in a real VSCode extension webview.

**Key Features**:

- Real VSCode extension with webview
- No wrapper needed - uses native VSCode theme variables
- Automatic theme adaptation
- Extension-webview communication examples
- Production-ready structure

**Run it**:

```bash
npm run example:vscode
# Then press F5 in VSCode to launch Extension Development Host
```

**Use Case**:

- Building actual VSCode extensions
- Production webview panels
- Native theme integration

---

## Comparison

| Feature             | Web Example           | Table Benchmark       | VSCode Extension      |
| ------------------- | --------------------- | --------------------- | --------------------- |
| **Environment**     | Browser               | Browser               | VSCode                |
| **Theme Source**    | Simulated             | Simulated             | Native VSCode         |
| **Wrapper**         | ✅ Required           | ✅ Required           | ❌ Not needed         |
| **Theme Switching** | Manual selection      | Manual selection      | Automatic             |
| **Development**     | Hot reload in browser | Hot reload in browser | F5 in VSCode          |
| **Use Case**        | Prototyping, demos    | Performance testing   | Production extensions |

## Getting Started

1. **Install dependencies** from the repo root:

   ```bash
   npm install
   ```

2. **Build the core library**:

   ```bash
   npm run build -w packages/baukasten
   ```

3. **Run the example you want**:

   ```bash
   # For web example:
   npm run example:web

   # For table benchmark:
   npm run example:table

   # For VSCode extension:
   npm run example:vscode
   ```

## Learn More

- [Web Example README](./web-example/README.md)
- [Table Benchmark README](./table-example/README.md)
- [VSCode Extension README](./vscode/README.md)
- [Baukasten Library Docs](../baukasten/README.md)
- [Web Wrapper Docs](../web-wrapper/README.md)
