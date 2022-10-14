<template>
  <div>
    <div v-if="!formId">
      <Button
        type="primary"
        class="process-btn"
        @click="doNotifyPreprocess('Started')"
      >
        傳送
      </Button>
    </div>
    <div v-if="formId">
      <Button
        v-for="stage in stageActionList"
        :value="stage.cdId"
        :key="stage.cdId"
        :type="doGetButtonType(stage.cdId)"
        :class="doGetButtonClass(stage.cdId)"
        @click="doNotifyPreprocess(stage.cdId)"
      >
        {{ stage.cdNm }}
      </Button>
    </div>

    <Modal
      v-model="isShowStageUser"
      title="流程關卡"
      width="40"
      :closable="false"
      :mask-closable="false"
    >
      <Form
        ref="stageUserFormRef"
        label-position="left"
        :model="stageUserForm"
        :rules="sendFormValidate"
        :label-width="150"
      >
        <Row>
          <Col span="24">
            <FormItem label="處理者：" prop="processorId">
              <Select
                v-model="stageUserForm.processorId"
                filterable
                remote
                @on-change="doUpdSigner"
              >
                <Option
                  v-for="user in stageProcessors"
                  :value="user.processorId"
                  :key="user.processorId"
                >
                  {{ user.processorName }}({{ user.processorId }})
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="簽核意見：" prop="signComment">
              <Input
                v-model="stageUserForm.signComment"
                type="textarea"
                :maxlength="1000"
                :rows="3"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <template #footer>
        <Button class="modal-btn" type="info" @click="doCancel">取消</Button>
        <Button
          class="modal-btn"
          type="primary"
          @click="doFormSubmit('stageUserForm')"
          >確定</Button
        >
      </template>
    </Modal>

    <Modal
      v-model="isShowSignModal"
      title="簽核關卡"
      width="40"
      :closable="false"
      :mask-closable="false"
    >
      <Form
        ref="signFormRef"
        label-position="left"
        :model="signForm"
        :rules="signFormValidate"
        :label-width="150"
      >
        <Row>
          <Col span="24">
            <FormItem label="簽核意見：" prop="signComment">
              <Input
                v-model="signForm.signComment"
                type="textarea"
                :maxlength="1000"
                :rows="3"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <template #footer>
        <Button class="modal-btn" type="info" @click="doCancel">取消</Button>
        <Button
          class="modal-btn"
          type="primary"
          @click="doFormSubmit('signForm')"
          >確定</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type { FormRef, Validator } from "@/core/type/form";
import { computed, reactive, watch, ref, onMounted } from "vue";
import bpmFormApi from "@/core/api/bpm-form-api";
import { find } from "lodash-es";
import isBlank from "is-blank";
/**
 * 1. BpmSubmitter props
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | 屬性                 說明                                           類型                     是否為必填(M|O)               默認值
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | fireOpenCounter      開啟BPM視窗次數計數器                           Number                   M                            0
 *    | fireSubmitCounter    BPM表單送出次數計數器                           Number                   M                            0
 *    | formId               業務單號                                       String                   O(BPM表單送出時需要)          -
 *    | flowCode             流程代碼                                       String                   O(起單、取得關卡處理者時需要)  -
 *    | businessCode         業務別代碼-起單時需要                           String                   O(起單時需要)                 -
 *    | formUrl              業務表單網址-寄email需要                        String                   M                            -
 *    | subject              主旨-寄email需要                               String                   O(BPM發信時需要)              -
 *    | content              內容-寄email需要                               String                   O(BPM發信時需要)              -
 *    | mailParams           信件參數-寄email需要                           Object                   M(BPM發信時需要)              -
 *    | customerId           顧客ID                                         String                   O(起單時需要)                 -
 *    | formMemo             表單註記                                       String                   O(起單時需要)                 -
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *
 * 2. BpmSubmitter events
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | 事件名                說明                                                                   返回值
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 *    | on-open-preprocess          點擊BPM按鈕時觸發(如傳送、退回、處理權移轉等)                              actionId: 關卡動作代碼
 *    | on-submit-preprocess        BPM表單即將送出時觸發                                                    actionId: 關卡動作代碼
 *    | on-start-preprocess         起單前觸發事件                                                           -
 *    | on-send-preprocess          傳送前觸發事件                                                           -
 *    | on-revoke-preprocess        銷案前觸發事件                                                           -
 *    | on-close-preprocess         結案前觸發事件                                                           -
 *    | on-return-preprocess        退回上一關前觸發事件                                                      -
 *    | on-return-orgin-preprocess  退回填表人前觸發事件                                                      -
 *    | on-delegate-preprocess      處理權移轉前觸發事件                                                      -
 *    | on-signer-change            變動簽核者異動時觸發                                                     {
 *    |                                                                                                       processorType: 處理者類型,
 *    |                                                                                                       processorId: 處理者ID,
 *    |                                                                                                       processorName: 處理者名稱
 *    |                                                                                                    }
 *    | on-start-complete           起單作業完成時觸發                                                       {
 *    |                                                                                                       bpmFormSeqNo: BPM表單主鍵,
 *    |                                                                                                       message: API回應訊息,
 *    |                                                                                                       statusCode: API回應代碼
 *    |                                                                                                    }
 *    | on-operate-complete         傳送作業完成時觸發                                                       {
 *    |                                                                                                       message: API回應訊息,
 *    |                                                                                                       statusCode: API回應代碼
 *    |                                                                                                    }
 *    | on-returned                 退回作業完成時觸發                                                       {
 *    |                                                                                                       message: API回應訊息,
 *    |                                                                                                       statusCode: API回應代碼
 *    |                                                                                                    }
 *    | on-revoked                  銷案作業完成時觸發                                                       {
 *    |                                                                                                       message: API回應訊息,
 *    |                                                                                                       statusCode: API回應代碼
 *    |                                                                                                    }
 *    | on-closed                   結案作業完成時觸發                                                       {
 *    |                                                                                                       message: API回應訊息,
 *    |                                                                                                       statusCode: API回應代碼
 *    |                                                                                                    }
 *    | on-cancel                   點擊簽核視窗的取消按鈕時觸發                                              -
 *    |----------------------------------------------------------------------------------------------------------------------------------|
 */
