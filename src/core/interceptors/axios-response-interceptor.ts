import { delay, size, join } from "lodash-es";
import Swal from "sweetalert2";
import { IGNORE_GLOBAL_SPINNER_URLS } from "@/conf/app-config";
import { useGlobalStore } from "@/core/store/global";
import router from "@/router";
import type { AxiosError, AxiosResponse } from "axios";

/**
 * 攔截每個AJAX HTTP Response進行處理
 */
function handleResponse(response: AxiosResponse) {
  const globalStore = useGlobalStore();
  const isIgnoreUrl = IGNORE_GLOBAL_SPINNER_URLS.some(
    (url) => response.config.url === url
  );

  if (!isIgnoreUrl) {
    delay(() => globalStore.doDecrementAjaxReq(), 500);
  }

  return response;
}

/**
 * 攔截每個AJAX HTTP Response Error進行處理
 */
function handleResponseError(error: AxiosError<any>) {
  const globalStore = useGlobalStore();
  const isIgnoreUrl = IGNORE_GLOBAL_SPINNER_URLS.some(
    (url) => error.config.url === url
  );

  if (!isIgnoreUrl) {
    delay(() => globalStore.doDecrementAjaxReq(), 500);
  }
  /**
   * 403: (Forbidden)代表客戶端錯誤，指的是服務器端有能力處理該請求，但是拒絕授權訪問
   */
  if (error.response?.status === 403) {
    router.push("/forbidden");
    return Promise.reject(error);
  }
  /**
   * 412: (Precondition Failed)傳入參數不符Server端預期
   */
  if (error.response?.status === 412) {
    showMessage(error.response.data.msg);
    return Promise.reject(error);
  }
  /**
   * 403(Forbidden)及412: (Precondition Failed)以外，其他類型錯誤
   */
  globalStore.doUpdateAjaxSpanId({ spanId: error.response?.data.spanId });
  router.push("/error");
  return Promise.reject(error);
}

function showMessage(msgs: string[]) {
  if (!msgs || size(msgs) < 1) return;

  const style = "'margin-left: 25px; text-align: left'";

  let html = "<div style=" + style + "><ol><li>";
  html += join(msgs, "</li><li>");
  html += "</li></ol></div>";

  Swal.fire({
    icon: "warning",
    html: html,
    showCancelButton: false,
    allowOutsideClick: false,
    buttonsStyling: true,
    allowEscapeKey: true,
    focusCancel: false,
    confirmButtonColor: "#006600",
    cancelButtonColor: "#9C1003",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
}

export { handleResponse, handleResponseError };
