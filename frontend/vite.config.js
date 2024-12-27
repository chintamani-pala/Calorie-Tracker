import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist", // This is the directory where your build files will be output
    emptyOutDir: true, // Ensure this option is set to true to clean the dist folder before every build
  },
});
