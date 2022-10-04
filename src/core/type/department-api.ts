export interface doQryDeptListReqPayload {
  activatedGrp?: string;
  allSubordinate?: string;
  dataSrc?: string;
  grpUnitcode?: string;
  upGrpIdList?: string[];
}

export interface doQryUpperUnitsReqPayload {
  grpId: string;
  activatedGrp?: string;
}

export type doQryDeptListResPayload = Promise<
  Array<{ grpId: string; grpNm: string }>
>;

export type doQryUpperUnitsResPayload = Promise<
  Array<{
    grpId: string;
    grpNm: string;
    grpSts: string;
    grpUnitcode: string;
  }>
>;
