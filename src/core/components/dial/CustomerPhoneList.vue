<template>
  <div>
    <Row>
      <Col v-for="(item, i) in phoneList" span="12" class="margin-col" :key="i">
        <CustomerPhone
          :callingNumber="callingNumber"
          :isDialable="isDialable"
          :customerId="customerId"
          :telType="item.telType"
          :calledNumber="item.telNumber"
          :customerName="customerName"
          :customerSex="customerSex"
          :businessId="businessId"
          :srcFuncCode="srcFuncCode"
          :srcFuncName="srcFuncName"
          :dialBtnSpan="dialBtnSpan"
          :msgSpan="msgSpan"
        ></CustomerPhone>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import CustomerPhone from "@/core/components/dial/CustomerPhone.vue";

defineProps({
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
  // 電話清單 Ex: [{ telNumber: "02-123456789", telType: "H" }]
  phoneList: {
    type: Array as PropType<{ telNumber: string; telType: string }[]>,
    required: true,
  },
  // 顧客ID
  customerId: {
    type: String,
    required: true,
  },
  // 顧客姓名
  customerName: {
    type: String,
    required: false,
  },
  // 顧客性別,Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=159
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
</script>

<style lang="scss" scoped>
.margin-col {
  margin-top: 20px;
}
</style>
