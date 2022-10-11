<template>
  <div>
    <Row>
      <!-- L50: 總處單位 -->
      <Col :span="colSpan" v-if="isShowAdminDivision">
        <FormItem prop="selectedAdminDivision" :label="adminDivisionLabel">
          <department-select
            v-model:value="selectedAdminDivision"
            :upGrpIdList="upAdminDivisions"
            :activatedGrp="activatedGrp"
            :readonly="adminDivisionReadonly"
            grpUnitcode="L50"
            placeholder="請選擇總處"
            @update:value="onAdminDivisionChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- L55: 處級單位 -->
      <Col :span="colSpan" v-if="isShowDivision">
        <FormItem prop="selectedDivision" :label="divisionLabel">
          <department-select
            v-model:value="selectedDivision"
            :upGrpIdList="upDivisions"
            :activatedGrp="activatedGrp"
            :readonly="divisionReadonly"
            grpUnitcode="L55"
            placeholder="請選擇事業處"
            @update:value="onDivisionChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- L60: 部級單位 -->
      <Col :span="colSpan" v-if="isShowDepartment">
        <FormItem prop="selectedDepartment" :label="departmentLabel">
          <department-select
            v-model:value="selectedDepartment"
            :upGrpIdList="upDepartments"
            :activatedGrp="activatedGrp"
            :readonly="departmentReadonly"
            grpUnitcode="L60"
            placeholder="請選擇部門"
            @update:value="onDepartmentChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- L70: 區級單位 -->
      <Col :span="colSpan" v-if="isShowDistrict">
        <FormItem prop="selectedDistrict" :label="districtLabel">
          <department-select
            v-model:value="selectedDistrict"
            :upGrpIdList="upDistricts"
            :activatedGrp="activatedGrp"
            :readonly="districtReadonly"
            grpUnitcode="L70"
            placeholder="請選擇分區"
            @update:value="onDistrictChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- L80: 中心/分行單位 -->
      <Col :span="colSpan" v-if="isShowCenter">
        <FormItem prop="selectedCenter" :label="centerLabel">
          <department-select
            v-model:value="selectedCenter"
            :upGrpIdList="upCenters"
            :activatedGrp="activatedGrp"
            :readonly="centerReadonly"
            grpUnitcode="L80"
            placeholder="請選擇中心/分行"
            @update:value="onCenterChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- L90: 科組單位 -->
      <Col :span="colSpan" v-if="isShowSection">
        <FormItem prop="selectedSection" :label="sectionLabel">
          <department-select
            v-model:value="selectedSection"
            :upGrpIdList="upSections"
            :activatedGrp="activatedGrp"
            :readonly="sectionReadonly"
            grpUnitcode="L90"
            placeholder="請選擇科組"
            @update:value="onSectionChangeHandler"
          ></department-select>
        </FormItem>
      </Col>

      <!-- 人員 -->
      <Col :span="colSpan" v-if="isShowUser">
        <FormItem prop="selectedUser" :label="userLabel">
          <employee-select
            v-model:value="selectedUser"
            :grpIdList="grpIdList"
            :valueType="userValueType"
            :isHiredOnly="isHiredOnly"
            :allSubordinate="allSubordinate"
            :readonly="userReadonly"
            placeholder="請選擇人員"
          ></employee-select>
        </FormItem>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, type PropType } from "vue";
import departmentApi from "@/core/api/department-api";
import { find } from "lodash-es";

const emit = defineEmits([
  "on-admin-division-change",
  "update:adminDivisionId",
  "on-division-change",
  "update:divisionId",
  "on-department-change",
  "update:departmentId",
  "on-district-change",
  "update:districtId",
  "on-center-change",
  "update:centerId",
  "on-section-change",
  "update:sectionId",
  "on-org-change",
  "update:organizationId",
  "on-user-change",
  "update:userId",
]);

