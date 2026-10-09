import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import catalog from "./plugins/catalog";

export default defineConfig({
  plugins: [react(), catalog()],
  base: "/PAAS/",
});
