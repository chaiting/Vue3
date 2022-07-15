import type { Pagination } from "@/type/common";
import axios from "axios";

export default {
  doQryCustomerList: async function (payload: Pagination) {
    let result = await axios.post("/f010101/01", payload);
    return result.data.body;
  },
};
