type PermissionList = Array<{
  confLvCd: string;
  confLvNm: string;
  roleId: string;
  roleNm: string;
  roleTypeCd: string;
  roleTypeNm: string;
  rsrcId: string;
  rsrcMemo: string;
  rsrcNm: string;
  rsrcTypeCd: string;
  rsrcTypeNm: string;
  rsrcUri: string;
}>;

type RoleAttrList = Array<{
  attrKey: string;
  attrMemo: string;
  attrVal: string;
  roleId: string;
  roleNm: string;
  roleTypeCd: string;
  roleTypeNm: string;
}>;

type RoleRsrcAttrList = Array<{
  attrKey: string;
  attrMemo: string;
  attrVal: string;
  confLvCd: string;
  confLvNm: string;
  roleId: string;
  roleNm: string;
  roleTypeCd: string;
  roleTypeNm: string;
  rsrcId: string;
  rsrcMemo: string;
  rsrcNm: string;
  rsrcTypeCd: string;
  rsrcTypeNm: string;
  rsrcUri: string;
}>;

type RsrcAttrList = Array<{
  attrKey: string;
  attrMemo: string;
  attrVal: string;
  confLvCd: string;
  confLvNm: string;
  rsrcId: string;
  rsrcMemo: string;
  rsrcNm: string;
  rsrcTypeCd: string;
  rsrcTypeNm: string;
  rsrcUri: string;
}>;

export type LeftMenuList = Array<{
  iconText: string;
  itemNm: string;
  itemUri: string;
  menuSeqNo: string;
  redirectTypeCd: string;
  redirectTypeNm: string;
  subMenuList: any[];
}>;

type TopMenuList = Array<{
  iconText: string;
  itemNm: string;
  itemUri: string;
  menuSeqNo: string;
  redirectTypeCd: string;
  redirectTypeNm: string;
  subMenuList: any[];
}>;

type UpperGrpList = Array<{
  grpId: string;
  grpNm: string;
  grpSts: string;
  grpUnitcode: string;
}>;

export type Profile = {
  adAccount: string;
  email?: string;
  empName: string;
  empNo?: string;
  grpId: string;
  grpNm: string;
  permissionList?: PermissionList;
  phoneExt?: string;
  positionCd?: string;
  positionNm?: string;
  resources?: string[];
  roleAttrList?: RoleAttrList;
  roleRsrcAttrList?: RoleRsrcAttrList;
  roles?: string[];
  rsrcAttrList?: RsrcAttrList;
  system: {
    sysId: string;
    sysMemo: string;
    sysNm: string;
    url: string;
    leftMenuList: LeftMenuList;
    topMenuList: TopMenuList;
  };
  titleCd?: string;
  titleNm?: string;
  upperGrpList: UpperGrpList;
};

export type doFetchLoginUserProfileResPayload = Promise<Profile>;

export type doFetchOptUserProfileProfileResPayload = Promise<Profile>;

export type doSwitchIdentifyProfileResPayload = Promise<Profile>;
