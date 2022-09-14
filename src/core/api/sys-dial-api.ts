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
   * @param {*} payload 系統撥號參數
   * @param {*} payload.calledNumber 受話號碼
   * @param {*} payload.calledNumberSrcField 受話電話來源
   * @param {*} payload.calledObjType 受話對象類型
   * @param {*} payload.callingNumber 發話號碼
   * @param {*} payload.reasonCd 通話原因類型
   * @param {*} payload.calledId 受話者鍵值
   * @param {*} payload.calledInfo 受話者名稱
   * @param {*} payload.srcFuncCode 功能代碼
   * @param {*} payload.srcFuncName 功能名稱
   * @param {*} payload.refProcKey 業務鍵值
   * @param {*} payload.reasonDesc 通話原因備註
   */
  doSystemCall: async function (payload: {
    calledNumber: string;
    calledNumberSrcField: string;
    calledObjType: string;
    callingNumber: string;
    reasonCd: string;
    calledId?: string;
    calledInfo?: string;
    srcFuncCode?: string;
    srcFuncName?: string;
    refProcKey?: string;
    reasonDesc?: string;
  }) {
    let result = await axios.post("/sys_dial/03", payload);
    return result.data.body;
  },
};
