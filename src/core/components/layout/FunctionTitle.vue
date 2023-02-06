<template>
  <header>{{ title }}</header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/core/store/global";

const globalStore = useGlobalStore();

/**
 * 標題
 */
const title = computed(() => {
  return globalStore.title;
});
</script>
