<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="btn-group">
      <Button @click="fetchData" type="primary">fetch data</Button>
      <Button @click="resetData">reset data</Button>
    </div>
    <Table :columns="columns" :data="list.data" stripe :border="true"> </Table>
    <Page show-total :total="list.total" @on-change="onChangePage"> </Page>
  </div>
</template>
<script setup lang="ts">
import type { UserList, Pagination } from "@/api/f010101-api";
import f010101Api from "@/api/f010101-api";
import { reactive } from "vue";

const columns = reactive([
  { key: "id", title: "Id" },
  { key: "name", title: "Name" },
  { key: "age", title: "Age" },
  { key: "address", title: "Address" },
]);

const list = reactive<UserList>({ data: [], total: 0 });

const pagination = reactive<Pagination>({
  page: 1,
  pageSize: 10,
});

function fetchData() {
  let result = f010101Api.doFetchApi(pagination);
  list.data = result.data;
  list.total = result.total;
}

function resetData() {
  list.data = [];
  list.total = 0;
}

function onChangePage(value: number) {
  pagination.page = value;
  fetchData();
}
</script>
