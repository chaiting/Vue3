<template>
  <Card title="限制特定日期 & 區間">
    <F060102SCN></F060102SCN>
  </Card>
</template>
<script setup lang="ts">
import F060102SCN from "@/components/f06/F060102SCN.vue";
</script>

<style scoped>
.ivu-card + .ivu-card {
  margin-top: 20px;
}

:deep(.ivu-card-head) {
  background-color: gray;
}
:deep(.ivu-card-head p) {
  font-style: italic;
  font-weight: bold;
  color: white;
}
</style>
