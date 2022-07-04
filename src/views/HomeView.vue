<template>
  <main>
    <div>
      <h1>This is an home page</h1>
    </div>
    <div>parentValue: {{ parentValue }}</div>
    <div class="input-group">
      <input v-model="val1" />
      <input v-model="val2" />
      <input v-model="val3" />
      <input v-model="val4" />
    </div>
    <Counter
      v-model:value="parentValue"
      v-model:val1="val1"
      v-model:val2="val2"
      v-model:val3="val3"
      v-model:val4="val4"
    />
    <img src="../assets/bg.jpeg" alt="" width="400">
  </main>
</template>
<script lang="ts">
export default {
  created() {},
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import Counter from "@/components/Counter.vue";

const parentValue = ref<number>(0);

const val1 = ref("");
const val2 = ref("");
const val3 = ref("");
const val4 = ref("");
</script>

<style>
.input-group input + input {
  margin-left: 10px;
}
</style>
