export type EmpDialInfoResType = Promise<{
  extension?: string;
  isCreditCardMember: string;
  isDialable: string;
}>;

export type CustomerDialList = Array<{
  callStatus: string;
  callStatusNm: string;
  callTime: string;
  calledNumber: string;
  callingNumber: string;
  funcId: string;
  funcNm: string;
  refProckey?: string;
  sysId: string;
  sysNm: string;
  userId: string;
  userNm: string;
  userNo: string;
}>;

export interface SysDialReqType {
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
}

export type DialHistoryListResType = Promise<{
  customerDialList?: CustomerDialList;
  pageNo: number;
  totalCount: number;
}>;
