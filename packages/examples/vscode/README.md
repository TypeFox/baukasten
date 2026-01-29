# Baukasten VSCode Log Viewer Example

A VSCode extension demonstrating baukasten UI components with a dense, information-rich Log Viewer application.

## Features

- **DataTable**: Virtualized log display with sorting and pagination
- **SplitPane**: Resizable multi-pane layout
- **Badge**: Log level indicators (ERROR, WARN, INFO, DEBUG)
- **Accordion**: Collapsible detail sections
- **Input/Select/Checkbox**: Filter controls
- **StatusBar**: Summary statistics

## Running the Example

### From the monorepo root:

```bash
# Install dependencies
npm install

# Build the extension
npm run build:vscode

# Or watch for changes
npm run example:vscode
```

### Launch in VSCode:

1. Open the baukasten workspace in VSCode
2. Press **F5** or select **Launch VSCode Extension Example** from the Debug panel
3. In the Extension Development Host, run the command: **Baukasten: Show Log Viewer**

## Project Structure

```
vscode/
├── src/
│   ├── extension.ts           # VSCode extension entry point
│   └── webview/
│       ├── main.tsx           # React entry point
│       ├── App.tsx            # Main component
│       ├── App.css.ts         # Styles
│       └── components/
│           ├── FilterToolbar.tsx
│           ├── LogTable.tsx
│           ├── LogDetailPanel.tsx
│           └── StatusSummary.tsx
├── package.json               # Extension manifest
└── vite.config.ts             # Webview bundler
```

## Components Used

| Component | Usage |
|-----------|-------|
| DataTable | Main log display with virtualization |
| SplitPane | Log table + detail panel layout |
| Badge | Log level indicators |
| Input | Search bar |
| Select | Source filter dropdown |
| Checkbox | Level filter toggles |
| Button | Refresh/Clear actions |
| Accordion | Detail panel sections |
| Code | Stack trace display |
| Text | Labels and values |

## Customization

The mock data generator in `src/webview/data/mockLogs.ts` can be modified to:
- Change log sources
- Adjust log level distribution
- Customize message templates
- Add/remove metadata fields
