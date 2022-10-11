import { forEach, filter } from "lodash-es";
import axios from "axios";
import type {
  EmployeeReqType,
  EmployeeResType,
} from "@/core/type/employee-api";

export default {
  /**
   * 查詢使用者清單
   * @param payload 查詢條件
   * @param payload.allSubordinate 是否包含單位層級(含子單位)以下所有人(Y|N)
   * @param payload.grpIdList 組織/群組代碼清單
   * @param payload.isHiredOnly 是否限在職人員(Y|N)
   * @param payload.valueType value類型, A: AD帳號、E: 員工編號
   */
  doQryUserList: async function (payload: EmployeeReqType): EmployeeResType {
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
