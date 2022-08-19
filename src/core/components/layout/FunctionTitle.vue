<template>
  <header>{{ title }}</header>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/core/store/global";
import { computed } from "vue";

const globalStore = useGlobalStore();

const title = computed(() => {
  return globalStore.title;
});
</script>
