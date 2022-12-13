<template>
  <div>
    <h3>#js-file-download</h3>
    <F020102SCN />
    <Divider />
    <h3>#i18n</h3>
    <F020103SCN />
    <h3>#html2pdf.js</h3>
    <F020104SCN ref="copyRef" />
    <button @click="downloadPDF">download pdf</button>
  </div>
</template>
<script setup lang="ts">
import html2pdf from "html2pdf.js";
import { ref } from "vue";
import F020102SCN from "@/components/f02/F020102SCN.vue";
import F020103SCN from "@/components/f02/F020103SCN.vue";
import F020104SCN from "@/components/f02/F020104SCN.vue";

const copyRef = ref<any>(null);

function downloadPDF() {
  html2pdf(copyRef.value.dom);
}
</script>
