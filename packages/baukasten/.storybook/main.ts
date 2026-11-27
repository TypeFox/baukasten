import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            base: process.env.STORYBOOK_BASE_PATH || '/',
            plugins: [vanillaExtractPlugin()],
            resolve: {
                alias: {
                    // Use source files directly for HMR instead of built dist
                    'baukasten-ui-web-wrapper': resolve(
                        import.meta.dirname,
                        '../../web-wrapper/src',
                    ),
                },
            },
        });
    },
};

export default config;
