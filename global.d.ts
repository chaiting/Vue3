import { KeycloakInstance } from "keycloak-js";
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

/**
 * 全局window
 */
declare global {
  interface Window {
    keycloak: KeycloakInstance;
    [key: string]: any;
  }
}

/**
 * 加入MenuItem組件聲明，避免vscode顯示錯誤
 */
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MenuItem: typeof import("view-ui-plus")["MenuItem"];
  }
}
