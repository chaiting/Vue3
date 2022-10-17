<template>
  <div>
    <Row>
      <!-- 縣市 -->
      <Col :span="colSpan">
        <FormItem
          :label="cityLabel"
          :prop="cityItemNm"
          :class="formItemClass"
          half
        >
          <sys-cd-select
            :ctId="8"
            v-model:value="selectedCityCd"
            :readonly="cityReadonly"
            :suspend="suspend"
            placeholder="請選擇縣市"
            @update:value="onCityChangeHandler"
          ></sys-cd-select>
        </FormItem>
      </Col>
      <!-- 鄉鎮市區 -->
      <Col :span="colSpan" :offset="colOffset">
        <FormItem
          :label="postalLabel"
          :prop="postalItemNm"
          :class="formItemClass"
          half
        >
          <sys-cd-select
            :ctId="9"
            v-model:value="selectedPostalCd"
            :readonly="postalReadonly"
            :flag01="postalParentCd"
            :key="postalKey"
            :suspend="suspend"
            placeholder="請選擇鄉鎮市區"
          ></sys-cd-select>
        </FormItem>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import isBlank from "is-blank";
import { ref, computed, watch, nextTick } from "vue";
import codeApi from "@/core/api/code-api";

const emit = defineEmits([
  "on-city-change",
  "update:cityCd",
  "on-postal-change",
  "update:postalCd",
]);

const props = defineProps({
  // 縣市代碼
  cityCd: {
    type: String,
    required: false,
  },
  // 鄉鎮市區代碼
  postalCd: {
    type: String,
    required: false,
  },
  // 縣市代碼是否唯讀
  cityReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 鄉鎮市區代碼是否唯讀
  postalReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否限已停用之縣市郵區, Y: 限停用, N: 限啟用, null: 全部
  suspend: {
    type: String,
    required: false,
  },
  // Label是否顯示
  isShowLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否顯示esun-form border(該元件必須放置在esun-form裡頭才會生效)
  isShowEsunFormBorder: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 上方的佔位格數，可選總計0〜24的整數，為0時，相當於display:none
  colSpan: {
    type: Number,
    required: false,
    default: 11,
  },
  // 元件間的間距
  colOffset: {
    type: Number,
    required: false,
    default: 2,
  },
  // 縣市表單Item名稱
  cityItemNm: {
    type: String,
    required: false,
    default: "cityCd",
  },
  // 鄉鎮市區表單Item名稱
  postalItemNm: {
    type: String,
    required: false,
    default: "postalCd",
  },
});
// 所選縣市代碼
const selectedCityCd = ref("");
// 所選鄉鎮市區代碼
const selectedPostalCd = ref("");
// 鄉鎮市區代碼元件鍵值
const postalKey = ref(0);

/**
 * 縣市Label
 */
const cityLabel = computed(() => {
  return props.isShowLabel ? "縣市" : "";
});

/**
 * 鄉鎮市區Label
 */
const postalLabel = computed(() => {
  return props.isShowLabel ? "鄉鎮市區" : "";
});

/**
 * 鄉鎮市區上層縣市代碼
 */
const postalParentCd = computed(() => {
  return selectedCityCd.value || "N/A";
});

/**
 * 表單項目class
 */
const formItemClass = computed(() => {
  return {
    "not-show-border": !props.isShowEsunFormBorder,
    "not-show-label": !props.isShowLabel,
  };
});

/**
 * 縣市異動處理
 */
function onCityChangeHandler() {
  selectedPostalCd.value = "";
}

/**
 * 監聽縣市代碼
 */
watch(
  () => props.cityCd,
  (newValue) => {
    selectedCityCd.value = newValue!;
  },
  {
    immediate: true,
  }
);

/**
 * 監聽鄉鎮市區代碼
 */
watch(
  () => props.postalCd,
  async (newValue) => {
    selectedPostalCd.value = newValue!;

    if (isBlank(newValue)) {
      return;
    }

    // 1. 查詢縣市別代碼 ----------------------------------------------------------------------------------------------
    const codeUnits = await codeApi.doQryCodeList({
      ctId: 9, // 9: 鄉政區
      cdId: newValue,
    });

    selectedCityCd.value = codeUnits[0]?.flag01 || "";

    // 2. 設定鄉鎮市區代碼 --------------------------------------------------------------------------------------------
    nextTick(() => {
      selectedPostalCd.value = newValue!;
    });
  },
  { immediate: true }
);

/**
 * 監聽已選中縣市代碼
 */
watch(selectedCityCd, () => {
  postalKey.value++;
  emit("on-city-change", selectedCityCd.value);
  emit("update:cityCd", selectedCityCd.value);
});

/**
 * 監聽已選中鄉鎮市區代碼
 */
watch(selectedPostalCd, () => {
  emit("on-postal-change", selectedPostalCd.value);
  emit("update:postalCd", selectedPostalCd.value);
});
</script>

<style lang="scss" scoped></style>
