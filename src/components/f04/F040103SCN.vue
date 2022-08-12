<template>
  <div>
    <EsunConfirm v-model:value="isOpen" title="Confirm title">
      <div>Title content...</div>
    </EsunConfirm>
    <div class="btn-group">
      <Button @click="isOpen = true">Open EsunConfirm</Button>
      <Button @click="triggerShowConfirm"
        >Open EsunConfirm ( useConfirm )</Button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useConfirm } from "@/hooks/useConfirm";

const isOpen = ref(false);

const { showConfirm } = useConfirm();

function triggerShowConfirm() {
  showConfirm({
    title: "Title 123",
    content: "Content 123",
  });
}
</script>
