import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  site: process.env.PUBLIC_SITE_URL || "https://amas-stop-and-scan.workers.dev",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  vite: {
    envPrefix: ["PUBLIC_", "VITE_"],
  },
});
