<template>
  <Select
    v-model="selectedUsers"
    clearable
    filterable
    :disabled="readonly"
    :multiple="multiple"
    :placeholder="placeholder"
    @on-change="$emit('update:value', $event)"
    @on-clear="$emit('update:value', $event)"
  >
    <Option
      v-for="user in userList"
      :value="user.usedAccount"
      :key="user.usedAccount"
      :class="user.hireSts"
      >{{ user.empNm }}</Option
    >
  </Select>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import { find, includes, filter } from "lodash-es";
import isBlank from "is-blank";
import employeeApi from "@/core/api/employee-api";
import type { UserList } from "@/core/type/employee-types";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  // 下拉選單選中的值
  value: {
    type: [String, Array] as PropType<string[] | string>,
    required: false,
  },
  // 組織/群組代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  grpIdList: {
    type: Array as PropType<string[]>,
    required: false,
  },
  // Value類型, A: AD帳號、E: 員工編號
  valueType: {
    type: String as PropType<"A" | "E">,
    required: false,
    default: "A",
    validator: function (value: string) {
      return ["A", "E"].includes(value);
    },
  },
  // 是否限在職人員(Y|N)
  isHiredOnly: {
    type: String as PropType<"Y" | "N">,
    required: false,
    default: "Y",
    validator: function (value: string) {
      return ["", "Y", "N"].includes(value);
    },
  },
  // 是否包含單位層級(含子單位)以下所有人(Y|N)
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

// 使用者清單
const userList = ref<UserList>([]);
// 選中的AD帳號清單
const selectedUsers = ref<string | string[]>();

/**
 * 查詢使用者清單
 */
async function doQryUserList() {
  userList.value = [];

  let grpId = filter(props.grpIdList, (row) => !isBlank(row)) || [];

  if (grpId.length < 1) {
    return;
  }

  userList.value = (await employeeApi.doQryUserList({
    grpIdList: grpId,
    isHiredOnly: props.isHiredOnly,
    allSubordinate: props.allSubordinate,
    valueType: props.valueType,
  })) as UserList;
}

/**
 * 若選單中存在父元件選值則改選中值, 不存在則清空父元件選值
 */
async function doUpdateSelectedValue() {
  await doQryUserList();

  selectedUsers.value = props.value!;
  if (!selectedUsers.value || selectedUsers.value.length < 1) {
    return;
  }

  let isExists = find(userList.value, function (o: any) {
    return includes(selectedUsers.value, o.usedAccount);
  });

  if (!isExists) {
    emit("update:value", null);
  }
}

/**
 * 監聽組織/群組代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
 */
watch(
  () => props.grpIdList,
  () => doUpdateSelectedValue(),
  { deep: true }
);

/**
 * 監聽是否限在職人員(Y|N)
 */
watch(
  () => props.isHiredOnly,
  () => doUpdateSelectedValue()
);

onMounted(() => {
  doUpdateSelectedValue();
});
</script>

<style lang="scss" scoped>
.left {
  color: #b3b3b3;
}
</style>
