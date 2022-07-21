/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENABLE_MOCK: string;
  readonly VITE_APP_AXIOS_BASE_URL: string;
  readonly VITE_APP_AXIOS_DEFAULT_TIMEOUT: number;
  readonly VITE_APP_SESSION_TIMEOUT: number;
  readonly VITE_APP_AXIOS_WITH_CREDENTIALS: boolean;
  readonly VITE_APP_KEYCLOAK_AUTH_URL: string;
  readonly VITE_APP_KEYCLOAK_REALM: string;
  readonly VITE_APP_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_APP_EPSP_HOME_URL: string;
  readonly VITE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "view-ui-plus/dist/locale/zh-TW";
declare module "view-ui-plus/dist/locale/en-US";
declare module "*";
