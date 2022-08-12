<template>
  <div class="about">
    <pre> // A123456789 // 4108304590880810 // 00000000</pre>
    <Form ref="formRef" :label-width="110" :rules="formRules" :model="form">
      <Row :gutter="10">
        <Col span="6">
          <FormItem label="顧客ID" prop="customerId">
            <Input v-model="form.customerId"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="信用卡卡號" prop="creditCardNumber">
            <Input v-model="form.creditCardNumber"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="統一編號" prop="taxId">
            <Input v-model="form.taxId"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <div class="btn-group">
            <Button @click="submit" type="primary">Submit</Button>
            <Button @click="reset">Reset</Button>
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
    <Table
      :columns="columns"
      :data="list.data"
      stripe
      :border="true"
      @on-sort-change="onSortChange"
    >
    </Table>
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
import type { FormRef, SortOption } from "@/type/common";
import f010101Api from "@/api/f01/f010101-api";
import { ref, reactive } from "vue";
import { usePagination } from "@/hooks/usePagination";
import { checkIdNumberValid } from "@/utils/id-number-utils";
import { isValidCreditCardNumber } from "@/utils/credit-card-number-utils";
import { checkTaxIdValid } from "@/utils/tax-id-utils";

const formRef = ref<FormRef | null>();

const { pagination, onChangePage, onChangePageSize, onSortChange } =
  usePagination({
    fetcher: doQryCustomerList,
    defaultCol: "ID",
  });

const columns = reactive([
  { key: "id", title: "ID", width: 100, align: "center", sortable: true },
  { key: "name", title: "顧客名稱", width: 150, sortable: true },
  { key: "email", title: "Email", sortable: true },
  {
    key: "time",
    title: "更新時間",
    width: 200,
    align: "center",
    sortable: true,
  },
  { key: "address", title: "地址" },
]);

const list = reactive({ data: [] });

const form = reactive({
  customerId: "",
  creditCardNumber: "",
  taxId: "",
});

const formRules = reactive({
  customerId: [
    { message: "顧客ID必填", required: true },
    {
      validator: (rule: any, value: string, cb: (message?: Error) => void) => {
        checkIdNumberValid(value)
          ? cb()
          : cb(new Error("檢查身分證字號是否正確"));
      },
    },
  ],
  creditCardNumber: [
    { message: "信用卡號必填", required: true },
    {
      validator: (rule: any, value: string, cb: (message?: Error) => void) => {
        isValidCreditCardNumber(value)
          ? cb()
          : cb(new Error("檢查信用卡卡號是否正確"));
      },
    },
  ],
  taxId: [
    { message: "統一編號必填", required: true },
    {
      validator: (rule: any, value: string, cb: (message?: Error) => void) => {
        checkTaxIdValid(value) ? cb() : cb(new Error("檢查統一編號是否正確"));
      },
    },
  ],
});

async function doQryCustomerList(sortOption?: SortOption) {
  const result = await f010101Api.doQryCustomerList({
    ...form, // 表單欄位
    ...sortOption, // 排序選項
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  console.log({
    ...form, // 表單欄位
    ...sortOption,
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  pagination.total = result.total;
  list.data = result.data;
}

async function submit() {
  // formRef.value?.validate((valid: boolean) => {
  //   if (valid) {
  //     doQryCustomerList();
  //   }
  // });
  doQryCustomerList();
}

async function reset() {
  formRef.value?.resetFields();
}
</script>
