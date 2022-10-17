import { delay } from "lodash-es";
import { useGlobalStore } from "@/core/store/global";
import messageBridgeApi from "@/core/api/message-bridge-api";
import { IGNORE_GLOBAL_SPINNER_URLS } from "@/conf/app-config";
import type { AxiosError, AxiosRequestConfig } from "axios";
/**
 * 攔截每個AJAX HTTP Request進行處理
 */
function handleRequest(config: AxiosRequestConfig) {
  const globalStore = useGlobalStore();

  // Request發送出去後500ms，才將次數加1，避免回應很快的Request一樣會轉圈圈 -------------------------------------------
  const isIgnoreUrl = IGNORE_GLOBAL_SPINNER_URLS.some(
    (url) => config.url === url
  );
  if (!isIgnoreUrl) {
    delay(() => globalStore.doIncrementAjaxReq(), 500);
  }
  if (window.keycloak?.token) {
    config.headers!.Authorization = `Bearer ${window.keycloak.token}`;
  }

  messageBridgeApi.notifyCountdownReset();
  globalStore.doResetSessionExpiredTime();

  return config;
}

/**
 * 攔截每個AJAX HTTP Request Error進行處理
 */
function handleRequestError(error: AxiosError) {
  return Promise.reject(error);
}

export { handleRequest, handleRequestError };
