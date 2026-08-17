# Baukasten VSCode Database Explorer Example

A VSCode extension demonstrating baukasten UI components arranged as a **database explorer**.

> ⚠️ This is a **static mockup** built for blog/screenshot purposes. Nothing is
> wired to a real database — all data is hardcoded.

## Layout

- **Toolbar** — `Breadcrumbs` (db path), search `Input`, `Button` (Run Query), `IconButton` actions
- **Sidebar** — `Tree` schema browser (databases → schemas → tables → columns) with guide edges, icons, and row-count badges
- **Editor** — `Tabs` (Data / Structure / SQL) over a `DataTable`, with `Tag` filter chips and a `Code` block
- **Status bar** — `StatusBar` with connection state, row counts, and engine info

## Running the Example

### From the monorepo root:

```bash
# Install dependencies
npm install

# Build the extension (also builds baukasten if needed)
npm run build:db-explorer

# Or watch for changes
npm run example:db-explorer
```

### Launch in VSCode:

1. Open the baukasten workspace in VSCode
2. Press **F5** and select **Launch DB Explorer Extension Example** from the Debug panel
3. In the Extension Development Host, run the command: **Baukasten: Show Database Explorer**

## Project Structure

```
vscode-db-explorer/
├── src/
│   ├── extension.ts           # VSCode extension entry point
│   └── webview/
│       ├── main.tsx           # React entry point
│       ├── App.tsx            # Mockup UI + hardcoded data
│       └── App.css            # Layout styles
├── package.json               # Extension manifest
└── vite.config.ts             # Webview bundler
```

## Components Used

| Component                          | Usage                                  |
| ---------------------------------- | -------------------------------------- |
| Tree                               | Schema browser sidebar                 |
| DataTable                          | Table rows + column structure          |
| Tabs                               | Data / Structure / SQL views           |
| SplitPane                          | Sidebar + editor layout                |
| Breadcrumbs                        | Database → schema → table path         |
| StatusBar                          | Connection + query info                |
| Badge                              | Row status, PK/UQ indicators           |
| Tag                                | Active filter chips                    |
| Button / IconButton               | Toolbar actions                        |
| Input                              | Row filter                             |
| Code                               | SQL query                              |
| Icon                               | Codicons throughout                    |
```
