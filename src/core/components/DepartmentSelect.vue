<template>
  <Select
    v-model="selectedDept"
    clearable
    filterable
    :disabled="readonly"
    :multiple="multiple"
    :placeholder="placeholder"
    @on-change="$emit('update:value', $event)"
    @on-clear="$emit('update:value', $event)"
  >
    <Option v-for="dept in deptList" :value="dept.grpId" :key="dept.grpId">{{
      dept.grpNm
    }}</Option>
  </Select>
</template>

<script setup lang="ts">
import isBlank from "is-blank";
import { find, includes, filter } from "lodash-es";
import { onMounted, ref, watch } from "vue";
import departmentApi from "@/core/api/department-api";
import type { PropType } from "vue";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  // 選中的組織/群組清單
  value: {
    type: [String, Array],
    required: false,
  },
  // 上層組織/群組代碼清單, Ref DATAASYNC.TB_GROUP.GRP_ID
  upGrpIdList: {
    type: Array as PropType<string[]>,
    required: false,
  },
  // 組織/群組層級代碼, Ref DATASHARE.SYS_CD.CD_ID, CT_ID=32
  grpUnitcode: {
    type: String,
    required: false,
  },
  // 組織/群組資料來源, Ref DATASHARE.SYS_CD.CD_ID, CT_ID=29
  dataSrc: {
    type: String,
    required: false,
  },
  // 是否限啟用組織/群組(Y|N)
  activatedGrp: {
    type: String as PropType<"Y" | "N">,
    required: false,
    default: "Y",
    validator: function (value: string) {
      return ["", "Y", "N"].includes(value);
    },
  },
  // 是否包含所有子單位(Y|N)
  allSubordinate: {
    type: String as PropType<"Y" | "N">,
    required: false,
    default: "N",
    validator: function (value: string) {
      return ["", "Y", "N"].includes(value);
    },
  },
  // 是否可多選
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否唯讀
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 選擇框默認文字
  placeholder: {
    type: String,
    required: false,
  },
});
// 組織/群組清單
const deptList = ref<{ grpId: string; grpNm: string }[]>([]);
// 選中的組織/群組清單
const selectedDept = ref();

/**
 * 查詢組織/群組清單
 */
async function doQryDeptList() {
  deptList.value = [];

  const depts = filter(props.upGrpIdList, (row) => !isBlank(row)) || [];

  if (depts.length < 1) {
    return;
  }

  deptList.value = await departmentApi.doQryDeptList({
    upGrpIdList: depts,
    grpUnitcode: props.grpUnitcode!,
    dataSrc: props.dataSrc!,
    activatedGrp: props.activatedGrp,
    allSubordinate: props.allSubordinate,
  });
}

/**
 * 若選單中存在父元件選值則改選中值, 不存在則清空父元件選值
 */
async function doUpdateSelectedValue() {
  await doQryDeptList();

  selectedDept.value = props.value;

  if (!selectedDept.value || selectedDept.value.length < 1) {
    return;
  }

  const isExists = find(deptList.value, function (o: any) {
    return includes(selectedDept.value, o.grpId);
  });

  if (!isExists) {
    emit("update:value", null);
  }
}

/**
 * 監聽上層組織/群組代碼清單, Ref DATAASYNC.TB_GROUP.GRP_ID
 */
watch(
  () => props.upGrpIdList,
  () => doUpdateSelectedValue(),
  { deep: true }
);

/**
 * 監聽是否限啟用組織/群組(Y|N)
 */
watch(
  () => props.activatedGrp,
  () => doUpdateSelectedValue()
);

onMounted(() => doUpdateSelectedValue());
</script>

<style lang="scss" scoped></style>
