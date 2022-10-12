import axios from "axios";
import type {
  EmpDialInfoResType,
  DialHistoryListResType,
  SysDialReqType,
} from "@/core/type/sys-dial-types";

export default {
  /**
   * 查詢行內使用者撥號資訊
   * @returns 行內使用者撥號資訊
   */
  doGetEmployeeDialInfo: async function (): EmpDialInfoResType {
    let result = await axios.post("/sys_dial/01");
    return result.data.body;
  },
  /**
   * 取得顧客撥號紀錄清單
   * @param payload 查詢條件
   * @returns 顧客撥號紀錄清單
   */
  doQryCustomerDialHistory: async function (
    payload: string
  ): DialHistoryListResType {
    let result = await axios.post("/sys_dial/02", {
      customerId: payload,
      pageNo: "1",
      pageSize: "5",
    });
    return result.data.body;
  },
  /**
   * 系統撥號
   * @param payload 系統撥號參數
   * @returns 撥號結果
   */
  doSystemCall: async function (payload: SysDialReqType): Promise<boolean> {
    let result = await axios.post("/sys_dial/03", payload);
    return result.data.body;
  },
};
