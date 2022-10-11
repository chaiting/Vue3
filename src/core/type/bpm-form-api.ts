import type { Flag } from "@/core/type/code-api";

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
 * 送單參數
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
 * 起單參數
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
 * 轉移處理權參數
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

interface ProcessRes {
  message: string[];
  statusCode: string;
}

export interface FormReqType {
  actionId?: string; // todo
  formId?: string;
}

export type FormStartResType = Promise<ProcessRes & { bpmFormSeqNo: string }>;

export type FormSendResType = Promise<ProcessRes | undefined>;

export type doCloseProcessResType = Promise<ProcessRes>;

export type doRevokeProcessResType = Promise<ProcessRes>;

export type StageProcessorResType = Promise<
  | (ProcessRes & {
      processorType: string;
      stageProcessors: { processorId: string; processorName: string }[];
    })
  | undefined
>;

type StageAction = {
  stageAction: Array<
    Flag & { cdId: string; cdNm: string; ctId: number; typeNm: string }
  >;
};

export type StageActionResType = Promise<ProcessRes & StageAction>;

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