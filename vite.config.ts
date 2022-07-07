import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";
console.log(__dirname);
// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    vue(),
    // vueI18n({
    //   include: [path.resolve(__dirname, "./src/locales/**")],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  build: {
    cssCodeSplit: true, // true
    chunkSizeWarningLimit: 1000, // 500
    reportCompressedSize: true, // true
    rollupOptions: {
      output: {
        entryFileNames: () => {
          return "entry-[hash].js";
        },
        chunkFileNames: () => {
          return "js/chunk-[hash].js";
        },
        assetFileNames: (info) => {
          if (/.css$/.test(info.name as string)) {
            return "css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]"; // default
        },
      },
    },
  },
  optimizeDeps: {
    include: [path.resolve(process.cwd(), "./src/utils.ts")],
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
