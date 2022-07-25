import type { App } from "vue";
import esunUI from "esun-ui";
import "esun-ui/dist/style.css";

export default (app: App) => {
  app.use(esunUI);
};
