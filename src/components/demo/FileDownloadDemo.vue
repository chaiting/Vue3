<template>
  <Row :gutter="20" :align="'bottom'">
    <Col flex="300px">
      <Input type="textarea" v-model="textContent"></Input
    ></Col>
    <Col> <Button type="text" @click="downloadfile">download</Button></Col>
  </Row>
</template>
<script setup lang="ts">
import { ref } from "vue";
import jsFileDownload from "js-file-download";

const textContent = ref("");

function downloadfile() {
  jsFileDownload(textContent.value, "download.txt");
}
</script>
