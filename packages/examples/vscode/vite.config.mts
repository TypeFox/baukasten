import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist/webview',
        rollupOptions: {
            input: resolve(import.meta.dirname, 'src/webview/index.html'),
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
        // Disable sourcemaps to avoid CSP issues in webview
        sourcemap: false,
    },
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, 'src/webview'),
        },
    },
});
