<template>
  <Button @click="doShowConfirmByStore">do showConfirm by store</Button>
</template>

<script setup lang="ts">
import { useConfirmStore } from "@/store/confirm";
const confirmStore = useConfirmStore();

function doShowConfirmByStore() {
  confirmStore.doShowConfirm({
    title: "aaaa",
    content: "bbbb",
    type: "success",
    ok: () => {
      console.log(`ok [store]`);
    },
    cancel: () => {
      console.log(`cancel [store]`);
    },
  });
}
</script>
