import axios from "axios";

/**
 * bpm作業參數
 */
interface ProcessPayload {
  flowCode?: string;
  formId?: string;
  mail?: {
    content?: string;
    mailParams?: {
      additionalProp1?: string;
      additionalProp2?: string;
      additionalProp3?: string;
    };
    subject?: string;
  };
  signComment?: string;
}

/**
 * 退回、結案、銷案作業參數
 */
interface ActionProcessPayload extends ProcessPayload {
  actionId?: string;
}

/**
 * 送單參數
 */
interface SendProcessPayload extends ProcessPayload {
  processorId?: string;
  processorName?: string;
  processorType?: string;
  signComment?: string;
}

/**
 * 起單參數
 */
interface StartProcessPayload extends ProcessPayload {
  businessCode?: string;
  customerId?: string;
  formMemo?: string;
  formUrl?: string;
}

/**
 * 轉移處理權參數
 */
interface TransferProcessPayload {
  formId?: string;
  newProcessorId?: string;
  signComment?: string;
  sysId?: string;
}

export default {
  /**
   * 起單作業
   * @param flowCode 流程代碼
   * @param payload 起單參數
   */
  doStartProcess: async function (
    flowCode: string,
    payload: StartProcessPayload
  ) {
    let result = await axios.post(
      "/bpm_form/do_start_process/" + flowCode,
      payload
    );
    return result.data.body;
  },
  /**
   * 送單作業
   * @param payload 送單參數
   */
  doSendProcess: async function (payload: SendProcessPayload) {
    let result = await axios.post("/bpm_form/do_send_process", payload);
    return result.data.body;
  },
  /**
   * 處理權移轉作業
   * @param payload 處理權移轉參數
   */
  doTransferProcess: async function (payload: TransferProcessPayload) {
    let result = await axios.post("/bpm_form/do_transfer_process", payload);
    return result.data.body;
  },
  /**
   * 退回作業
   * @param payload 退回作業參數
   */
  doSendBack: async function (payload: ActionProcessPayload) {
    // 4: 退回前一關
    if (payload.actionId === "4") {
      let result = await axios.post("/bpm_form/do_send_to_previous", payload);
      return result.data.body;
    }

    // 7: 退回填表人
    if (payload.actionId === "7") {
      let result = await axios.post("/bpm_form/do_send_to_first", payload);
      return result.data.body;
    }
  },
  /**
   * 結案作業
   * @param payload 結案參數
   */
  doCloseProcess: async function (payload: ActionProcessPayload) {
    let result = await axios.post("/bpm_form/do_close_process", payload);
    return result.data.body;
  },
  /**
   * 銷案作業
   * @param payload 銷案參數
   */
  doRevokeProcess: async function (payload: ActionProcessPayload) {
    let result = await axios.post("/bpm_form/do_revoke_process", payload);
    return result.data.body;
  },
  /**
   * 取得關卡處理者資料
   * @param flowCode 流程代碼
   * @param payload 關卡參數
   */
  doQryStageProcessor: async function (
    flowCode: string,
    payload: { actionId: string; formId?: string }
  ) {
    // Started: 起單、1: 傳送
    if (payload.actionId === "Started" || payload.actionId === "1") {
      // 取得下一關卡處理者資料
      let result = await axios.post(
        "/bpm_form/do_qry_next_stage_processor/" + flowCode,
        payload
      );

      return result.data.body;
    }

    // delegate: 處理權移轉
    if (payload.actionId === "delegate") {
      // 取得處理權移轉傳送對象
      let result = await axios.post(
        "/bpm_form/do_qry_transfer_processor",
        payload
      );

      return result.data.body;
    }
  },
  /**
   * 取得送單傳送類型
   * @param payload 業務單號
   */
  doQryNextStageAction: async function (payload: { formId?: string }) {
    let result = await axios.post(
      "/bpm_form/do_qry_next_stage_action",
      payload
    );

    return result.data.body;
  },
  /**
   * 取得BPM FORM資訊
   * @param {*} payload 表單代碼
   */
  doGetBpmForm: async function (payload: { formId?: string }) {
    let result = await axios.post("/bpm_form/do_get_bpm_form", payload);
    return result.data.body;
  },
};
