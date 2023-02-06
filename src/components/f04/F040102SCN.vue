<template>
  <Row :gutter="10">
    <Col span="6">
      <SysCdSelect v-model:value="singleValue" :ctId="2"></SysCdSelect>
      <Tag>
        {{ singleValue }}
      </Tag>
    </Col>
    <Col span="6">
      <SysCdSelect
        v-model:value="multipleValue"
        :ctId="2"
        multiple
      ></SysCdSelect>
      <Tag>
        {{ multipleValue }}
      </Tag>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 單選值
const singleValue = ref("");
// 多選值
const multipleValue = ref([]);
</script>
