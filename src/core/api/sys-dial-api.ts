import axios from "axios";

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
  doSystemCall: async function (payload: {
    callingNumber: string;
    calledNumber: string;
    calledId: string;
    calledInfo: string;
    calledNumberSrcField: string;
    calledObjType: string;
    srcFuncCode: string;
    srcFuncName: string;
    refProcKey: string;
    reasonCd: string;
    reasonDesc?: string;
  }) {
    let result = await axios.post("/sys_dial/03", payload);
    return result.data.body;
  },
};
