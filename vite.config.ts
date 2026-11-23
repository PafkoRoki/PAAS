import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import catalog from "./plugins/catalog";
import seo from "./plugins/seo";

export default defineConfig({
  plugins: [react(), catalog(), seo({ origin: "https://pafkoroki.github.io" })],
  base: "/PAAS/",
});
