import axios from "axios";
import type {
  ProcessStartReqType,
  FormStartResType,
  FormSendReqType,
  FormSendResType,
  FormTransferReqType,
  FormSendBackReqType,
  StageProcessorResType,
  FormReqType,
  StageActionResType,
  FormInfoResType,
} from "@/core/type/bpm-form-api";

export default {
  /**
   * 起單作業
   * @param flowCode 流程代碼
   * @param payload 起單作業參數
   */
  doStartProcess: async function (
    flowCode: string,
    payload: ProcessStartReqType
  ): FormStartResType {
    let result = await axios.post(
      "/bpm_form/do_start_process/" + flowCode,
      payload
    );
    return result.data.body;
  },
  /**
   * 送單作業
   * @param payload 送單作業參數
   */
  doSendProcess: async function (payload: FormSendReqType): FormSendResType {
    let result = await axios.post("/bpm_form/do_send_process", payload);
    return result.data.body;
  },
  /**
   * 處理權移轉作業
   * @param payload 處理權移轉參數
   */
  doTransferProcess: async function (
    payload: FormTransferReqType
  ): FormSendResType {
    let result = await axios.post("/bpm_form/do_transfer_process", payload);
    return result.data.body;
  },
  /**
   * 退回作業
   * @param payload 退回作業參數
   */
  doSendBack: async function (payload: FormSendBackReqType): FormSendResType {
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
  doCloseProcess: async function (
    payload: FormSendBackReqType
  ): FormSendResType {
    let result = await axios.post("/bpm_form/do_close_process", payload);
    return result.data.body;
  },
  /**
   * 銷案作業
   * @param payload 銷案參數
   */
  doRevokeProcess: async function (
    payload: FormSendBackReqType
  ): FormSendResType {
    let result = await axios.post("/bpm_form/do_revoke_process", payload);
    return result.data.body;
  },
  /**
   * 取得關卡處理者資料
   * @param flowCode 流程代碼
   * @param payload 查詢參數
   */
  doQryStageProcessor: async function (
    flowCode: string,
    payload: FormReqType
  ): StageProcessorResType {
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
   * 取得表單傳送類型
   * @param payload 表單參數
   */
  doQryNextStageAction: async function (
    payload: FormReqType
  ): StageActionResType {
    let result = await axios.post(
      "/bpm_form/do_qry_next_stage_action",
      payload
    );

    return result.data.body;
  },
  /**
   * 取得BPM FORM資訊
   * @param payload 查詢參數
   */
  doGetBpmForm: async function (payload: FormReqType): FormInfoResType {
    let result = await axios.post("/bpm_form/do_get_bpm_form", payload);
    return result.data.body;
  },
};
