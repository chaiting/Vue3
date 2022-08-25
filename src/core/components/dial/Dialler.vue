<template>
  <div>
    <Form ref="callExtFormRef" :model="callExtForm" :rules="ruleCustom">
      <label class="dial-name">撥出號碼：</label>
      <Row>
        <Col span="16">
          <FormItem prop="calledNumber">
            <Input
              v-model="callExtForm.calledNumber"
              maxlength="20"
              placeholder="*0315"
              clearable
              @on-blur="$emit('on-change', callExtForm.calledNumber)"
              @on-clear="$emit('on-change', callExtForm.calledNumber)"
            ></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <Button type="primary" class="dial-button" @click="doSystemCall">
          </Button>
        </Col>
      </Row>
      <div class="dial-msg">請以電腦鍵盤或點選數字按鈕進行撥號</div>
      <div class="dial-msg">市內電話請輸入【區碼-電話】，範例：0385121313</div>
      <div class="dial-msg">手機號碼請輸入【手機號碼】，範例：0980451313</div>
      <div class="dial-msg">分機號碼請輸入【分機號碼】，範例：6666</div>
      <div class="dial-msg">行內簡碼請輸入【*行內簡碼】，範例：*0315</div>
    </Form>

    <!-- 未設定分機顯示 -->
    <esun-alert
      v-model:value="extAlert"
      :title="extAlertTitle"
      :content="extAlertContent"
    ></esun-alert>

    <!-- 系統撥號顯示 -->
    <esun-alert v-model:value="dialingAlert" title="通知">
      <div>系統撥號中...</div>
      <div style="font-weight: bold; margin-top: 5px">請拿起話筒進行通話</div>
    </esun-alert>
  </div>
</template>

<script setup lang="ts">
import type { FormRef, Validator } from "@/core/type/common";
import { reactive, ref, watch } from "vue";
import isBlank from "is-blank";
import sysDialApi from "@/core/api/sys-dial-api";

const props = defineProps({
  // 發話號碼
  callingNumber: {
    type: String,
    required: true,
  },
  // 受話者鍵值
  calledId: {
    type: String,
    required: false,
  },
  // 受話者名稱
  calledInfo: {
    type: String,
    required: false,
  },
  // 撥號號碼
  dialNumber: {
    type: String,
    required: false,
  },
  // 功能代碼
  srcFuncCode: {
    type: String,
    required: false,
  },
  // 功能代碼名稱
  srcFuncName: {
    type: String,
    required: false,
  },
  // 業務編號
  businessId: {
    type: String,
    required: false,
    default: "",
  },
});

const validatePhone: Validator<string> = (rule, value, callback) => {
  //字元檢查，判斷字串是否為數字、*、-
  if (!/^(\*|-|\d)*$/.test(value)) {
    return callback(new Error("格式錯誤"));
  }

  // 長度檢查
  if (value.length > 20) {
    return callback(new Error("號碼最長為20長"));
  }

  // 長度檢查
  if (value.length < 1) {
    return callback(new Error("請輸入號碼"));
  }

  // 簡碼檢查
  if (/^\*[1-9].*/.test(value)) {
    return callback(new Error("簡碼為*0開頭"));
  }

  // 高付費號碼禁止撥號
  if (/^(020|050|0941|0951).*/.test(value)) {
    return callback(new Error("此類號碼禁止使用"));
  }

  return callback();
};

const callExtFormRef = ref<FormRef | null>(null);
// 未設定分機顯示
const extAlert = ref(false);

// 未設定分機標題
const extAlertTitle = ref("");
// 未設定分機內容
const extAlertContent = ref("");
// 系統撥號顯示
const dialingAlert = ref(false);
// 快速撥號表單
const callExtForm = reactive({
  calledNumber: "",
});
// 檢核規則
const ruleCustom = reactive({
  calledNumber: [{ validator: validatePhone, trigger: "blur" }],
});

/**
 * 系統撥號
 */
function doSystemCall() {
  if (isBlank(props.callingNumber) || props.callingNumber === "****") {
    extAlertTitle.value = "尚未登錄分機";
    extAlertContent.value = "請至EPSP支付服務整合系統首頁進行指定分機編輯";
    extAlert.value = true;
    return;
  }

  callExtFormRef.value!.validate(async (valid) => {
    if (valid) {
      await sysDialApi.doSystemCall({
        callingNumber: props.callingNumber,
        calledId: props.calledId,
        calledInfo: props.calledInfo,
        calledNumber: callExtForm.calledNumber,
        calledNumberSrcField: "S", // S: 手動撥號
        calledObjType: "F", // F: 快速撥號
        srcFuncCode: props.srcFuncCode,
        srcFuncName: props.srcFuncName,
        refProcKey: props.businessId,
        reasonCd: "01", // 01: 業務執行
      });

      dialingAlert.value = true;
      setTimeout(() => {
        dialingAlert.value = false;
      }, 3000);
    }
  });
}

/**
 * 監聽撥號號碼
 */
watch(
  () => props.dialNumber,
  (value) => {
    callExtForm.calledNumber = value!;
  }
);
</script>

<style lang="less" scoped>
.dial-button {
  width: 80px;
  height: 70px;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin: 0px 10px;
  background-image: url("../../assets/images/ic_white_phone.svg");
  background-repeat: no-repeat;
  background-position: center;
}
:deep(.ivu-input) {
  height: 70px;
  width: 100%;
  padding: 0px 60px 0px 20px;
  font-size: 22px;
}
:deep(.ivu-input-wrapper) {
  width: 100%;
}
:deep(.ivu-input-wrapper:hover) .ivu-input-icon-clear {
  top: 18px;
}
:deep(.ivu-form-item-content) {
  display: flex;
}
</style>
