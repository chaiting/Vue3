<template>
  <ModalDemo v-model:value="isOpen" title="標題123">
    <div>內容123</div>
  </ModalDemo>
  <Button @click="openModal"> Open modal</Button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import ModalDemo from "../demo/ModalDemo.vue";

const router = useRouter();

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
  setTimeout(() => {
    router.push("/forbidden");
  }, 2000);
}
</script>
