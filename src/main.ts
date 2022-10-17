import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import { createApp } from "vue";
import setupAxiosConfig from "@/core/conf/axios-config";
import setupAxiosMockConfig from "@/core/conf/axios-mock-adapter-config";
import setupFontawesomeConfig from "@/core/conf/fontawesome-config";
import setupGlobalComponentConfig from "@/core/conf/global-component-config";
import setupI18nConfig from "@/core/conf/i18n-config";
import setupPiniaConfig from "@/core/conf/pinia-config";
import setupViewUiPlusConfig from "@/core/conf/view-ui-plus-config";
import setupVueEchartsConfig from "@/core/conf/vue-echarts-config";
import App from "./App.vue";
import router from "./router";

import "@/assets/style.scss";

const app = createApp(App);
/** setup config */
setupAxiosConfig();
setupAxiosMockConfig();
setupPiniaConfig(app);
setupI18nConfig(app);
setupViewUiPlusConfig(app);
setupGlobalComponentConfig(app);
setupFontawesomeConfig(app);
setupVueEchartsConfig(app);

/** myuser@gmail.com / myuser123 (帳號/密碼) */
app.use(VueKeyCloak, {
  init: {
    onLoad: "login-required",
    checkLoginIframe: false,
  },
  config: {
    url: import.meta.env.VITE_APP_KEYCLOAK_AUTH_URL,
    realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
  },
  onReady: (keycloak: any) => {
    window.keycloak = keycloak;
    app.use(router);
    app.mount("#app");
  },
});
