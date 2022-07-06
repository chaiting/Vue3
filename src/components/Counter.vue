<template>
  <div class="child">
    Child: {{ value }}
    <div class="btn-group">
      <Button @click="add" type="primary">Add</Button>
      <Button @click="minus">Minus</Button>
    </div>
    <pre>
      {{ { val1, val2, val3, val4 } }}
    </pre>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from "vue";
import utils from "@/utils";
const emit = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  val1: String,
  val2: String,
  val3: String,
  val4: String,
});
const innerValue = ref("inner");

defineExpose({ innerValue });

function add() {
  emit("update:value", props.value + 1);
}

function minus() {
  emit("update:value", props.value - 1);
}

watch(
  [() => props.val1, () => props.val2, () => props.val3, () => props.val4],
  () => {
    console.log(`watch`);
  }
);
</script>
<style>
.child {
  background-color: aqua;
  padding: 10px;
  margin: 10px;
}
</style>
