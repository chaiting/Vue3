import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setupPiniaConfig from "@/conf/pinia-config";
import setupAxiosConfig from "@/conf/axios-config";
import setupEsunConfig from "@/conf/esun-ui-config";
import setupAxiosMockConfig from "@/conf/axios-mock-adapter-config";
import setupI18nConfig from "@/conf/i18n-config";
// import setupViewUiPlusConfig from "@/conf/view-ui-plus-config";
import setupFontawesomeConfig from "@/conf/fontawesome-config";
import setupVueEchartsConfig from "@/conf/vue-echarts-config";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";

import "@/assets/style.scss";

const app = createApp(App);
/** setup config*/
setupAxiosConfig();
setupAxiosMockConfig();
setupPiniaConfig(app);
setupI18nConfig(app);
// setupViewUiPlusConfig(app);
setupEsunConfig(app); // *****
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
