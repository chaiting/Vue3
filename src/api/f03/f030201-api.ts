import axios from "axios";

export default {
  doGetError403: async function () {
    let reuslt = await axios.post("/error403");
    return reuslt;
  },
  doGetError404: async function () {
    let reuslt = await axios.post("/error404");
    return reuslt;
  },
  doGetError412: async function () {
    let reuslt = await axios.post("/error412");
    return reuslt;
  },
};
