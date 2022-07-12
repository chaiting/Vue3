<template>
  <Loading :active="isShowSpinner" loader="bars"></Loading>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { computed } from "@vue/reactivity";

const globalStore = useGlobalStore();

const isShowSpinner = computed(() => {
  return globalStore.isShowSpinner;
});
</script>
