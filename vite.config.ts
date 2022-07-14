import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
console.log(`@import "${path.resolve(__dirname, "src/assets/theme.less")}";`)
// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [vue(), visualizer({ open: true })],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 消除warning
    },
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true, // true
    chunkSizeWarningLimit: 1000, // 500
    reportCompressedSize: true, // true
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        // assetFileNames: (path) => {
        //   console.log(path);
        //   return "assets/[name].[hash].[ext]";
        // },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // additionalData: `@import "${path.resolve(__dirname, "src/assets/theme.less")}";`,
      },
    },
  },
  server: {
    port: 8888,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
    },
  },
});
export default config;
