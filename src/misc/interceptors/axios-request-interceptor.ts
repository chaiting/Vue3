import type { AxiosError, AxiosRequestConfig } from "axios";
import { useGlobalStore } from "@/stores/global";
import messageBridgeApi from "@/api/core/message-bridge-api";

/**
 * 攔截每個AJAX HTTP Request進行處理
 */
function handleRequest(config: AxiosRequestConfig) {
  const globalStore = useGlobalStore();
  globalStore.doIncrementAjaxReq();
  // @ts-ignore
  if (window.keycloak.token) {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${window.keycloak.token}`;
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
