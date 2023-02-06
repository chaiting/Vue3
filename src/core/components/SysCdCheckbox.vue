<template>
  <CheckboxGroup v-model="selectedItems" @on-change="onChangeHandler">
    <Checkbox
      v-for="item in items"
      :label="item.value"
      :key="item.value"
      :disabled="readonly"
      :border="border"
    >
      <span>{{ item.label }}</span>
    </Checkbox>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { find, includes } from "lodash-es";
import { ref, watch, onMounted, type PropType } from "vue";
import codeApi from "@/core/api/code-api";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  // 下拉選單選中的值
  value: {
    type: Array as PropType<string[]>,
  },
  // 是否唯讀
  readonly: {
    type: Boolean,
    default: false,
  },
  // 選項是否顯示明細代碼
  showCode: {
    type: Boolean,
    default: false,
  },
  // 是否顯示邊框
  border: {
    type: Boolean,
    default: false,
  },
  // 類別代碼
  ctId: {
    type: Number,
    required: true,
  },
  // 明細代碼
  cdId: {
    type: String,
  },
  // 是否停用
  suspend: {
    type: String,
  },
  // 其它用途註記 01
  flag01: {
    type: String,
  },
  // 其它用途註記 02
  flag02: {
    type: String,
  },
  // 其它用途註記 03
  flag03: {
    type: String,
  },
  // 其它用途註記 04
  flag04: {
    type: String,
  },
  // 其它用途註記 05
  flag05: {
    type: String,
  },
  // 其它用途註記 06
  flag06: {
    type: String,
  },
  // 其它用途註記 07
  flag07: {
    type: String,
  },
  // 其它用途註記 08
  flag08: {
    type: String,
  },
  // 其它用途註記 09
  flag09: {
    type: String,
  },
  // 其它用途註記 10
  flag10: {
    type: String,
  },
});

// 選中選項
const selectedItems = ref<string[]>([]);
// 選項
const items = ref<{ value: string; label: string }[]>([]);

/**
 * 選項異動處理
 */
function onChangeHandler(value: string[]) {
  emit("update:value", value);
}
/**
 * 取得Checkbox選單選項清單
 */
async function doQryCodeLabelValueList() {
  items.value = await codeApi.doQryCodeLabelValueList({
    ctId: props.ctId,
    cdId: props.cdId,
    showCode: props.showCode,
    suspend: props.suspend,
    flag01: props.flag01,
    flag02: props.flag02,
    flag03: props.flag03,
    flag04: props.flag04,
    flag05: props.flag05,
    flag06: props.flag06,
    flag07: props.flag07,
    flag08: props.flag08,
    flag09: props.flag09,
    flag10: props.flag10,
  });
}
/**
 * 若選單中存在父元件選值則改選中值, 不存在則清空父元件選值
 * @param payload 執行參數
 */
async function doUpdateSelectedValue(payload: { forceReload: "Y" | "N" }) {
  // Y: 強制重載
  if ("Y" === payload.forceReload || items.value.length < 1) {
    await doQryCodeLabelValueList();
  }

  selectedItems.value = props.value!;
  if (!selectedItems.value || selectedItems.value.length < 1) {
    return;
  }

  const isExists = find(items.value, function (o: any) {
    return includes(selectedItems.value, o.value);
  });

  if (!isExists) {
    emit("update:value", null);
  }
}

/**
 * 監聽是否刷新選中值
 */
watch(
  () => props.value,
  () => doUpdateSelectedValue({ forceReload: "N" })
);

/**
 * 監聽是否強制刷新選中值
 */
watch(
  [
    () => props.cdId,
    () => props.suspend,
    () => props.flag01,
    () => props.flag02,
    () => props.flag03,
    () => props.flag04,
    () => props.flag05,
    () => props.flag06,
    () => props.flag07,
    () => props.flag08,
    () => props.flag09,
    () => props.flag10,
  ],
  () => doUpdateSelectedValue({ forceReload: "Y" })
);

onMounted(() => {
  doUpdateSelectedValue({ forceReload: "Y" });
});
</script>
