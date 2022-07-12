<template>
  <!-- <main> -->
  <div>parentValue: {{ parentValue }}</div>
  <div class="input-group">
    <input v-model="val1" />
    <input v-model="val2" />
    <input v-model="val3" />
    <input v-model="val4" />
  </div>
  <Counter
    v-model:value="parentValue"
    v-model:val1="val1"
    v-model:val2="val2"
    v-model:val3="val3"
    v-model:val4="val4"
  />
</template>
<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Counter from "@/components/Counter.vue";

const router = useRouter();
const parentValue = ref(0);

const val1 = ref("");
const val2 = ref("");
const val3 = ref("");
const val4 = ref("");

const app = getCurrentInstance();

onMounted(() => {
  console.log(app?.appContext.config.globalProperties.$keycloak);
});
</script>

<style>
.input-group input + input {
  margin-left: 10px;
}
</style>
