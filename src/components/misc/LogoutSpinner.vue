<template>
  <Loading v-model:active="isShowLogoutSpinner">
    <div class="spinner-wrap">
      <!-- <font-awesome-icon icon="cog" size="3x" spin fixed-width> </font-awesome-icon> -->
      <font-awesome-icon icon="cog" size="3x"> </font-awesome-icon>
      {{ logoutMsg }}
    </div>
  </Loading>
</template>

<script setup lang="ts">
import Loading from "vue-loading-overlay";
import { computed } from "vue";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();
const logoutMsg = "系統登出中，請稍候!!";

const isShowLogoutSpinner = computed(() => {
  return globalStore.isShowLogoutSpinner;
});
</script>

<style lang="scss" scoped>
.spinner-wrap {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 150px;
  background-color: white;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px 5px lightgrey;
}
</style>
