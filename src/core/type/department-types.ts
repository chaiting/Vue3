/**
 * 查詢組織/群組清單參數
 */
export type DepartmentReqType = {
  // 是否限啟用組織/群組
  activatedGrp?: "Y" | "N";
  // 是否包含所有子單位
  allSubordinate?: "Y" | "N";
  // 組織/群組資料來源
  dataSrc?: string;
  // 單位層級代碼
  grpUnitcode?: string;
  // 上層組織/群組代碼清單
  upGrpIdList?: string[];
};

/**
 * 組織/群組清單
 */
export type DepartmentResType = Promise<
  Array<{
    // 組織/群組代碼
    grpId: string;
    // 組織/群組名稱
    grpNm: string;
  }>
>;

/**
 * 查詢上層組織/群組清單參數
 */
export type DepartmentUnitReqType = {
  // 組織/群組代碼
  grpId: string;
  // 是否限啟用組織/群組
  activatedGrp?: "Y" | "N";
};

/**
 * 上層組織/群組清單
 */
export type DepartmentUnitResType = Promise<
  Array<{
    // 組織/群組代碼
    grpId: string;
    // 組織/群組名稱
    grpNm: string;
    // 組織/群組狀態
    grpSts: string;
    // 組織/群組層級代碼
    grpUnitcode: string;
  }>
>;
