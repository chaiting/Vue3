import { defineStore } from "pinia";
import moment from "moment";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    axios: {
      requestCount: 0,
      spanId: "",
      sessionExpiredTime: moment().add(
        import.meta.env.VITE_APP_SESSION_TIMEOUT,
        "minutes"
      ),
    },
    layout: {
      title: "",
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
  },
});
