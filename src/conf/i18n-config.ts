import type { App } from "vue";
import { createI18n } from "vue-i18n";
import { locale } from "esun-ui";
// import zh_TW from "view-ui-plus/dist/locale/zh-TW";
// import en from "view-ui-plus/dist/locale/en-US";

const { zh_TW, en } = locale;

export const i18n = createI18n({
  locale: "zh-TW",
  messages: {
    "zh-TW": { ...zh_TW, hi: "你好", apple: "蘋果" },
    "en-US": { ...en, hi: "hello", apple: "Apple" },
  },
});

export default (app: App) => {
  app.use(i18n);
};