const props = defineProps({
  // 根節點組織/群組代碼清單, Ref DATAASYNC.TB_GROUP.GRP_ID
  rootGrpId: {
    type: String,
    required: false,
    default: "C004AA", // C004AA: 總經理室
  },
  // 總處級單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  adminDivisionId: {
    type: String,
    required: false,
    default: "C810AA", // C810AA: 信用卡總處
  },
  // 處級單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  divisionId: {
    type: String,
    required: false,
  },
  // 部級單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  departmentId: {
    type: String,
    required: false,
  },
  // 區級單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  districtId: {
    type: String,
    required: false,
  },
  // 中心/分行單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  centerId: {
    type: String,
    required: false,
  },
  // 科組單位代碼, Ref DATAASYNC.TB_GROUP.GRP_ID
  sectionId: {
    type: String,
    required: false,
  },
  // 使用者代碼
  userId: {
    type: String,
    required: false,
  },
  // 總處級單位是否顯示
  isShowAdminDivision: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 處級單位是否顯示
  isShowDivision: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 部級單位是否顯示
  isShowDepartment: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 區級單位是否顯示
  isShowDistrict: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 中心/分行單位是否顯示
  isShowCenter: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 科組單位是否顯示
  isShowSection: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 使用者是否顯示
  isShowUser: {
    type: Boolean,
    required: false,
    default: true,
  },
  // Label是否顯示
  isShowLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  // 總處級單位是否唯讀
  adminDivisionReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 處級單位是否唯讀
  divisionReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 部級單位是否唯讀
  departmentReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 區級單位是否唯讀
  districtReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 中心/分行單位是否唯讀
  centerReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 科組單位是否唯讀
  sectionReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 人員是否唯讀
  userReadonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 是否限啟用組織/群組(Y|N)
  activatedGrp: {
    type: String as PropType<"Y" | "N">,
    required: false,
    default: "Y", // Y: 限啟用組織/群組
  },
  // 是否限在職人員(Y|N)
  isHiredOnly: {
    type: String,
    required: false,
    default: "Y", // Y: 限在職人員
  },
  // 是否包含所有子單位(Y|N)
  allSubordinate: {
    type: String,
    required: false,
    default: "N", // N: 不包含子單位
  },
  // User Value類型, A: AD帳號、E: 員工編號
  userValueType: {
    type: String,
    required: false,
    default: "A", // A: AD帳號
  },
  // 上方的佔位格數，可選總計0〜24的整數，為0時，相當於display:none
  colSpan: {
    type: Number,
    required: false,
    default: 8,
  },
});

// 所選根節點單位
const selectedRootGrpId = ref("");
// 所選總處級單位
const selectedAdminDivision = ref("");
// 所選處級單位
const selectedDivision = ref("");
// 所選部級單位
const selectedDepartment = ref("");
// 所選區級單位
const selectedDistrict = ref("");
// 所選中心/分行單位
const selectedCenter = ref("");
// 所選科組單位
const selectedSection = ref("");
// 所選使用者
const selectedUser = ref("");

/**
 * 總處級單位的上層單位
 */
const upAdminDivisions = computed(() => {
  return [selectedRootGrpId.value];
});
/**
 * 處級單位的上層單位
 */
const upDivisions = computed(() => {
  return [selectedAdminDivision.value || selectedRootGrpId.value];
});
/**
 * 部級單位的上層單位
 */
const upDepartments = computed(() => {
  return [
    selectedDivision.value ||
      selectedAdminDivision.value ||
      selectedRootGrpId.value,
  ];
});

/**
 * 區級單位的上層單位
 */
const upDistricts = computed(() => {
  return [
    selectedDepartment.value ||
      selectedDivision.value ||
      selectedAdminDivision.value ||
      selectedRootGrpId.value,
  ];
});

/**
 * 中心/分行單位的上層單位
 */
const upCenters = computed(() => {
  return [
    selectedDistrict.value ||
      selectedDepartment.value ||
      selectedDivision.value ||
      selectedAdminDivision.value ||
      selectedRootGrpId.value,
  ];
});
/**
 * 科組單位的上層單位
 */
const upSections = computed(() => {
  return [
    selectedCenter.value ||
      selectedDistrict.value ||
      selectedDepartment.value ||
      selectedDivision.value ||
      selectedAdminDivision.value ||
      selectedRootGrpId.value,
  ];
});

/**
 * 使用者組織/群組代碼清單
 */
const grpIdList = computed(() => {
  return [
    selectedSection.value ||
      selectedCenter.value ||
      selectedDistrict.value ||
      selectedDepartment.value ||
      selectedDivision.value ||
      selectedAdminDivision.value ||
      selectedRootGrpId.value,
  ];
});
/**
 * 最小選中層級組織/群組代碼
 */
const organizationId = computed(() => {
  return (
    selectedSection.value ||
    selectedCenter.value ||
    selectedDistrict.value ||
    selectedDepartment.value ||
    selectedDivision.value ||
    selectedAdminDivision.value
  );
});
/**
 * props帶入最小組織/群組代碼
 */
const leafPropsGrpId = computed(() => {
  return (
    props.sectionId ||
    props.centerId ||
    props.districtId ||
    props.departmentId ||
    props.divisionId ||
    props.adminDivisionId ||
    props.rootGrpId
  );
});
/**
 * 總處Label
 */
const adminDivisionLabel = computed(() => {
  return props.isShowLabel ? "總處單位" : "";
});

/**
 * 事業處Label
 */
const divisionLabel = computed(() => {
  return props.isShowLabel ? "處級單位" : "";
});

/**
 * 部門Label
 */
const departmentLabel = computed(() => {
  return props.isShowLabel ? "部級單位" : "";
});

/**
 * 分區Label
 */
const districtLabel = computed(() => {
  return props.isShowLabel ? "區級單位" : "";
});

/**
 * 中心/分行Label
 */
const centerLabel = computed(() => {
  return props.isShowLabel ? "中心/分行單位" : "";
});

/**
 * 科組Label
 */
const sectionLabel = computed(() => {
  return props.isShowLabel ? "科組單位" : "";
});

/**
 * 人員Label
 */
