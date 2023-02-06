import en from "view-ui-plus/dist/locale/en-US";
import zh_TW from "view-ui-plus/dist/locale/zh-TW";
import { createI18n } from "vue-i18n";
import type { App } from "vue";

zh_TW.i.page.item = "筆";
zh_TW.i.page.items = "筆";
zh_TW.i.page.page = "筆";

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
