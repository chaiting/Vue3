import { forEach, filter } from "lodash-es";
import axios from "axios";

export default {
  /**
   * 查詢使用者清單
   * @param {*} payload 查詢條件
   */
  doQryUserList: async function (payload: {
    allSubordinate?: string;
    grpIdList?: string[];
    isHiredOnly?: string;
    valueType?: string;
  }) {
    let result = await axios.post("/employee/01", payload);
    let body = result.data.body;

    // A: AD帳號 -----------------------------------------------------------------------------------------------------
    if (payload.valueType === "A") {
      forEach(body, (o) => {
        o.usedAccount = o.adAccount;
      });
    }

    // E: 員工編號 ---------------------------------------------------------------------------------------------------
    if (payload.valueType === "E") {
      forEach(body, (o) => {
        o.usedAccount = o.empNo;
      });
    }

    // 排除帳號為空值的資料、新增在職狀態欄位並回傳結果 ------------------------------------------------------------------
    return forEach(
      filter(body, (o) => {
        return o.usedAccount != null;
      }),
      (row) => {
        // 1: 試用折薪、2: 試用全薪、3: 任用、hired: 在職、left: 非在職 -----------------
        row.hireSts = ["1", "2", "3"].includes(row.accSts) ? "hired" : "left";
      }
    );
  },
};
