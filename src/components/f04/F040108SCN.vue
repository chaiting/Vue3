<template>
  <EmployeeSelect
    v-model:value="selectEmpValue"
    :grpIdList="['AA']"
  ></EmployeeSelect>
  <Tag>{{ selectEmpValue }}</Tag>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectEmpValue = ref([]);
</script>
