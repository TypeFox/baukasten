import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";

/**
 * Vite plugin that wraps all generated CSS in @layer baukasten { ... }
 * This ensures the component library CSS has lower specificity than consumer styles,
 * making it easier to override without !important or complex selectors.
 * Note: This handles only the CSS generates from vanilla-extract!
 */
function wrapInLayer(): Plugin {
  return {
    name: "wrap-css-in-layer",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type === "asset" && asset.fileName.endsWith(".css")) {
          asset.source = `@layer baukasten {\n${asset.source}\n}`;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    vanillaExtractPlugin(),
    wrapInLayer(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Baukasten",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
      cssFileName: "baukasten-base",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "react/jsx-dev-runtime": "ReactJSXDevRuntime",
        },
        banner: '"use client";',
        preserveModules: false,
      },
    },
  },
});
