import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The @codingame/monaco-vscode-* packages are ESM-only, rely on top-level await
 * and instantiate their workers with `new Worker(new URL(...), {type:'module'})`.
 * Vite is the bundler that stack officially supports, which is why this demo is
 * a standalone app rather than part of the Next site — the docs page embeds the
 * built output in an iframe.
 */
export default defineConfig({
    // Served from the docs site under this path (see build.outDir below).
    base: './',

    plugins: [react()],

    build: {
        // Top-level await in the VS Code services requires a modern target.
        target: 'esnext',
        outDir: '../../website/public/demos/agent-ide',
        emptyOutDir: true,
    },

    worker: {
        // The VS Code services ship ES module workers.
        format: 'es',
    },

    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext',
        },
    },

    resolve: {
        // `vscode` is an alias for @codingame/monaco-vscode-extension-api; loading
        // two copies of it breaks the service registry.
        dedupe: ['vscode', '@codingame/monaco-vscode-api', '@codingame/monaco-vscode-editor-api'],
    },

    server: {
        port: 3210,
    },
});
