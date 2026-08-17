# Baukasten on Preact — PoC

**Verdict: compatible.** Baukasten runs unchanged on Preact via `preact/compat`.

## Why it works

- Baukasten's peer dep is `react: ^18 || ^19` — no React-19-only APIs in the source.
- The only React surface it touches is `forwardRef`, hooks, and `ReactDOM.createPortal` — all provided by `preact/compat`.
- Floating UI (`@floating-ui/react`, used by `Select`/`Tooltip`/`Dropdown`) works under compat.
- Styling is vanilla-extract → plain CSS, framework-agnostic.

## How

[`@preact/preset-vite`](./vite.config.ts) aliases at build time:

```
react            -> preact/compat
react-dom        -> preact/compat
react/jsx-runtime -> preact/jsx-runtime
```

So Baukasten's compiled `react`/`react-dom` imports resolve to Preact. No source changes, no fork.

## Run

```bash
npm run dev      # http://localhost:3001
npm run build
```

## TypeScript note

[`tsconfig.json`](./tsconfig.json) mirrors the runtime alias with `paths` (`react` → `preact/compat`)
and uses `jsx: react-jsx` **without** a `jsxImportSource: preact` override. That override makes app
JSX produce Preact `VNode`s while Baukasten's props expect compat's `ReactNode`, which TypeScript
flags as incompatible. Routing both through `preact/compat` keeps one type universe — `tsc` is clean.
