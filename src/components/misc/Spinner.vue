<template>
  <Loading :active="isShowSpinner" loader="bars">
    <!-- <div class="box">
      <font-awesome-icon icon="cog" size="3x" spin fixed-width> </font-awesome-icon>
      <span>資料處理中</span>
    </div> -->
  </Loading>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { computed } from "vue";

const globalStore = useGlobalStore();

const isShowSpinner = computed(() => {
  return globalStore.isShowSpinner;
});
</script>
<style>
.box {
  background-color: white;
  height: 150px;
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  box-shadow: 0px 5px 10px 3px grey;
  border-radius: 10px;
}
.msg {
  margin-top: 20px;
}
</style>
