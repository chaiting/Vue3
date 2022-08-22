import type { App } from "vue";
import ViewUIPlus from "view-ui-plus";
import { i18n } from "@/core/conf/i18n-config";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "@/core/assets/theme.less";
import "@/core/assets/commonStyle.css";

export default (app: App) => {
  app.use(ViewUIPlus, { i18n });
  app.component("EInput", {
    template: `<Input clearable></Input>`,
  });
};