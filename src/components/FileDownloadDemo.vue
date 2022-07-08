<template>
  <h2>js-file-download</h2>
  <Input type="textarea" v-model="textContent"></Input>
  <Button @click="downloadfile">download</Button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import jsFileDownload from "js-file-download";

const textContent = ref("");

function downloadfile() {
  jsFileDownload(textContent.value, "download.txt");
}
</script>
