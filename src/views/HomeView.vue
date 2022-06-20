<template>
  <main>
    <div>
      <h1>This is an home page</h1>
    </div>
    <div>parentValue: {{ parentValue }}</div>
    <Counter v-model:value="parentValue" />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Counter from "@/components/Counter.vue";

const parentValue = ref<number>(0);
</script>