const emit = defineEmits([
  "on-open-preprocess",
  "on-signer-change",
  "on-submit-preprocess",
  "on-start-preprocess",
  "on-start-complete",
  "on-send-preprocess",
  "on-revoke-preprocess",
  "on-close-preprocess",
  "on-operate-complete",
  "on-returned",
  "on-revoked",
  "on-closed",
  "on-cancel",
  "on-return-preprocess",
  "on-return-orgin-preprocess",
  "on-delegate-preprocess",
]);

const props = defineProps({
  // 開啟BPM視窗次數計數器
  fireOpenCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  // BPM表單送出次數計數器
  fireSubmitCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  // 業務單號
  formId: {
    type: String,
    required: false,
  },
  // 流程代碼
  flowCode: {
    type: String,
    required: false,
    default: "",
  },
  // 業務別代碼(起單時需要)
  businessCode: {
    type: String,
    required: false,
  },
  // 業務表單網址(寄email需要)
  formUrl: {
    type: String,
    required: true,
  },
  // 主旨-寄email需要
  subject: {
    type: String,
    required: false,
  },
  // 內容-寄email需要
  content: {
    type: String,
    required: false,
  },
  // 信件參數-寄email需要
  mailParams: {
    type: Object,
    required: true,
  },
  // 顧客ID
  customerId: {
    type: String,
    required: false,
  },
  // 表單註記
  formMemo: {
    type: String,
    required: false,
  },
});

/**
 * 簽核意見檢核
 */
const verifySignComment: Validator<string> = (rule, value, callback) => {
  if (isBlank(value)) {
    return callback(new Error("請輸入簽核意見並且不可僅填入空白"));
  }
  return callback();
};

const stageUserFormRef = ref<FormRef>();
const signFormRef = ref<FormRef>();

// 關卡動作代碼, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=167
const actionId = ref("");
// 關卡人員列表
const stageProcessors = ref<{ processorId: string; processorName: string }[]>(
  []
);
// 關卡人員表單
const stageUserForm = reactive({
  processorId: "",
  processorName: "",
  processorType: "",
  signComment: "",
});
// 傳送的表單驗證
const sendFormValidate = reactive({
  processorId: [
    {
      required: true,
      message: "請選擇處理者",
      trigger: "change",
    },
  ],
  signComment: [
    {
      required: true,
      validator: verifySignComment,
      trigger: "blur",
    },
  ],
});
// 是否顯示處理者視窗
const isShowStageUser = ref(false);
// 簽核的表單驗證
const signFormValidate = reactive({
  signComment: [
    {
      required: true,
      message: "請填寫簽核意見",
      trigger: "blur",
    },
  ],
});
// 關卡動作代碼清單
const stageActionList = ref<{ cdId: string; cdNm: string }[]>([]);
// 是否顯示簽核視窗
const isShowSignModal = ref(false);
// 關卡簽核表單
const signForm = reactive({ signComment: "" });

