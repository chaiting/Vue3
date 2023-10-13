<template>
  <Tabs value="name1" type="card">
    <TabPane label="Tag1" name="name1">
      <Table
        v-watermark="'B32K61 王小明 20447'"
        :columns="columns"
        :data="dataList"
        :border="true"
      ></Table>
    </TabPane>
    <TabPane label="Tag2" name="name2">
      <Table
        v-watermark="'B32K61 王小明 20447'"
        :columns="columns"
        :data="dataList"
        :border="true"
      ></Table>
    </TabPane>
    <TabPane label="Tag2" name="name3">
      <Table
        v-watermark="'B32K61 王小明 20447'"
        :columns="columns"
        :data="dataList"
        :border="true"
      ></Table>
    </TabPane>
  </Tabs>
</template>
<script setup lang="ts">
import { ref } from "vue";

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Province",
    key: "province",
  },
  {
    title: "City",
    key: "city",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Postcode",
    key: "zip",
  },
];
const dataList = ref([
  ...Array.from({ length: 20 }).fill({
    name: "John Brown",
    age: 18,
    address: "New York No. 1 Lake Park",
    province: "America",
    city: "New York",
    zip: 100000,
  }),
]);
</script>
