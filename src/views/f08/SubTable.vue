<template>
  <Table :columns="columns" :data="props.list">
    <template #select="{ row }">
      <Checkbox
        :model-value="row.isSelected"
        @on-change="onChangeSelect($event, row)"
      ></Checkbox>
    </template>
  </Table>
</template>
<script setup lang="ts">
import { nextTick, onMounted } from "vue";

const emit = defineEmits(["on-update", "on-toggle"]);
const props = defineProps({
  list: { type: Array },
});

const columns = [
  {
    width: 100,
    slot: "select",
    align: "center",
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

function onChangeSelect(value: boolean, row: any) {
  emit("on-update", { isSelected: value, id: row.id });
  nextTick(() => {
    console.log(props.list);
    // 全選
    if (props.list?.every((e: any) => e.isSelected)) {
      emit("on-toggle", true);
    } else {
      emit("on-toggle", false);
    }
  });
}

onMounted(() => {
  console.log(`mounted*`);
});
</script>
