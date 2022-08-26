<template>
  <h3>08/10 demo</h3>
  <Button @click="$router.push('/agent')">Agent</Button>
  <Divider># Input 預設clearable</Divider>
  <F030102SCN></F030102SCN>
  <Divider># 單一input，form表單按下enter不要重整</Divider>
  <F030103SCN></F030103SCN>
  <Divider># input 同時顯示clearable + show-word-limit</Divider>
  <F030104SCN></F030104SCN>
  <Divider># 數字format</Divider>
  <F030105SCN></F030105SCN>
  <Divider># 前端仿照後端core</Divider>
  <F030106SCN></F030106SCN>
  <Divider># 跳轉500、403，關閉所有modal</Divider>
  <F030107SCN></F030107SCN>
</template>

<script setup lang="ts">
import F030102SCN from "@/components/f03/F030102SCN.vue";
import F030103SCN from "@/components/f03/F030103SCN.vue";
import F030104SCN from "@/components/f03/F030104SCN.vue";
import F030105SCN from "@/components/f03/F030105SCN.vue";
import F030106SCN from "@/components/f03/F030106SCN.vue";
import F030107SCN from "@/components/f03/F030107SCN.vue";
</script>
