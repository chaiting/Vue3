<template>
  <div>
    <CustomerDialler
      customerName="王玉山"
      customerId="A123456"
      customerType="A"
      srcFuncCode="A"
      srcFuncName="B"
      :isShowSysTab="true"
      :customerTelList="customerTelList"
    >
      <Button>CustomerDialler Slot</Button>
    </CustomerDialler>
  </div>
</template>

<script setup lang="ts">
import CustomerDialler from "@/core/components/dial/CustomerDialler.vue";

// 顧客電話清單
const customerTelList = [{ telNumber: "02-123456789", telType: "H" }];
</script>
