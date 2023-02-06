<template>
  <div>
    <EsunAlert
      v-model:value="isOpenStringAlert"
      title="Alert title..."
      :content="stringContent"
    >
    </EsunAlert>
    <EsunAlert
      v-model:value="isOpenArrayAlert"
      title="Alert title..."
      :content="arrayContent"
    >
    </EsunAlert>
    <div class="btn-group">
      <Button @click="isOpenStringAlert = true">Open EsunAlert (string)</Button>
      <Button @click="isOpenArrayAlert = true">Open EsunAlert (array)</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 是否開啟EsunAlert(字串)
const isOpenStringAlert = ref(false);
// 是否開啟EsunAlert(陣列)
const isOpenArrayAlert = ref(false);
// 陣列內容
const arrayContent = ref(["Alert message 1...", "Alert message 2..."]);
// 字串內容
const stringContent = ref("Alert message...");
</script>
