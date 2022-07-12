import axios from "axios";

export default {
  doSaveFrontedAccessLog: async function (payload: { resourceUri: string; resourceType: string }) {
    return await axios.post("/fronted_access_log/01", payload);
  },
};