const userLabel = computed(() => {
  return props.isShowLabel ? "人員" : "";
});

/**
 * 總處級單位異動處理器
 */
function onAdminDivisionChangeHandler() {
  selectedDivision.value = ""; // 處級
  selectedDepartment.value = ""; // 部級
  selectedDistrict.value = ""; // 區級
  selectedCenter.value = ""; // 中心/分行
  selectedSection.value = ""; // 科組
  selectedUser.value = ""; // 人員
}
/**
 * 處級單位異動處理器
 */
function onDivisionChangeHandler() {
  selectedDepartment.value = ""; // 部級
  selectedDistrict.value = ""; // 區級
  selectedCenter.value = ""; // 中心/分行
  selectedSection.value = ""; // 科組
  selectedUser.value = ""; // 人員
}
/**
 * 部級單位異動處理器
 */
function onDepartmentChangeHandler() {
  selectedDistrict.value = ""; // 區級
  selectedCenter.value = ""; // 中心/分行
  selectedSection.value = ""; // 科組
  selectedUser.value = ""; // 人員
}
/**
 * 區級單位異動處理器
 */
function onDistrictChangeHandler() {
  selectedCenter.value = ""; // 中心/分行
  selectedSection.value = ""; // 科組
  selectedUser.value = ""; // 人員
}
/**
 * 中心/分行單位異動處理器
 */
function onCenterChangeHandler() {
  selectedSection.value = ""; // 科組
  selectedUser.value = ""; // 人員
}
/**
 * 科組單位異動處理器
 */
function onSectionChangeHandler() {
  selectedUser.value = ""; // 人員
}

/**
 * 監聽總處級單位
 */
watch(selectedAdminDivision, () => {
  emit("on-admin-division-change", selectedAdminDivision.value);
  emit("update:adminDivisionId", selectedAdminDivision.value);
});
/**
 * 監聽處級單位
 */

watch(selectedDivision, () => {
  emit("on-division-change", selectedDivision.value);
  emit("update:divisionId", selectedDivision.value);
});
/**
 * 監聽部級單位
 */
watch(selectedDepartment, () => {
  emit("on-department-change", selectedDepartment.value);
  emit("update:departmentId", selectedDepartment.value);
});
/**
 * 監聽區級單位
 */
watch(selectedDistrict, () => {
  emit("on-district-change", selectedDistrict.value);
  emit("update:districtId", selectedDistrict.value);
});
/**
 * 監聽中心/分行單位
 */
watch(selectedCenter, () => {
  emit("on-center-change", selectedCenter.value);
  emit("update:centerId", selectedCenter.value);
});
/**
 * 監聽科組單位
 */
watch(selectedSection, () => {
  emit("on-section-change", selectedSection.value);
  emit("update:sectionId", selectedSection.value);
});
/**
 * 監聽最小選中層級組織/群組代碼
 */
watch(organizationId, () => {
  emit("on-org-change", organizationId.value);
  emit("update:organizationId", organizationId.value);
});
/**
 * 監聽使用者
 */
watch(selectedUser, () => {
  emit("on-user-change", selectedUser.value);
  emit("update:userId", selectedUser.value);
});

onMounted(async () => {
  // 查詢上層組織/群組清單 --------------------------------------------------------------------------------------------
  let upperUnits = await departmentApi.doQryUpperUnits({
    grpId: leafPropsGrpId.value,
    activatedGrp: props.activatedGrp,
  });

  // 總處級單位 -------------------------------------------------------------------------------------------------------
  selectedAdminDivision.value =
    find(upperUnits, (row) => {
      return "L50" === row.grpUnitcode; // L50: 總處級單位
    })?.grpId || "";

  // 處級單位 ---------------------------------------------------------------------------------------------------------
  selectedDivision.value =
    find(upperUnits, (row) => {
      return "L55" === row.grpUnitcode; // L55: 處級單位
    })?.grpId || "";

  // 部級單位 ---------------------------------------------------------------------------------------------------------
  selectedDepartment.value =
    find(upperUnits, (row) => {
      return "L60" === row.grpUnitcode; // L60: 部級單位
    })?.grpId || "";

  // 區級單位 ---------------------------------------------------------------------------------------------------------
  selectedDistrict.value =
    find(upperUnits, (row) => {
      return "L70" === row.grpUnitcode; // L70: 區級單位
    })?.grpId || "";

  // 中心/分行單位 ----------------------------------------------------------------------------------------------------
  selectedCenter.value =
    find(upperUnits, (row) => {
      return "L80" === row.grpUnitcode; // L80: 中心/分行單位
    })?.grpId || "";

  // 科組單位 ---------------------------------------------------------------------------------------------------------
  selectedSection.value =
    find(upperUnits, (row) => {
      return "L90" === row.grpUnitcode; // L90: 科組單位
    })?.grpId || "";

  selectedRootGrpId.value = props.rootGrpId;
  selectedUser.value = props.userId || ""; // 人員
});
</script>

<style lang="scss" scoped></style>
