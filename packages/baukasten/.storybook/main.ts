import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_PATH || '/',
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          // Use source files directly for HMR instead of built dist
          "@baukasten/web-wrapper": resolve(__dirname, "../../web-wrapper/src"),
        },
      },
    });
  },
};

export default config;
