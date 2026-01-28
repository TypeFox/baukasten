import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
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
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        banner: '"use client";',
        preserveModules: false,
      },
    },
  },
});
