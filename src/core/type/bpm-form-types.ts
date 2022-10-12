import type { Flag } from "@/core/type/code-types";

/**
 * bpm作業參數
 */
interface FormBase {
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
export interface FormSendBackReqType extends FormBase {
  // 關卡動作
  actionId?: string;
}

/**
 * 送單作業參數
 */
export interface FormSendReqType extends FormBase {
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
export interface ProcessStartReqType extends FormBase {
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
interface ProcessRes {
  message: string[];
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
export type FormStartResType = Promise<ProcessRes & { bpmFormSeqNo: string }>;

/**
 * 送單、處理權移轉、退回、結案、銷案作業處理結果
 */
export type FormSendResType = Promise<ProcessRes | undefined>;

/**
 * 關卡處理者資料
 */
export type StageProcessorResType = Promise<
  | (ProcessRes & {
      processorType: string;
      stageProcessors: Array<{ processorId: string; processorName: string }>;
    })
  | undefined
>;

/**
 * 關卡動作資訊
 */
type StageAction = {
  stageAction: Array<
    Flag & { cdId: string; cdNm: string; ctId: number; typeNm: string }
  >;
};

/**
 * 表單傳送類型
 */
export type StageActionResType = Promise<ProcessRes & StageAction>;

/**
 * BPM FORM資訊
 */
export type FormInfoResType = Promise<{
  bpmFormSeqNo: string;
  bpmHistorySeqNo: string;
  flowCode: string;
  flowStageFormCode: string;
  formUrl?: string;
  jbpmFormCode: string;
  jbpmUid: string;
  seqNo: number;
  stageSeq: number;
  status: string;
  taskId: number;
  totalStage: number;
}>;
