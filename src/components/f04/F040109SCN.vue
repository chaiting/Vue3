<template>
  <DepartmentSelect
    v-model:value="selectDepValue"
    :upGrpIdList="['AA']"
  ></DepartmentSelect>
  <Tag>{{ selectDepValue }}</Tag>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 選中的部門
const selectDepValue = ref();
</script>
