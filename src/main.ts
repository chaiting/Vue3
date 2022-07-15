import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import setupPiniaConfig from "@/conf/pinia-config";
import setupAxiosConfig from "@/conf/axios-config";
import setupAxiosMockConfig from "@/conf/axios-mock-adapter-config";
import setupI18nConfig from "@/conf/i18n-config";
import setupViewUiPlusConfig from "@/conf/view-ui-plus-config";
import setupFontawesomeConfig from "@/conf/fontawesome-config";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";

import "@/assets/commonStyle.css";
import "@/assets/style.scss";

const app = createApp(App);
/** setup */
setupAxiosConfig();
setupAxiosMockConfig();
setupPiniaConfig(app);
setupI18nConfig(app);
setupViewUiPlusConfig(app);
setupFontawesomeConfig(app);

// myuser@gmail.com / 123456 (帳號/密碼)
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
    console.log(`mount (1)`);
    // @ts-ignore
    window.keycloak = keycloak;
    app.use(router);
    app.mount("#app");
  },
});
