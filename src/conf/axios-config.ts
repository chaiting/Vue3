import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";

const { VITE_APP_AXIOS_BASE_URL, VITE_APP_AXIOS_DEFAULT_TIMEOUT, VITE_APP_AXIOS_WITH_CREDENTIALS } =
  import.meta.env;

export default () => {
  axios.defaults.timeout = VITE_APP_AXIOS_DEFAULT_TIMEOUT * 1000;
  axios.defaults.baseURL = VITE_APP_AXIOS_BASE_URL;
  axios.defaults.withCredentials = VITE_APP_AXIOS_WITH_CREDENTIALS;
  axios.interceptors.request.use(handleRequest, handleRequestError);
  axios.interceptors.response.use(handleResponse, handleResponseError);
};

// Request
function handleRequest(config: AxiosRequestConfig) {
  const globalStore = useGlobalStore();
  globalStore.doIncrementAjaxReq();
  return config;
}
function handleRequestError(error: AxiosError) {
  return Promise.reject(error);
}
// Response
function handleResponse(response: AxiosResponse) {
  const globalStore = useGlobalStore();
  globalStore.doDecrementAjaxReq();
  return response;
}
function handleResponseError(error: AxiosError<any>) {
  // 401
  if (error.response?.status === 401) {
    router.push("/unauthorized");
    return Promise.reject(error);
  }
  // 403
  if (error.response?.status === 403) {
    router.push("/forbidden");
    return Promise.reject(error);
  }
  // 412
  if (error.response?.status === 412) {
    showMessage(error.response.data.msg);
    return Promise.reject(error);
  }
  // others
  return Promise.reject(error);
}

function showMessage(megs: string[]) {}
