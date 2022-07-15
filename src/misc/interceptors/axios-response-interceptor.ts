import type { AxiosError, AxiosResponse } from "axios";
import { useGlobalStore } from "@/stores/global";
import router from "@/router";
import { getCurrentInstance } from "vue";

/**
 * 攔截每個AJAX HTTP Response進行處理
 */
function handleResponse(response: AxiosResponse) {
  const globalStore = useGlobalStore();
  globalStore.doDecrementAjaxReq();
  return response;
}

/**
 * 攔截每個AJAX HTTP Response Error進行處理
 */
function handleResponseError(error: AxiosError<any>) {
  const globalStore = useGlobalStore();
  globalStore.doDecrementAjaxReq();

  /**
   * 401: (Unauthorized)代表客戶端錯誤，指的是由於缺乏目標資源要求的身份驗證憑證，發送的請求未得到滿足
   */
  if (error.response?.status === 401) {
    router.push("/unauthorized");
    return Promise.reject(error);
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
   * 401(Unauthorized)、403(Forbidden)及412: (Precondition Failed)以外，其他類型錯誤
   */
  globalStore.doUpdateAjaxSpanId({ spanId: error.response?.data.spanId });
  router.push("/error");
  return Promise.reject(error);
}

function showMessage(msgs: string[]) {
  console.log(msgs);
  const app = getCurrentInstance();
  console.log(app);
  alert(msgs);
}

export { handleResponse, handleResponseError };
