import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path";
// https://vitejs.dev/config/

const config = defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      visualizer({ open: false }),
      viteCompression({
        disable: !["sit", "uat", "prod"].includes(mode),
        filter: /\.(js|mjs|json|css|html)$/i,
        algorithm: "gzip",
        threshold: 0,
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", // 消除warning
      },
    },
    build: {
      sourcemap: ["dev", "sit", "uat"].includes(mode),
      cssCodeSplit: true, // true
      chunkSizeWarningLimit: 10000, // 500
      reportCompressedSize: false, // true
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
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
  };
});

export default config;
