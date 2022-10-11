import type { Nullable } from "@/core/type/utils";

export interface InfoCardReqType {
  adAccount: string;
}

export type EmployeeInfoCardResType = Promise<{
  cname: string;
  deptName: string;
  deptPhoneNo?: string;
  empDeptSectId: string;
  employeeNo: string;
  genderCode?: string;
  genderName?: string;
  isCreditCardMember: string;
  isDialable: string;
  jobTitleCode: string;
  jobTitleName: string;
  officeEmail?: string;
  officePhoneext?: string;
  positionCode?: string;
  positionName?: string;
  userExtension: Nullable<string>;
}>;

export type callAutoDialReqType = {
  cname: string;
  employeeNo: string;
  deptPhoneNo: string;
  userExtension: Nullable<string>;
  officePhoneext: string;
  isCreditCardMember: string;
};
