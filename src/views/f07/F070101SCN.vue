<template>
  <Card title="兩欄位，至少填寫一項">
    <F070102SCN></F070102SCN>
  </Card>
  <Card title="兩日期欄位，驗證相依">
    <F070103SCN></F070103SCN>
  </Card>
</template>
<script setup lang="ts">
import F070102SCN from "@/components/f07/F070102SCN.vue";
import F070103SCN from "@/components/f07/F070103SCN.vue";
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
