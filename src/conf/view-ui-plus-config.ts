import type { App } from "vue";
import ViewUIPlus from "view-ui-plus";
import { i18n } from "@/conf/i18n-config";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "@/assets/theme.less";
import "@/assets/commonStyle.css";

export default (app: App) => {
  app.use(ViewUIPlus, { i18n });
  app.component("EInput", {
    template: `<Input clearable></Input>`,
  });
};
