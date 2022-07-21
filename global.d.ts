import { KeycloakInstance } from "keycloak-js";

declare global {
  interface Window {
    keycloak: KeycloakInstance;
    [key: string]: any;
  }
}

// components
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    MenuItem: typeof import("view-iu-plus")["MenuItem"];
  }
}
