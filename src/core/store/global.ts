import { defineStore } from "pinia";
import moment from "moment";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    // Axios AJAX訊息
    axios: {
      requestCount: 0,
      spanId: "",
      sessionExpiredTime: moment().add(
        import.meta.env.VITE_APP_SESSION_TIMEOUT,
        "minutes"
      ),
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
    /** 是否顯示資料處理中Spinner */
    isShowSpinner: (state) => {
      return state.axios.requestCount > 0;
    },
    /** 取得SpanId，發生異常時前端顯示(用於除錯) */
    spanId: (state) => {
      return state.axios.spanId;
    },
    /** 取得功能標題 */
    title: (state) => {
      return state.layout.title;
    },
    /** 是否顯示登出處理中Spinner  */
    isShowLogoutSpinner: (state) => {
      return state.misc.showLogoutSpinner;
    },
  },
  actions: {
    /** AJAX Request執行中次數加1 */
    doIncrementAjaxReq() {
      this.axios.requestCount++;
    },
    /** AJAX Request執行中次數減1 */
    doDecrementAjaxReq() {
      this.axios.requestCount--;
    },
    /** 重設Session逾期操作時間 */
    doResetSessionExpiredTime() {
      this.axios.sessionExpiredTime = moment().add(
        import.meta.env.VITE_APP_SESSION_TIMEOUT,
        "minutes"
      );
    },
    /** 更新當前URI功能標題 */
    doUpdateFunctionTitle(payload: { title: string }) {
      this.layout.title = payload.title;
    },
    /** 更新是否顯示登出SPINNER */
    doUpdateShowLogoutSpinner(payload: { isShowLogoutSpinner: boolean }) {
      this.misc.showLogoutSpinner = payload.isShowLogoutSpinner;
    },
    /** 更新SpanId資訊 */
    doUpdateAjaxSpanId(payload: { spanId: string }) {
      this.axios.spanId = payload.spanId;
    },
  },
});
