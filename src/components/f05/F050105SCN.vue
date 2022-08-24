<template>
  <CustomerPhoneList
    customerId="A123456"
    callingNumber="12345678"
    :srcFuncName="'A'"
    :srcFuncCode="'B'"
    :phoneList="phoneList"
    :isDialable="true"
  ></CustomerPhoneList>
</template>

<script setup lang="ts">
import CustomerPhoneList from "@/core/components/dial/CustomerPhoneList.vue";

const phoneList = [
  { telNumber: "02-123456789", telType: "H" },
  { telNumber: "03-123456789", telType: "H" },
  { telNumber: "04-123456789", telType: "H" },
];
</script>
