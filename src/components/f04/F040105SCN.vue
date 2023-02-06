<template>
  <SysCdRadio v-model:value="selectValue" :ctId="2"></SysCdRadio>
  <Tag>
    {{ selectValue }}
  </Tag>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 選中的值
const selectValue = ref();
</script>
