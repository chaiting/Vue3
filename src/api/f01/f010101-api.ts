import axios from "axios";

export default {
  doQryCustomerList: async function (payload: any) {
    let result = await axios.post("/f010101/01", payload);
    return result.data.body;
  },
};
