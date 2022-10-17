import { createI18n } from "vue-i18n";
import zh_TW from "view-ui-plus/dist/locale/zh-TW";
import en from "view-ui-plus/dist/locale/en-US";
import type { App } from "vue";

export const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  fallbackLocale: "zh-TW",
  locale: "zh-TW",
  messages: {
    "zh-TW": { ...zh_TW, hi: "你好", apple: "蘋果" },
    "en-US": { ...en, hi: "hello", apple: "Apple" },
  },
});

export default (app: App) => {
  app.use(i18n);
};

// https://www.iviewui.com/view-ui-plus/guide/i18n
