/**
 * 使用者清單
 */
export type User = {
  accSts?: string;
  adAccount: string;
  empNm: string;
  empNo?: string;
  usedAccount: string;
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
