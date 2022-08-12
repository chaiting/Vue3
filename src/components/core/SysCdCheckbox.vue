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
import { ref, watch, computed, onMounted } from "vue";
import { find, includes } from "lodash-es";
import codeApi from "@/api/core/code-api";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  // 下拉選單選中的值
  value: {
    type: Array,
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

const selectedItems = ref<any>([]);
const items = ref<any>([]);

const clearable = computed(() => !props.readonly);

/**
 * 選項異動處理
 */
function onChangeHandler($event: any) {
  emit("update:value", $event);
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

  selectedItems.value = props.value;
  if (!selectedItems.value || selectedItems.value.length < 1) {
    return;
  }

  let isExists = find(items.value, function (o: any) {
    return includes(selectedItems.value, o.value);
  });

  if (!isExists) {
    emit("update:value", null);
  }
}

watch(
  () => props.value,
  () => doUpdateSelectedValue({ forceReload: "N" })
);

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
