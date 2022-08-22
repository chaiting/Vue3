// import { fileURLToPath, URL } from "url";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
// https://vitejs.dev/config/
const config = defineConfig({
  // plugins: [splitVendorChunkPlugin(),vue(), visualizer({ open: true })],
  plugins: [splitVendorChunkPlugin(), vue(), visualizer({ open: true })],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "./src"),
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
        manualChunks: (id) => {
          return getChunkName(id);
        },
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

function getChunkName(id: string) {
  if (id.includes("node_modules")) return "vendor";
  if (id.includes("/views/f01")) return "f01";
  if (id.includes("/views/f02")) return "f02";
  if (id.includes("/views/f03")) return "f03";
}