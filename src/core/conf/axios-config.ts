import axios from "axios";
import {
  handleRequest,
  handleRequestError,
} from "@/core/interceptors/axios-request-interceptor";
import {
  handleResponse,
  handleResponseError,
} from "@/core/interceptors/axios-response-interceptor";

const {
  VITE_APP_AXIOS_BASE_URL,
  VITE_APP_AXIOS_DEFAULT_TIMEOUT,
  VITE_APP_AXIOS_WITH_CREDENTIALS,
} = import.meta.env;

export default () => {
  axios.defaults.timeout = VITE_APP_AXIOS_DEFAULT_TIMEOUT * 1000;
  axios.defaults.baseURL = VITE_APP_AXIOS_BASE_URL;
  axios.defaults.withCredentials = VITE_APP_AXIOS_WITH_CREDENTIALS;
  axios.interceptors.request.use(handleRequest, handleRequestError);
  axios.interceptors.response.use(handleResponse, handleResponseError);
};
