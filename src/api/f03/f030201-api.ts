import axios from "axios";

export default {
  doGetError401: async function () {
    let reuslt = await axios.post("/error401");
    return reuslt;
  },
  doGetError403: async function () {
    let reuslt = await axios.post("/error403");
    return reuslt;
  },
  doGetError412: async function () {
    let reuslt = await axios.post("/error412");
    return reuslt;
  },
};
