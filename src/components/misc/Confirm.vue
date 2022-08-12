<template>
  <EsunConfirm
    v-model:value="confirmStore.isShowConfirm"
    :title="confirmOptions.title"
    :content="confirmOptions.content"
    :type="confirmOptions.type"
    @on-ok="confirmOptions.ok"
    @on-cancel="confirmOptions.cancel"
  ></EsunConfirm>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConfirmStore } from "@/stores/confirm";

const confirmStore = useConfirmStore();

const confirmOptions = computed(() => confirmStore.confirmOptions);
</script>
