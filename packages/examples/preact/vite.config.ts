import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// @preact/preset-vite aliases react/react-dom -> preact/compat automatically,
// so baukasten's compiled React imports resolve to Preact at build time.
export default defineConfig({
    plugins: [preact()],

    // Relative asset URLs so the build runs from whatever path it is served at.
    base: './',

    build: {
        // Published as part of the docs site, which links to it as a live demo.
        outDir: '../../website/public/demos/preact',
        emptyOutDir: true,
    },

    server: {
        port: 3001,
    },
});
