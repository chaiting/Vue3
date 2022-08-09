<template>
  <Button @click="doShowConfirm">do showConfirm</Button>
</template>

<script setup lang="ts">
import { useConfirm } from "@/hooks/useConfirm";

const { showConfirm } = useConfirm();

function doShowConfirm() {
  showConfirm({
    title: "我是標題",
    content: `123`,
  });
}
</script>
