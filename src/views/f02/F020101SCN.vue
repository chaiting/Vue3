<template>
  <div>
    <h3>#esun-button</h3>
    <esun-button />
    <Divider />
    <h3>#js-file-download</h3>
    <FileDownloadDemo />
    <Divider />
    <h3>#i18n</h3>
    <I18nDemo />
    <Divider />
    <h3>#vue-echarts (pie)</h3>
    <PieChartDemo />
    <h3>#vue-echarts (bar)</h3>
    <BarChartDemo />
  </div>
</template>
<script setup lang="ts">
import FileDownloadDemo from "@/components/demo/FileDownloadDemo.vue";
import I18nDemo from "@/components/demo/I18nDemo.vue";
import PieChartDemo from "@/components/demo/PieChartDemo.vue";
import BarChartDemo from "@/components/demo/BarChartDemo.vue";
</script>
