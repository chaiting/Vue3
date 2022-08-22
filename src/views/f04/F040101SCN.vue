<template>
  <Card title="SysCdSelect">
    <F040102SCN></F040102SCN>
  </Card>
  <Card title="EsunConfirm">
    <F040103SCN></F040103SCN>
  </Card>
  <Card title="EsunAlert">
    <F040104SCN></F040104SCN>
  </Card>
  <Card title="SysCdRadio">
    <F040105SCN></F040105SCN>
  </Card>
  <Card title="SysCdCheckbox">
    <F040106SCN></F040106SCN>
  </Card>
  <Card title="InfoCard">
    <F040107SCN></F040107SCN>
  </Card>
  <Card title="EmployeeSelect">
    <F040108SCN></F040108SCN>
  </Card>
  <Card title="DepartmentSelect">
    <F040109SCN></F040109SCN>
  </Card>
  <Card title="DeptEmpSelect">
    <F040110SCN></F040110SCN>
  </Card>
  <Card title="CityPostalSelect">
    <F040111SCN></F040111SCN>
  </Card>
  <Card title="BpmSubmitter">
    <F040112SCN></F040112SCN>
  </Card>
</template>
<script setup lang="ts">
import F040102SCN from "@/components/f04/F040102SCN.vue";
import F040103SCN from "@/components/f04/F040103SCN.vue";
import F040104SCN from "@/components/f04/F040104SCN.vue";
import F040105SCN from "@/components/f04/F040105SCN.vue";
import F040106SCN from "@/components/f04/F040106SCN.vue";
import F040107SCN from "@/components/f04/F040107SCN.vue";
import F040108SCN from "@/components/f04/F040108SCN.vue";
import F040109SCN from "@/components/f04/F040109SCN.vue";
import F040110SCN from "@/components/f04/F040110SCN.vue";
import F040111SCN from "@/components/f04/F040111SCN.vue";
import F040112SCN from "@/components/f04/F040112SCN.vue";
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
