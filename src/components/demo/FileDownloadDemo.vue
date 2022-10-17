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

const textContent = ref("");

const { isComponentActivated } = useActivated();

watch(textContent, () => {
  if (isComponentActivated.value) {
    // todo something...
  }
});

function downloadfile() {
  jsFileDownload(textContent.value, "download.txt");
}
</script>