// 預設簽核意見
const defaultComment = computed(() => {
  return new Map([
    ["2", "銷案"], // 2: 銷案
    ["3", "結案"], // 3: 結案
  ]).get(actionId.value);
});

/**
 * 取得關卡傳送類型
 */
async function doQryNextStageAction() {
  if (props.formId) {
    const result = await bpmFormApi.doQryNextStageAction({
      formId: props.formId,
    });
    stageActionList.value = result.stageAction;
  }
}
/**
 * 傳送預處理事件(如表單驗證)、動作代碼給父元件
 */
function doNotifyPreprocess(val: string) {
  actionId.value = val;
  emit("on-open-preprocess", val);
}

/**
 * 取得關卡處理者資料
 */
async function doQryStageProcessor() {
  const result = await bpmFormApi.doQryStageProcessor(props.flowCode, {
    actionId: actionId.value,
    formId: props.formId,
  });

  stageUserForm.processorType = result!.processorType;
  stageProcessors.value = result!.stageProcessors;
  isShowStageUser.value = true;
}

/**
 * 表單驗證，並將簽核視窗關閉，及發出BPM表單即將送出的事件
 */
function doFormSubmit(refName: string) {
  let target = null;
  if (refName === "stageUserForm") {
    target = stageUserFormRef.value;
  }
  if (refName === "signForm") {
    target = signFormRef.value;
  }
  target!.validate((valid: boolean) => {
    if (valid) {
      isShowStageUser.value = false;
      isShowSignModal.value = false;
      doEmitPreprocessEvent();
    }
  });
}

/**
 * 傳送簽核者異動事件，並將簽核者ID、簽核者名稱給父元件
 */
function doUpdSigner(processorId: string) {
  if (stageUserForm.processorId) {
    const processorName = find(stageProcessors.value, {
      processorId: stageUserForm.processorId,
    })!.processorName;

    stageUserForm.processorName = processorName;

    emit("on-signer-change", processorId, {
      processorType: stageUserForm.processorType,
      processorId: processorId,
      processorName: processorName,
    });
  }
}

/**
 * 傳送前置作業處理事件
 */
function doEmitPreprocessEvent() {
  emit("on-submit-preprocess", actionId.value);
  type EmitEvent = Parameters<typeof emit>;

  const stage: EmitEvent[number] = new Map([
    ["Started", "on-start-preprocess"], // Started: 起單
    ["1", "on-send-preprocess"], // 1: 傳送
    ["2", "on-revoke-preprocess"], // 2: 銷案
    ["3", "on-close-preprocess"], // 3: 結案
    ["4", "on-return-preprocess"], // 4: 退回
    ["7", "on-return-orgin-preprocess"], // 7: 退回填表人
    ["delegate", "on-delegate-preprocess"], // delegate: 處理權移轉
  ]).get(actionId.value);

  emit(stage);
}

/**
 * 起單作業，並將api執行結果傳給父元件
 */
async function doStartProcess() {
  const basicData = doBuildProcBasicData(stageUserForm.signComment);
  const payload = {
    ...basicData,
    businessCode: props.businessCode,
    customerId: props.customerId,
    formMemo: props.formMemo,
    processorId: stageUserForm.processorId,
    processorName: stageUserForm.processorName,
    processorType: stageUserForm.processorType,
  };

  const result = await bpmFormApi.doStartProcess(props.flowCode, payload);
  const returnData: any = doBuildReturnBasicData(result);

  returnData.bpmFormSeqNo = result.bpmFormSeqNo;

  isShowStageUser.value = false;
  stageUserFormRef.value!.resetFields();

  emit("on-start-complete", returnData);
}

/**
 * 送單作業，並將api執行果傳給父元件
 */
async function doSendProcess() {
  const payload: any = doBuildProcBasicData(stageUserForm.signComment);
  payload.processorType = stageUserForm.processorType;
  payload.processorId = stageUserForm.processorId;
  payload.processorName = stageUserForm.processorName;

  const result = await bpmFormApi.doSendProcess(payload);

  isShowStageUser.value = false;
  stageUserFormRef.value!.resetFields();
  emit("on-operate-complete", doBuildReturnBasicData(result));
}

/**
 * 處理權移轉作業，並將api執行結果傳給父元件
 */
