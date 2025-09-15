import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: ".", // copie le fichier à la racine de dist/
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
  },
  base: "/",
});
