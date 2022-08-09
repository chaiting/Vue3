<template>
  <esun-confirm v-model:value="isOpen" title="My confirm title">
    confirm content ...
  </esun-confirm>
  <Button type="primary" @click="openEsunConfirm">Open Esun Confirm</Button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

function openEsunConfirm() {
  isOpen.value = true;
}
</script>
