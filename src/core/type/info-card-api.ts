import type { Nullable } from "@/core/type/utils";

/**
 * 取得行內使用者資訊卡片資訊參數
 */
export interface InfoCardReqType {
  // AD帳號
  adAccount: string;
}

/**
 * 行內使用者資訊卡片資訊
 */
export type EmployeeInfoCardResType = Promise<{
  // 中文姓名
  cname: string;
  // 單位名稱
  deptName: string;
  // 公司電話
  deptPhoneNo?: string;
  // 所屬單位科別代碼
  empDeptSectId: string;
  // 員工編號
  employeeNo: string;
  // 性別
  genderCode?: string;
  // 性別名稱
  genderName?: string;
  // 是否為卡處人員
  isCreditCardMember: "Y" | "N";
  // 是否允許撥號
  isDialable: "Y" | "N";
  // 職務代碼
  jobTitleCode: string;
  // 職務帶名稱
  jobTitleName: string;
  // 公司EMAIL
  officeEmail?: string;
  // 分機
  officePhoneext?: string;
  // 職務代碼
  positionCode?: string;
  // 職務代碼名稱
  positionName?: string;
  // 查詢者分機
  userExtension: Nullable<string>;
}>;

/**
 * 系統撥號參數
 */
export type callAutoDialReqType = {
  // 人員名稱
  cname: string;
  // 員工編號
  employeeNo: string;
  // 單位電話
  deptPhoneNo: string;
  // 撥號參數
  userExtension: Nullable<string>;
  // 單位分機
  officePhoneext: string;
  // 是否為卡處人員
  isCreditCardMember: string;
};
