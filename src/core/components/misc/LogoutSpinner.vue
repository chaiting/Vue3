<template>
  <Loading v-model:active="isShowLogoutSpinner">
    <div class="spinner-wrap">
      <img src="@/assets/gear-solid.svg" class="spinner-icon" />
      {{ logoutMsg }}
    </div>
  </Loading>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Loading from "vue-loading-overlay";
import { useGlobalStore } from "@/core/store/global";

const globalStore = useGlobalStore();
const logoutMsg = "系統登出中，請稍候!!";

const isShowLogoutSpinner = computed(() => {
  return globalStore.isShowLogoutSpinner;
});
</script>

<style scoped>
.spinner-wrap {
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
.spinner-icon {
  width: 50px;
  animation: loop 1.5s infinite linear;
}
@keyframes loop {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
