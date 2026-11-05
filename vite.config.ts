import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/three/src/")) return "three";
          if (
            id.includes("/node_modules/@react-three/") ||
            id.includes("/three-stdlib/")
          )
            return "react-three";
        },
      },
    },
  },
});
