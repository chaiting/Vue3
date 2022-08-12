<template>
  <!-- # 數字format -->
  <InputNumber
    v-model="numberValue"
    :precision="0"
    :parser="numberParser"
    :formatter="numberFormat"
    :active-change="false"
  ></InputNumber>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { numberFormat, numberParser } from "@/utils/numberFormat";

const numberValue = ref(0);
</script>
