<template>
  <Row :gutter="20" :align="'bottom'">
    <Col flex="300px">
      <Input type="textarea" v-model="textContent"></Input
    ></Col>
    <Col> <Button type="text" @click="downloadfile">download</Button></Col>
  </Row>
</template>
<script setup lang="ts">
import jsFileDownload from "js-file-download";
import { ref, watch } from "vue";
import { useActivated } from "@/core/hook/useActivated";

// text內容
const textContent = ref("");
// 確認Keep-alive組件是否activated
const { isComponentActivated } = useActivated();

/**
 * 下載檔案
 */
function downloadfile() {
  jsFileDownload(textContent.value, "download.txt");
}

/**
 * 監聽text內容變化
 */
watch(textContent, () => {
  if (isComponentActivated.value) {
    // todo something...
  }
});
</script>
