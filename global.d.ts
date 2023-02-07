import { KeycloakInstance } from "keycloak-js";

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
