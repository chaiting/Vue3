/**
 * 授權資訊清單
 */
type PermissionList = Array<{
  // 資源等級代碼
  confLvCd: string;
  // 資源等級名稱
  confLvNm: string;
  // 角色代碼
  roleId: string;
  // 角色名稱
  roleNm: string;
  // 角色類別代碼
  roleTypeCd: string;
  // 角色類別名稱
  roleTypeNm: string;
  // 資源代碼
  rsrcId: string;
  // 資源說明
  rsrcMemo: string;
  // 資源名稱
  rsrcNm: string;
  // 資源類別代碼
  rsrcTypeCd: string;
  // 資源類別名稱
  rsrcTypeNm: string;
  // 資源URI
  rsrcUri: string;
}>;

/**
 * 角色屬性清單
 */
type RoleAttrList = Array<{
  // 屬性鍵
  attrKey: string;
  // 屬性說明
  attrMemo: string;
  // 屬性值
  attrVal: string;
  // 角色代碼
  roleId: string;
  // 角色名稱
  roleNm: string;
  // 角色類別代碼
  roleTypeCd: string;
  // 角色類別名稱
  roleTypeNm: string;
}>;

/**
 * 角色資源屬性清單
 */
type RoleRsrcAttrList = RoleAttrList & RsrcAttrList;

/**
 * 角色屬性清單
 */
type RsrcAttrList = Array<{
  // 屬性鍵
  attrKey: string;
  // 屬性說明
  attrMemo: string;
  // 屬性值
  attrVal: string;
  // 資源等級代碼
  confLvCd: string;
  // 資源等級名稱
  confLvNm: string;
  // 資源代碼
  rsrcId: string;
  // 資源說明
  rsrcMemo: string;
  // 資源名稱
  rsrcNm: string;
  // 資源類別代碼
  rsrcTypeCd: string;
  // 資源類別名稱
  rsrcTypeNm: string;
  // 資源URI
  rsrcUri: string;
}>;

/**
 * 選單清單
 */
export type MenuList = Array<{
  // 文字圖示
  iconText: string;
  // 選單名稱
  itemNm: string;
  // 選單URI
  itemUri: string;
  // 選單主鍵
  menuSeqNo: string;
  // 輔導類型代碼
  redirectTypeCd: string;
  // 輔導類型名稱
  redirectTypeNm: string;
  // 子選單清單
  subMenuList: any[];
}>;

/**
 * 上層組織/群組清單(含本身所在群組)
 */
type UpperGrpList = Array<{
  // 組織/群組代碼
  grpId: string;
  // 組織/群組名稱
  grpNm: string;
  // 組織/群組狀態
  grpSts: string;
  // 組織/群組層級代碼
  grpUnitcode: string;
}>;

/**
 * 操作者基本資訊
 */
export type UserProfile = {
  // AD帳號
  adAccount: string;
  // 公司EMAIL
  email?: string;
  // 員工姓名
  empName: string;
  // 員工編號
  empNo?: string;
  // 組織/群組代碼
  grpId: string;
  // 組織/群組名稱
  grpNm: string;
  // 授權資訊清單
  permissionList?: PermissionList;
  // 分機號碼
  phoneExt?: string;
  // 職位代碼
  positionCd?: string;
  // 職位名稱
  positionNm?: string;
  // 資源清單
  resources?: string[];
  // 角色屬性清單
  roleAttrList?: RoleAttrList;
  // 角色資源屬性清單
  roleRsrcAttrList?: RoleRsrcAttrList;
  // 角色清單
  roles?: string[];
  // 資源屬性清單
  rsrcAttrList?: RsrcAttrList;
  // 系統資訊
  system: {
    // 系統代碼
    sysId: string;
    // 系統說明
    sysMemo: string;
    // 系統名稱
    sysNm: string;
    // 系統網址
    url: string;
    // 左側選單清單
    leftMenuList: MenuList;
    // 上方選單清單
    topMenuList: MenuList;
  };
  // 職稱代碼
  titleCd?: string;
  // 職稱名稱
  titleNm?: string;
  // 上層組織/群組清單(含本身所在群組)
  upperGrpList: UpperGrpList;
};

/**
 * 操作者基本資訊
 */
export type UserProfileResType = Promise<UserProfile>;

/**
 * 被代理人切換參數
 */
export interface AgentProfileReqType {
  // AD帳號
  adAccount: string;
}
