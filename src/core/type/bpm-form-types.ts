import type { Flag } from "@/core/type/code-types";

/**
 * bpm作業參數
 */
interface FormBaseType {
  // 表單代碼
  formId: string;
  // 流程代碼
  flowCode?: string;
  // 簽核意見
  signComment: string;
  // 寄件資訊
  mail: {
    // 內容
    content?: string;
    // 主旨
    subject?: string;
    // 信件參數(參照content中定義的變數, Ex: ${url})
    mailParams?: {
      [key: string]: string;
    };
  };
}

/**
 * 退回、結案、銷案作業參數
 */
export interface FormSendBackReqType extends FormBaseType {
  // 關卡動作
  actionId?: string;
}

/**
 * 送單作業參數
 */
export interface FormSendReqType extends FormBaseType {
  // 傳送對象
  processorId: string;
  // 傳送對象名稱
  processorName: string;
  // 傳送對象類型
  processorType: string;
}

/**
 * 起單作業參數
 */
export interface ProcessStartReqType extends FormBaseType {
  // 業務別代碼
  businessCode?: string;
  // 顧客ID
  customerId?: string;
  // 表單註記
  formMemo?: string;
  // 表單網址
  formUrl?: string;
  // 傳送對象(員工編號/角色代號)
  processorId: string;
  // 傳送對象名稱(員工姓名/角色名稱)
  processorName: string;
  // 傳送對象類型
  processorType: string;
}

/**
 * 處理權移轉參數
 */
export interface FormTransferReqType {
  // 表單代碼
  formId: string;
  // 新處理人員編
  newProcessorId: string;
  // 簽核意見
  signComment: string;
  // 系統代碼
  sysId?: string;
}

/**
 * BPM作業處理結果
 */
export interface ProcessResType {
  // 回應訊息清單
  message: string[];
  // API回應代碼
  statusCode: string;
}

/**
 * 表單參數
 */
export interface FormReqType {
  // 關卡動作代碼
  actionId?: string;
  // 表單代碼
  formId?: string;
}

/**
 * 起單作業處理結果
 */
export type FormStartResType = Promise<
  ProcessResType & { bpmFormSeqNo: string }
>;

/**
 * 送單、處理權移轉、退回、結案、銷案作業處理結果
 */
export type FormSendResType = Promise<ProcessResType | undefined>;

/**
 * 關卡處理者資料
 */
export type StageProcessorResType = Promise<
  | (ProcessResType & {
      // 傳送對象類型
      processorType: string;
      // 傳送下一關對象名稱(員工姓名/角色名稱)
      stageProcessors: Array<{
        // 傳送下一關對象(員工編號/角色代號)
        processorId: string;
        // 傳送下一關對象名稱(員工姓名/角色名稱)
        processorName: string;
      }>;
    })
  | undefined
>;

/**
 * 關卡動作資訊
 */
type StageActionType = {
  // 表單傳送類型清單
  stageAction: Array<
    Flag & {
      // 明細代碼
      cdId: string;
      // 明細名稱
      cdNm: string;
      // 類別代碼
      ctId: number;
      // 類別名稱
      typeNm: string;
    }
  >;
};

/**
 * 表單傳送類型
 */
export type StageActionResType = Promise<ProcessResType & StageActionType>;

/**
 * BPM FORM資訊
 */
export type FormInfoResType = Promise<{
  // BPM表單主鍵
  bpmFormSeqNo: string;
  // 此表單最新一筆歷史記錄主鍵
  bpmHistorySeqNo: string;
  // 流程代碼
  flowCode: string;
  // FlowStage表單代碼
  flowStageFormCode: string;
  // 表單網址
  formUrl?: string;
  // JBPM表單代碼
  jbpmFormCode: string;
  // JBPM UID單號
  jbpmUid: string;
  // 簽核記錄編號
  seqNo: number;
  // 關卡流程
  stageSeq: number;
  // 表單案件狀態
  status: string;
  // 任務代號
  taskId: number;
  // 流通總關卡數
  totalStage: number;
}>;
