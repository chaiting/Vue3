import axios from "axios";
import type {
  CustomerListReqType,
  CustomerListResType,
} from "@/type/f01/f010101-types";

export default {
  /**
   * @param payload 查詢顧客列表參數
   * @returns 顧客列表
   */
  doQryCustomerList: async function (
    payload: CustomerListReqType
  ): Promise<CustomerListResType> {
    const result = await axios.post("/f010101/01", payload);
    return result.data.body;
  },
};
