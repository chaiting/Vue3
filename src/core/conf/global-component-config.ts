import type { App } from "vue";
import EsunConfirm from "@/core/components/EsunConfirm.vue";
import SysCdSelect from "@/core/components/SysCdSelect.vue";
import SysCdCheckbox from "@/core/components/SysCdCheckbox.vue";
import SysCdRadio from "@/core/components/SysCdRadio.vue";
import EsunAlert from "@/core/components/EsunAlert.vue";
import InfoCard from "@/core/components/InfoCard.vue";
import EmployeeSelect from "@/core/components/EmployeeSelect.vue";
import DepartmentSelect from "@/core/components/DepartmentSelect.vue";
import DeptEmpSelect from "@/core/components/DeptEmpSelect.vue";
import CityPostalSelect from "@/core/components/CityPostalSelect.vue";
import BpmSubmitter from "@/core/components/BpmSubmitter.vue";
// Dial
import NumericKeyboard from "@/core/components/dial/NumericKeyboard.vue";
import Dialler from "@/core/components/dial/Dialler.vue";
import CustomerPhone from "@/core/components/dial/CustomerPhone.vue";
import CustomerPhoneList from "@/core/components/dial/CustomerPhoneList.vue";
import CustomerDialler from "@/core/components/dial/CustomerDialler.vue";

export default (app: App) => {
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
  // Dial
  app.component("NumericKeyboard", NumericKeyboard);
  app.component("Dialler", Dialler);
  app.component("CustomerPhone", CustomerPhone);
  app.component("CustomerPhoneList", CustomerPhoneList);
  app.component("CustomerDialler", CustomerDialler);
};
