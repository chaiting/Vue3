<template>
  <div>F080101</div>
  <Table
    style="width: 800px"
    :columns="columns"
    :data="dataList"
    :row-class-name="rowClassName"
    @on-cell-click="onRowClick"
    :border="true"
  >
    <template #select="{ row }">
      <Checkbox
        :model-value="row.isSelected"
        @on-change="onChangeSelect($event, row)"
      ></Checkbox>
    </template>
  </Table>
  <Button @click="submit">Submit</Button>
  {{ dataList }}
</template>
<script setup lang="ts">
import { h, reactive } from "vue";
import SubTable from "./SubTable.vue";

const columns = [
  {
    slot: "select",
    align: "center",
    width: 70,
  },
  {
    type: "expand",
    width: 1,
    render: (render: typeof h, { row }: { row: any }) => {
      return render(SubTable, {
        list: row.list,
        "onOn-update": (payload: any) => {
          dataList
            .filter((e) => e.id === row.id)[0]
            .list.filter((e) => e.id === payload.id)[0].isSelected =
            payload.isSelected;
        },
        "onOn-toggle": (value: boolean) => {
          dataList.filter((e) => e.id === row.id)[0].isSelected = value;
        },
      });
    },
  },
  {
    title: "ID",
    key: "id",
    align: "center",
  },
  {
    title: "Name",
    key: "name",
    align: "center",
  },
  {
    title: "Age",
    key: "age",
    align: "center",
  },
];

const dataList = reactive([
  {
    id: "001",
    name: "JOE",
    age: 10,
    _expanded: false,
    isSelected: false,
    className: "multiple",
    list: [
      {
        id: "0011",
        name: "joe1",
        age: 10,
        isSelected: false,
      },
      {
        id: "0012",
        name: "joe2",
        age: 20,
        isSelected: false,
      },
      {
        id: "0013",
        name: "joe3",
        age: 30,
        isSelected: false,
      },
    ] as any[],
  },
  {
    id: "002",
    name: "Tom",
    age: 20,
    list: [] as any[],
    _disableExpand: true,
    _expanded: false,
  },
  {
    id: "003",
    name: "Jim",
    age: 30,
    list: [] as any[],
    _disableExpand: true,
    _expanded: false,
  },
]);

function onChangeSelect(value: boolean, row: any) {
  const targetRow = dataList.filter((e: any) => e.id === row.id)[0];
  targetRow.isSelected = value;
  if (targetRow.list.length > 0) {
    targetRow.list.forEach((e) => (e.isSelected = value));
  }
}
// 	row, column, data, event
function onRowClick(row: any, column: any) {
  console.log(row, column);
  if (column.slot === "select") return;

  if (!row._disableExpand) {
    dataList.filter((e) => e.id === row.id)[0]._expanded = !dataList.filter(
      (e) => e.id === row.id
    )[0]._expanded;
  }
}

function rowClassName(row: any) {
  if (row.list.length > 0) {
    return "multiple";
  }
}

function submit() {
  console.log(dataList);
}
</script>

<style lang="scss" scoped>
:deep(.ivu-table-expanded-cell) {
  padding: 0px 0px;
  padding-left: 30px;
}
:deep(.ivu-table-cell.ivu-table-cell-with-expand) {
  display: none;
}
:deep(.ivu-table-row.multiple) td {
  background-color: #eefcff;
  cursor: pointer;
}
:deep(.ivu-table-wrapper.sub-table) .ivu-table-header th {
  background-color: rgb(255, 230, 185);
}
:deep(.ivu-table-wrapper.sub-table .ivu-table) td {
  background-color: rgb(249, 242, 228);
}
</style>
