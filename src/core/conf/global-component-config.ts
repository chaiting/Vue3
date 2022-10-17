import BpmSubmitter from "@/core/components/BpmSubmitter.vue";
import CityPostalSelect from "@/core/components/CityPostalSelect.vue";
import DepartmentSelect from "@/core/components/DepartmentSelect.vue";
import DeptEmpSelect from "@/core/components/DeptEmpSelect.vue";
import EmployeeSelect from "@/core/components/EmployeeSelect.vue";
import EsunAlert from "@/core/components/EsunAlert.vue";
import EsunConfirm from "@/core/components/EsunConfirm.vue";
import InfoCard from "@/core/components/InfoCard.vue";
import SysCdCheckbox from "@/core/components/SysCdCheckbox.vue";
import SysCdRadio from "@/core/components/SysCdRadio.vue";
import SysCdSelect from "@/core/components/SysCdSelect.vue";
import globalMixin from "@/core/mixin/global-mixin";
import type { App } from "vue";

export default (app: App) => {
  app.mixin(globalMixin);

  app.component("EsunAlert", EsunAlert);
  app.component("EsunConfirm", EsunConfirm);
  app.component("SysCdSelect", SysCdSelect);
  app.component("SysCdRadio", SysCdRadio);
  app.component("SysCdCheckbox", SysCdCheckbox);
  app.component("InfoCard", InfoCard);
  app.component("EmployeeSelect", EmployeeSelect);
  app.component("DepartmentSelect", DepartmentSelect);
  app.component("DeptEmpSelect", DeptEmpSelect);
  app.component("CityPostalSelect", CityPostalSelect);
  app.component("BpmSubmitter", BpmSubmitter);
};