async function doTransferProcess() {
  const result = await bpmFormApi.doTransferProcess({
    formId: props.formId!,
    newProcessorId: stageUserForm.processorId,
    signComment: stageUserForm.signComment,
  });

  isShowStageUser.value = false;
  stageUserFormRef.value!.resetFields();
  emit("on-operate-complete", doBuildReturnBasicData(result));
}

/**
 * 退回作業，並將api執行結果傳給父元件
 */
async function doSendBack() {
  const payload = doBuildProcBasicData(signForm.signComment);
  const result = await bpmFormApi.doSendBack(payload);

  isShowSignModal.value = false;
  signFormRef.value!.resetFields();

  emit("on-returned", doBuildReturnBasicData(result));
}

/**
 * 銷案作業，並將api執行結果傳給父元件
 */
async function doRevokeProcess() {
  const payload = doBuildProcBasicData(signForm.signComment);
  const result = await bpmFormApi.doRevokeProcess(payload);

  isShowSignModal.value = false;
  signFormRef.value!.resetFields();

  emit("on-revoked", doBuildReturnBasicData(result));
}

/**
 * 結案作業，並將api執行結果傳給父元件
 */
async function doCloseProcess() {
  const payload = doBuildProcBasicData(signForm.signComment);
  const result = await bpmFormApi.doCloseProcess(payload);

  isShowSignModal.value = false;
  signFormRef.value!.resetFields();

  emit("on-closed", doBuildReturnBasicData(result));
}

/**
 * 傳送取消傳送事件給父元件，並關閉簽核視窗及資料清空
 */
function doCancel() {
  stageUserFormRef.value!.resetFields();
  signFormRef.value!.resetFields();
  isShowStageUser.value = false;
  isShowSignModal.value = false;
  actionId.value = "";
  emit("on-cancel");
}

/**
 * 設定BPM按鈕類型
 */
function doGetButtonType(value: string) {
  // Started: 起單、1: 傳送
  if (value === "Started" || value === "1") {
    return "primary";
  }

  // 4: 退回前一關、7: 退回填表人
  if (value === "4" || value === "7") {
    return "warning";
  }

  // delegate: 處理權移轉、2: 銷案、3: 結案
  if (value === "delegate" || value === "2" || value === "3") {
    return "error";
  }

  return "info";
}

/**
 * 設定BPM按鈕class
 */
function doGetButtonClass(value: string) {
  // 8: 傳送(其他主管同仁)
  return value === "8" ? "process-wide-btn" : "process-btn";
}

/**
 * 組建流程所需基本欄位資料
 */
function doBuildProcBasicData(signComment: string) {
  return {
    formId: props.formId!,
    signComment: signComment,
    actionId: actionId.value,
    formUrl: props.formUrl,
    mail: {
      subject: props.subject,
      content: props.content,
      mailParams: props.mailParams,
    },
  };
}

/**
 * 組建流程執行結果資料
 */
function doBuildReturnBasicData(result: any) {
  return {
    message: result.message,
    statusCode: result.statusCode,
  };
}

watch(
  () => props.fireOpenCounter,
  () => {
    // Started: 起單、delegate: 處理權移轉、1: 傳送
    if (
      actionId.value === "Started" ||
      actionId.value === "delegate" ||
      actionId.value === "1"
    ) {
      stageUserForm.signComment = defaultComment.value!;
      doQryStageProcessor();
      return;
    }

    // 顯示簽核視窗
    signForm.signComment = defaultComment.value!;
    isShowSignModal.value = true;
  }
);

watch(
  () => props.fireSubmitCounter,
  () => {
    // Started: 起單
    if (actionId.value === "Started") {
      doStartProcess();
      return;
    }

    // delegate: 處理權移轉
    if (actionId.value === "delegate") {
      doTransferProcess();
      return;
    }

    // 1: 傳送
    if (actionId.value === "1") {
      doSendProcess();
      return;
    }

    // 2: 銷案
    if (actionId.value === "2") {
      doRevokeProcess();
      return;
    }

    // 3: 結案
    if (actionId.value === "3") {
      doCloseProcess();
      return;
    }

    // 4: 退回前一關、7: 退回填表人
    if (actionId.value === "4" || actionId.value === "7") {
      doSendBack();
      return;
    }
  }
);

onMounted(() => {
  doQryNextStageAction();
});
</script>

<style lang="scss" scoped>
.process-btn {
  margin-left: 10px;
  width: 120px;
}
.process-wide-btn {
  margin-left: 10px;
  width: 200px;
}
.ivu-modal-footer .modal-btn {
  width: 120px;
}
</style>
