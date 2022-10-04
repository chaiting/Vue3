import axios from "axios";
import type {
  callAutoDialReqPayload,
  callAutoDialResPayload,
  doGetEmployeeInfoCardResPayload,
} from "@/core/type/info-card-api";

export default {
  /**
   * 取得行內使用者資訊卡片資訊
   * @param payload 查詢參數
   * @param payload.adAccount AD帳號
   */
  doGetEmployeeInfoCard: async function (payload: {
    adAccount: string;
  }): doGetEmployeeInfoCardResPayload {
    let result = await axios.post("/info_card/01", payload);
    return result.data.body;
  },
  /**
   * 系統撥號
   * @param payload 撥號參數
   * @param payload.cname 人員名稱
   * @param payload.employeeNo 員工編號
   * @param payload.deptPhoneNo 單位電話
   * @param payload.userExtension 撥號參數
   * @param payload.officePhoneext 單位分機
   * @param payload.isCreditCardMember 是否為卡處人員
   */
  callAutoDial: async function (
    payload: callAutoDialReqPayload
  ): callAutoDialResPayload {
    let result = await axios.post("/info_card/02", {
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
