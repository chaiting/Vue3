<template>
  <div class="about">
    <Form :label-width="90">
      <Row :gutter="10">
        <Col>
          <FormItem label="顧客ID">
            <Input v-model="form.customerId"></Input>
          </FormItem>
        </Col>
        <Col>
          <div class="btn-group">
            <Button @click="doQryCustomerList" type="primary"
              >fetch mock data</Button
            >
            <Button @click="resetData">reset data</Button>
          </div>
        </Col>
        <Col>
          <Tag>
            {{
              {
                ...form,
                page: pagination.page,
                pageSize: pagination.pageSize,
              }
            }}
          </Tag>
        </Col>
      </Row>
    </Form>
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

const { pagination, onChangePage, onChangePageSize } = usePagination({
  fetcher: doQryCustomerList,
});

const columns = reactive([
  { key: "id", title: "ID", width: 100, align: "center" },
  { key: "name", title: "顧客名稱", width: 150 },
  { key: "email", title: "Email" },
  { key: "time", title: "更新時間", width: 200, align: "center" },
  { key: "address", title: "地址" },
]);

const list = reactive({ data: [] });

const form = reactive({
  customerId: "A123456789",
  sortType: "ASC",
});

async function doQryCustomerList() {
  const result = await f010101Api.doQryCustomerList({
    ...form, // 表單欄位
    page: pagination.page,
    pageSize: pagination.pageSize,
  });
  pagination.total = result.total;
  list.data = result.data;
}

function resetData() {
  list.data = [];
  pagination.total = 0;
}
</script>
