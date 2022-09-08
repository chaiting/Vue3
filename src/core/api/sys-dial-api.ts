import axios from "axios";

interface SystemCallPayload {
  // 受話號碼
  calledNumber: string;
  // 受話電話來源
  calledNumberSrcField: string;
  // 受話對象類型
  calledObjType: string;
  // 發話號碼
  callingNumber: string;
  // 通話原因類型
  reasonCd: string;
  // 受話者鍵值
  calledId?: string;
  // 受話者名稱
  calledInfo?: string;
  // 功能代碼
  srcFuncCode?: string;
  // 功能名稱
  srcFuncName?: string;
  // 業務鍵值
  refProcKey?: string;
  // 通話原因備註`
  reasonDesc?: string;
}

export default {
  /**
   * 查詢行內使用者撥號資訊
   */
  doGetEmployeeDialInfo: async function () {
    let result = await axios.post("/sys_dial/01");
    return result.data.body;
  },
  /**
   * 取得顧客撥號紀錄清單
   * @param {*} payload 查詢條件
   */
  doQryCustomerDialHistory: async function (payload: string) {
    let result = await axios.post("/sys_dial/02", {
      customerId: payload,
      pageNo: "1",
      pageSize: "5",
    });
    return result.data.body;
  },
  /**
   * 系統撥號
   * @param {*} payload 撥號參數
   */
  doSystemCall: async function (payload: SystemCallPayload) {
    let result = await axios.post("/sys_dial/03", payload);
    return result.data.body;
  },
};
