export interface DepartmentReqType {
  activatedGrp?: string;
  allSubordinate?: string;
  dataSrc?: string;
  grpUnitcode?: string;
  upGrpIdList?: string[];
}

export type DepartmentResType = Promise<
  Array<{ grpId: string; grpNm: string }>
>;

export interface DepartmentUnitReqType {
  grpId: string;
  activatedGrp?: string;
}

export type DepartmentUnitResType = Promise<
  Array<{
    grpId: string;
    grpNm: string;
    grpSts: string;
    grpUnitcode: string;
  }>
>;
