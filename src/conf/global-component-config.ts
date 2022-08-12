import type { App } from "vue";
import EsunConfirm from "@/components/core/EsunConfirm.vue";
import SysCdSelect from "@/components/core/SysCdSelect.vue";
import SysCdCheckbox from "@/components/core/SysCdCheckbox.vue";
import SysCdRadio from "@/components/core/SysCdRadio.vue";
import EsunAlert from "@/components/core/EsunAlert.vue";
import InfoCard from "@/components/core/InfoCard.vue";

export default (app: App) => {
  app.component("EsunAlert", EsunAlert);
  app.component("EsunConfirm", EsunConfirm);
  app.component("SysCdSelect", SysCdSelect);
  app.component("SysCdRadio", SysCdRadio);
  app.component("SysCdCheckbox", SysCdCheckbox);
  app.component("InfoCard", InfoCard);
};
