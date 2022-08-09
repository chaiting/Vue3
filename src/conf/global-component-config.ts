import type { App } from "vue";
import EsunConfirm from "@/components/core/EsunConfirm.vue";

export default (app: App) => {
  app.component("esun-confirm", EsunConfirm);
};
