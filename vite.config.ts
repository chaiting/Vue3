// import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [vue(), visualizer({ open: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // fileURLToPath(new URL("./src", import.meta.url))
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 消除warning
    },
  },
  build: {
    sourcemap: false, // false
    cssCodeSplit: true, // true
    chunkSizeWarningLimit: 10000, // 500
    reportCompressedSize: true, // true
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        // assetFileNames: (path) => {
        //   return "assets/[name].[hash].[ext]";
        // },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
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
