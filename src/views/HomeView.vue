<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import { useCounterStore } from "@/stores/counter";

const counterStore = useCounterStore();
const update = () => {
  counterStore.counter = minus(10, 5);
};

function minus(a: number, b: number) {
  return a - b;
}
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div>
      {{ counterStore.counter }}
    </div>
    <Button @click="update">update</Button>
  </main>
</template>
