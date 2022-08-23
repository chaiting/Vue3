<template>
  <div>
    <Row type="flex" justify="center" align="middle">
      <Col :span="dialBtnSpan">
        <Button
          v-if="dialable"
          icon="ios-call"
          type="primary"
          @click="dialComfirm = true"
        ></Button>
      </Col>
      <Col :span="msgSpan"> {{ dialInfo }}：{{ phoneInfo }} </Col>
    </Row>

    <!-- 撥號確認視窗 -->
    <Modal
      v-model="dialComfirm"
      title="系統撥號"
      class="esun-modal"
      width="50vh"
    >
      <Row>
        <Col span="15">
          顧客名稱：
          <Tooltip
            max-width="200"
            :content="customerName"
            placement="top"
            transfer
          >
            <span>{{ customerInfo }}</span>
          </Tooltip>
        </Col>
        <Col span="9">顧客ID：{{ customerId }} </Col>
      </Row>
      <Row>
        <Col span="15">
          <div>撥號號碼： {{ dialInfo + calledNumber }}</div>
        </Col>
        <Col span="9" v-if="businessId">業務編號：{{ businessId }} </Col>
      </Row>
      <Form
        ref="callingReasonRef"
        class="esun-form margin-form"
        :label-width="120"
        :model="callingReason"
        :rules="validateRule"
      >
        <FormItem label="通話原因類型" prop="reasonCd">
          <sys-cd-select
            :ctId="318"
            v-model:value="callingReason.reasonCd"
            flag01="Y"
            placeholder="請選擇類型"
            suspend="N"
          ></sys-cd-select>
        </FormItem>
        <FormItem label="通話原因備註" prop="reasonDesc">
          <Input
            v-model="callingReason.reasonDesc"
            type="textarea"
            placeholder="內文補充說明..."
            maxlength="100"
            :autosize="{ minRows: 2, maxRows: 5 }"
            :show-word-limit="true"
          ></Input>
        </FormItem>
      </Form>
      <template #footer>
        <Button type="text" @click="dialComfirm = false"> 取消 </Button>
        <Button type="primary" @click="doAutoCall"> 確定 </Button>
      </template>
    </Modal>

    <!-- 撥號提示 -->
    <esun-alert
      v-model:value="dialAlert"
      :title="dialAlertTitle"
      :content="dialAlertContent"
    ></esun-alert>

    <!-- 系統撥號顯示 -->
    <esun-alert v-model:value="dialingAlert" title="通知">
      <div>系統撥號中...</div>
      <div style="font-weight: bold; margin-top: 5px">請拿起話筒進行通話</div>
    </esun-alert>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import isBlank from "is-blank";
import codeApi from "@/core/api/code-api";
import sysDialApi from "@/core/api/sys-dial-api";
import { computed } from "vue";
import { truncate } from "lodash-es";
import type { FormRef } from "@/core/type/common";

const props = defineProps({
  // 發話號碼
  callingNumber: {
    type: String,
    required: true,
  },
  // 是否允許撥號
  isDialable: {
    type: Boolean,
    required: true,
    default: false,
  },
  // 顧客ID
  customerId: {
    type: String,
    required: true,
  },
  // 受話電話來源, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=16
  telType: {
    type: String,
    required: true,
  },
  // 受話號碼
  calledNumber: {
    type: String,
    required: false,
  },
  // 顧客姓名
  customerName: {
    type: String,
    required: false,
  },
  // 顧客性別, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=159
  customerSex: {
    type: String,
    required: false,
  },
  // 功能代碼
  srcFuncCode: {
    type: String,
    required: true,
  },
  // 功能代碼名稱
  srcFuncName: {
    type: String,
    required: true,
  },
  // 業務編號
  businessId: {
    type: String,
    required: false,
  },
  // 通話原因類型, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=318
  reasonCd: {
    type: String,
    required: false,
    default: "01", // 01: 業務執行
  },
  // 按鈕的佔位格數，可選總計0〜24的整數，為0時，相當於display:none
  dialBtnSpan: {
    type: Number,
    required: false,
    default: 3,
  },
  // 文字訊息的佔位格數，可選總計0〜24的整數，為0時，相當於display:none
  msgSpan: {
    type: Number,
    required: false,
    default: 21,
  },
});

