<template>
  <Button type="info" @click="doShowConfirm">do showConfirm</Button>
  <Button @click="doShowConfirmByStore">do showConfirm by store</Button>
</template>

<script setup lang="ts">
import { useConfirm } from "@/core/hook/useConfirm";
import { useConfirmStore } from "@/stores/confirm";
const confirmStore = useConfirmStore();

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
