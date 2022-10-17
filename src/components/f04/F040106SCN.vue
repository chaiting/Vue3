<template>
  <SysCdCheckbox v-model:value="checkboxValue" :ctId="2"></SysCdCheckbox>
  <Tag>
    {{ checkboxValue }}
  </Tag>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 選中的值
const checkboxValue = ref(["Y", "N"]);
</script>
