export type UserList = Array<{
  accSts?: string;
  adAccount: string;
  empNm: string;
  empNo?: string;
  usedAccount: string;
  hireSts: "hired" | "left" | "";
}>;

export interface EmployeeReqType {
  allSubordinate?: string;
  grpIdList?: string[];
  isHiredOnly?: string;
  valueType?: string;
}

export type EmployeeResType = Promise<UserList>;
