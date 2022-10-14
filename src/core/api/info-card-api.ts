import axios from "axios";
import type {
  InfoCardReqType,
  EmployeeInfoCardResType,
  callAutoDialReqType,
} from "@/core/type/info-card-types";

export default {
  /**
   * 取得行內使用者資訊卡片資訊
   * @param payload 查詢參數
   * @returns 行內使用者資訊卡片資訊
   */
  doGetEmployeeInfoCard: async function (
    payload: InfoCardReqType
  ): EmployeeInfoCardResType {
    const result = await axios.post("/info_card/01", payload);
    return result.data.body;
  },
  /**
   * 系統撥號
   * @param payload 撥號參數
   * @returns 撥號結果
   */
  callAutoDial: async function (
    payload: callAutoDialReqType
  ): Promise<boolean> {
    const result = await axios.post("/info_card/02", {
      callingNumber: payload.userExtension,
      calledId: payload.employeeNo,
      calledInfo: payload.cname,
      calledNumber:
        payload.isCreditCardMember === "Y" // Y: 卡處人員
          ? payload.officePhoneext
          : payload.deptPhoneNo,
      calledNumberSrcField: payload.isCreditCardMember === "Y" ? "Z1" : "Z3", // Z1: 個人分機, Z3: 單位簡碼
      calledObjType: payload.isCreditCardMember === "Y" ? "B" : "D", // B: 同仁,  D: 大樓
    });

    return result.data.body;
  },
};
