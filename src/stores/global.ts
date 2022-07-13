import { defineStore } from "pinia";
import moment from "moment";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    // Axios AJAX訊息
    axios: {
      requestCount: 0,
      spanId: "",
      sessionExpiredTime: moment().add(import.meta.env.VITE_APP_SESSION_TIMEOUT, "minutes"),
    },
    // 模式元件資訊
    layout: {
      title: "",
    },
    // 其他資訊
    misc: {
      showLogoutSpinner: false,
    },
  }),
  getters: {
    isShowSpinner: (state) => {
      return state.axios.requestCount > 0;
    },
    spanId: (state) => {
      return state.axios.spanId;
    },
    title: (state) => {
      return state.layout.title;
    },
  },
  actions: {
    doIncrementAjaxReq() {
      this.axios.requestCount++;
    },
    doDecrementAjaxReq() {
      this.axios.requestCount--;
    },
    doResetSessionExpiredTime() {
      this.axios.sessionExpiredTime = moment().add(
        import.meta.env.VITE_APP_SESSION_TIMEOUT,
        "minutes"
      );
    },
    doUpdateFunctionTitle(payload: { title: string }) {
      this.layout.title = payload.title;
    },
    doUpdateIsShowLogoutSpinner(payload: { isShowLogoutSpinner: boolean }) {
      this.misc.showLogoutSpinner = payload.isShowLogoutSpinner;
    },
  },
});
