/// <reference types="vitest" />
import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./tests/unit/setup.ts"],
    environment: "happy-dom",
  },
});
