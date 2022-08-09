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
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @on-change="onChangePage"
      @on-page-size-change="onChangePageSize"
      :page-size-opts="pagination.pageSizeOpts"
    >
    </Page>
  </div>
</template>
<script setup lang="ts">
import f010101Api from "@/api/f01/f010101-api";
import { reactive } from "vue";
import { usePagination } from "@/hooks/usePagination";

const { pagination, onChangePage, onChangePageSize } =
  usePagination(doQryCustomerList);

const columns = reactive([
  { key: "id", title: "ID", width: 100, align: "center" },
  { key: "name", title: "名稱", width: 150 },
  { key: "email", title: "Email" },
  { key: "time", title: "更新時間", width: 200, align: "center" },
  { key: "address", title: "地址" },
]);

const list = reactive({ data: [] });

async function doQryCustomerList() {
  const result = await f010101Api.doQryCustomerList(pagination);
  pagination.total = result.total;
  list.data = result.data;
}

function resetData() {
  list.data = [];
  pagination.total = 0;
}
</script>
