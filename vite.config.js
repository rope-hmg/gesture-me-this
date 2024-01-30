import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "gesture-me-this",
      fileName: (format) => `gesture-me-this.${format}.js`,
    },
    sourcemap: true,
  },
  plugins: [],
});
