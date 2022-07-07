<template>
  <h1>Lang view</h1>
  <p>{{ $t("hi") }}</p>
  <p>{{ t("hi") }}</p>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
