<template>
  <Row :gutter="10">
    <Col span="6">
      <EmployeeSelect
        v-model:value="singleValue"
        :grpIdList="['AA']"
      ></EmployeeSelect>
      <Tag>{{ singleValue }}</Tag>
    </Col>
    <Col span="6">
      <EmployeeSelect
        v-model:value="multipleValue"
        :grpIdList="['AA']"
        multiple
      ></EmployeeSelect>
      <Tag>{{ multipleValue }}</Tag></Col
    >
  </Row>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 單選中的值
const singleValue = ref();
// 多選中的值
const multipleValue = ref(["JONSS", "JEEJE"]);
</script>
