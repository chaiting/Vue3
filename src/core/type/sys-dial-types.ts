/**
 * 行內使用者撥號資訊
 */
export type EmpDialInfoResType = Promise<{
  // 分機
  extension?: string;
  // 是否為信用卡處人員
  isCreditCardMember: "Y" | "N";
  // 是否允許撥號
  isDialable: "Y" | "N";
}>;

/**
 * 撥號紀錄清單
 */
export type CustomerDial = {
  // 撥號狀態
  callStatus: string;
  // 撥號狀態名稱
  callStatusNm: string;
  // 撥號時間
  callTime: string;
  // 受話電話
  calledNumber: string;
  // 發話電話
  callingNumber: string;
  // 來源功能別
  funcId: string;
  // 來源功能名稱
  funcNm: string;
  // 專案鍵值
  refProckey?: string;
  // 來源系統別
  sysId: string;
  // 系統名稱
  sysNm: string;
  // 發話人員
  userId: string;
  // 發話人員姓名
  userNm: string;
  // 發話人員編號
  userNo: string;
};

/**
 * 系統撥號參數
 */
export interface SysDialReqType {
  // 受話者鍵值
  calledId?: string;
  // 受話者名稱
  calledInfo?: string;
  // 受話號碼
  calledNumber: string;
  // 受話電話來源
  calledNumberSrcField: string;
  // 受話對象類別
  calledObjType: string;
  // 發話號碼
  callingNumber: string;
  // 通話原因類型
  reasonCd: string;
  // 功能代碼
  srcFuncCode?: string;
  // 功能名稱
  srcFuncName?: string;
  // 業務鍵值
  refProcKey?: string;
  // 業務鍵值
  reasonDesc?: string;
}

/**
 * 顧客撥號紀錄清單
 */
export type DialHistoryListResType = Promise<{
  // 撥號紀錄清單
  customerDialList?: CustomerDial[];
  // 實際頁次
  pageNo: number;
  // 資料總筆數
  totalCount: number;
}>;
