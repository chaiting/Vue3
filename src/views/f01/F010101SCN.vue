<template>
  <div class="about">
    <div class="btn-group">
      <Button @click="doQryCustomerList" type="primary">fetch mock data</Button>
      <Button @click="resetData">reset data</Button>
    </div>
    <Table :columns="columns" :data="list.data" stripe :border="true"> </Table>
    <Page
      class="pagination"
      show-sizer
      show-total
      :total="list.total"
      :page-size="pagination.pageSize"
      @on-change="onChangePage"
      @on-page-size-change="onPageSizeChange"
      :page-size-opts="[20, 50, 100]"
    >
    </Page>
  </div>
</template>
<script setup lang="ts">
import type { UserList, Pagination } from "@/type/common";
import f010101Api from "@/api/f01/f010101-api";
import { reactive } from "vue";

const columns = reactive([
  { key: "id", title: "ID", width: 100, align: "center" },
  { key: "name", title: "名稱", width: 150 },
  { key: "email", title: "Email" },
  { key: "time", title: "更新時間", width: 200, align: "center" },
  { key: "address", title: "地址" },
]);

const list = reactive<UserList>({ data: [], total: 0 });

const pagination = reactive<Pagination>({
  page: 1,
  pageSize: 20,
});

async function doQryCustomerList() {
  const result = await f010101Api.doQryCustomerList(pagination);
  list.total = result.total;
  list.data = result.data;
}

function resetData() {
  list.data = [];
  list.total = 0;
}

function onChangePage(value: number) {
  pagination.page = value;
  doQryCustomerList();
}

function onPageSizeChange(value: number) {
  pagination.pageSize = value;
  doQryCustomerList();
}
</script>
