<template>
  <div>
    Child: {{ value }}
    <div class="btn-group">
      <Button @click="add" type="primary">Add</Button>
      <Button @click="minus">Minus</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
// 1.type declaration
// const emit = defineEmits<{ (e: "update:value", value: number): void }>();

// 2.full type inference support
const emit = defineEmits(["update:value"]);

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
});

function add() {
  emit("update:value", props.value + 1);
}

function minus() {
  emit("update:value", props.value - 1);
}
</script>
