<template>
  <Button type="info" @click="doShowConfirm">do showConfirm</Button>
</template>

<script setup lang="ts">
import { useConfirm } from "@/hooks/useConfirm";

const { showConfirm } = useConfirm();

function doShowConfirm() {
  // todo someting...
  showConfirm({
    title: "標題123",
    content: "內容123",
    type: "error",
    ok: () => {
      console.log(`ok`);
    },
    cancel: () => {
      console.log(`cancel`);
    },
  });
}
</script>
