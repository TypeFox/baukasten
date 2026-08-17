import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// @preact/preset-vite aliases react/react-dom -> preact/compat automatically,
// so baukasten's compiled React imports resolve to Preact at build time.
export default defineConfig({
    plugins: [preact()],
    server: {
        port: 3001,
    },
});
