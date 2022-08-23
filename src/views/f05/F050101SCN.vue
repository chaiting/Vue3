<template>
  <Card title="NumericKeyboard">
    <F050102SCN></F050102SCN>
  </Card>
  <Card title="Dialler">
    <F050103SCN></F050103SCN>
  </Card>
  <Card title="CustomerPhone">
    <F050104SCN></F050104SCN>
  </Card>
  <Card title="CustomerPhoneList">
    <F050105SCN></F050105SCN>
  </Card>
  <Card title="CustomerDialler">
    <F050106SCN></F050106SCN>
  </Card>
</template>

<script setup lang="ts">
import F050102SCN from "@/components/f05/F050102SCN.vue";
import F050103SCN from "@/components/f05/F050103SCN.vue";
import F050104SCN from "@/components/f05/F050104SCN.vue";
import F050105SCN from "@/components/f05/F050105SCN.vue";
import F050106SCN from "@/components/f05/F050106SCN.vue";
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
