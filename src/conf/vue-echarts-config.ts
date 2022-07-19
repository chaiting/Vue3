import ECharts from "vue-echarts";
import type { App } from "vue";

export default (app: App) => {
  app.component("v-chart", ECharts);
};