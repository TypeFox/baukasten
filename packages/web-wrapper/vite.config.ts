import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'BaukastenWebWrapper',
            formats: ['es', 'cjs'],
            // The package is "type": "module", so a CommonJS file named .js would be loaded as ESM
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'ReactJSXRuntime',
                    'react/jsx-dev-runtime': 'ReactJSXDevRuntime',
                },
                banner: '"use client";',
                preserveModules: false,
            },
        },
    },
});
