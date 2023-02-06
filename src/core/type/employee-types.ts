/**
 * 使用者清單
 */
export type User = {
  // 在職狀態碼
  accSts?: string;
  // AD帳號
  adAccount: string;
  // 員工姓名
  empNm: string;
  // 員工編號
  empNo?: string;
  // 帳號
  usedAccount: string;
  // 在職狀態
  hireSts: "hired" | "left" | "";
};

/**
 * 查詢使用者清單參數
 */
export type EmployeeReqType = {
  // 是否包含單位層級(含子單位)以下所有人
  allSubordinate?: "Y" | "N";
  // 組織/群組代碼清單
  grpIdList?: string[];
  // 是否限在職人員(Y|N)
  isHiredOnly?: "Y" | "N";
  // value類型, A: AD帳號、E: 員工編號
  valueType?: "A" | "E";
};

/**
 * 使用者清單
 */
export type EmployeeResType = Promise<User[]>;
