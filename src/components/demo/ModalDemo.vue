<template>
  <Modal v-model="isOpen">
    <slot></slot>
  </Modal>
</template>
<script setup lang="ts">
import { onDeactivated, ref, watch } from "vue";
const props = defineProps(["value"]);
const emit = defineEmits(["update:value"]);

const isOpen = ref(false);

watch(
  () => props.value,
  () => (isOpen.value = props.value)
);

watch(isOpen, (val) => emit("update:value", val));

onDeactivated(() => {
  isOpen.value = false;
});
</script>
