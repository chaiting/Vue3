<template>
  <div>
    <FormDemo />
    <Divider />
    <FileDownloadDemo />
    <p>{{ $t("hi") }}</p>
    <p>{{ t("hi") }}</p>
  </div>
</template>
<script setup lang="ts">
import FileDownloadDemo from "@/components/FileDownloadDemo.vue";
import FormDemo from "@/components/FormDemo.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
