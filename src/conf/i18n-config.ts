import type { App } from "vue";
import { createI18n } from "vue-i18n";
import zh_TW from "view-ui-plus/dist/locale/zh-TW";
import en from "view-ui-plus/dist/locale/en-US";

export const i18n = createI18n({
  locale: "zh-TW",
  messages: {
    "zh-TW": { ...zh_TW, hi: "你好" },
    "en-US": { ...en, hi: "hello" },
  },
});

export default (app: App) => {
  app.use(i18n);
};
