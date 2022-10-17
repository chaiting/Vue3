<template>
  <div>
    <EsunConfirm v-model:value="isOpen" title="Confirm title">
      <div>Title content...</div>
    </EsunConfirm>
    <div class="btn-group">
      <Button @click="isOpen = true">Open EsunConfirm</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 是否開啟EsunConfirm
const isOpen = ref(false);
</script>
