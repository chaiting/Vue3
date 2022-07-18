/// <reference types="vite/client" />

declare module "view-ui-plus/dist/locale/zh-TW";
declare module "view-ui-plus/dist/locale/en-US";
// declare module "*";

export declare global {
  interface Window {
    // add custom properties and methods
    // keycloak: any;
    [key: string]: any;
  }
}