const callingReasonRef = ref<FormRef>();
// 撥號提示顯示
const dialAlert = ref(false);
// 撥號提示標題
const dialAlertTitle = ref("");
// 撥號提示內容
const dialAlertContent = ref("");
// 系統撥號顯示
const dialingAlert = ref(false);
// 系統撥號確認
const dialComfirm = ref(false);
// 顧客性別名稱
const sexName = ref("");
// 受話電話來源名稱
const phoneTypeName = ref("");
// 通話原因表單
const callingReason = reactive({
  reasonCd: "",
  reasonDesc: "",
});
// 通話原因表單驗證
const validateRule = reactive({
  reasonCd: [
    {
      required: true,
      message: "通話原因類型為必填欄位",
      trigger: "change",
    },
  ],
});

/**
 * 受話號碼資訊
 */
const dialInfo = computed(() => {
  return phoneTypeName.value + "(" + props.telType + ") ";
});
/**
 * 受話電話號碼
 */
const phoneInfo = computed(() => {
  return isBlank(props.calledNumber) ? "－" : props.calledNumber;
});
/**
 * 顧客短名稱
 */
const shortNm = computed(() => {
  return truncate(props.customerName, { length: 20, separator: " " });
});
/**
 * 顧客性別名稱
 */
const sexInfo = computed(() => {
  return isBlank(sexName.value) ? "" : "(" + sexName.value + ")";
});
/**
 * 顧客資訊
 */
const customerInfo = computed(() => {
  return shortNm.value + sexInfo.value;
});
/**
 * 允許撥號
 */
const dialable = computed(() => {
  return props.isDialable && !isBlank(props.calledNumber);
});

/**
 * 系統撥號
 */
async function doAutoCall() {
  if (isBlank(props.callingNumber) || props.callingNumber === "****") {
    dialAlertTitle.value = "尚未登錄分機";
    dialAlertContent.value = "請至EPSP支付服務整合系統首頁進行指定分機編輯";
    dialAlert.value = true;
    return;
  }

  callingReasonRef.value!.validate(async (valid) => {
    if (valid) {
      await sysDialApi.doSystemCall({
        callingNumber: props.callingNumber,
        calledNumber: props.calledNumber,
        calledId: props.customerId,
        calledInfo: props.customerName,
        calledNumberSrcField: props.telType,
        calledObjType: "A", // A: 顧客
        srcFuncCode: props.srcFuncCode,
        srcFuncName: props.srcFuncName,
        refProcKey: props.businessId,
        reasonCd: callingReason.reasonCd,
        reasonDesc: callingReason.reasonDesc,
      });

      dialComfirm.value = false;
      dialingAlert.value = true;
      setTimeout(() => {
        dialingAlert.value = false;
      }, 3000);
    }
  });
}

/**
 * 監聽顧客性別
 */

watch(
  () => props.customerSex,
  async () => {
    if (!isBlank(props.customerSex)) {
      sexName.value = await codeApi.doGetCodeName(
        "159",
        props.customerSex as string
      );
    }
  },
  { immediate: true }
);

/**
 * 監聽受話電話來源
 */
watch(
  () => props.telType,
  async () => {
    if (!isBlank(props.telType)) {
      phoneTypeName.value = await codeApi.doGetCodeName("16", props.telType);
    }
  },
  { immediate: true }
);

onMounted(() => {
  callingReason.reasonCd = props.reasonCd;
});
</script>

<style lang="scss" scoped>
.margin-form {
  margin-top: 15px;
}
</style>
