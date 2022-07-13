import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "@/assets/base.css";
import setupAxiosConfig from "@/conf/axios-config";
import setupAxiosMockConfig from "@/conf/axios-mock-adapter-config";
import setupI18nConfig from "@/conf/i18n-config";
import setupViewUiPlusConfig from "@/conf/view-ui-plus-config";
import VueKeyCloak from "@dsb-norge/vue-keycloak-js";

import "@/assets/commonStyle.css";
import "@/assets/style.scss";


const app = createApp(App);
app.use(createPinia());

setupAxiosConfig();
setupAxiosMockConfig();
setupI18nConfig(app);
setupViewUiPlusConfig(app);

// 帳號 / 密碼: myuser@gmail.com / 123456
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
  onReady: (key: any, key2: any) => {
    console.log({ key, key2 });
    // @ts-ignore
    window.keycloak = key;
    console.log(`ready`);
    app.use(router);
    app.mount("#app");
  },
});
