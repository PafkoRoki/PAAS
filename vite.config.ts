import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import catalog from "./plugins/catalog";

export default defineConfig({
  plugins: [react(), catalog()],
  base: "/PAAS/",
  build: {
    // PixelTrail (Three.js) is a lazy chunk of ~890 kB; it does not block the first render.
    chunkSizeWarningLimit: 1000,
  },
});
