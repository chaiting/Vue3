<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="btn-group">
      <button @click="fetchData">fetch data</button>
      <button @click="resetData">reset data</button>
    </div>
    <label>總筆數: {{ list.total }}</label>
    <ul class="user-list">
      <li v-for="item in list.data" :key="item.id">
        {{ `${item.id} , ${item.name} , ${item.age} , ${item.address}` }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { UserList } from "@/api/f010101-api";
import f010101Api from "@/api/f010101-api";
import { reactive } from "vue";

// reactive<T>
const list = reactive<UserList>({ data: [], total: 0 });

function fetchData() {
  let result = f010101Api.doFetchApi({ page: 1, pageSize: 3 });
  list.data = result.data;
  list.total = result.total;
}

function resetData() {
  list.data = [];
  list.total = 0;
}
</script>
<style scoped>
.user-list {
  padding-left: 0px;
}
.user-list li {
  padding: 3px;
  list-style: none;
}
.btn-group button + button {
  margin-left: 10px;
}
.btn-group {
  margin-bottom: 10px;
}
</style>
