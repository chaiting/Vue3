import axios from "axios";
const { VITE_APP_AXIOS_BASE_URL, VITE_APP_AXIOS_DEFAULT_TIMEOUT } = import.meta.env;

export default () => {
  axios.defaults.timeout = VITE_APP_AXIOS_DEFAULT_TIMEOUT;
  axios.defaults.baseURL = VITE_APP_AXIOS_BASE_URL;
};
