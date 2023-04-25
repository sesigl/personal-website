import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import url from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/.next/**"],
  },
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      {
        find: "contentlayer/generated",
        replacement: url.fileURLToPath(
          new URL("./.contentlayer/generated", import.meta.url)
        ),
      },
    ],
  },
});
