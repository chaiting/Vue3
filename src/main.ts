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

const app = createApp(App);

setupAxiosConfig();
setupAxiosMockConfig();
setupI18nConfig(app);
setupViewUiPlusConfig(app);

app.use(createPinia());
app.use(router);
app.mount("#app");
