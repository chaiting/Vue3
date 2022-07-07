import ViewUIPlus from "view-ui-plus";
import { i18n } from "@/conf/i18n-config";

import type { App } from "vue";

export default (app: App) => {
  app.use(ViewUIPlus, { i18n });
};
