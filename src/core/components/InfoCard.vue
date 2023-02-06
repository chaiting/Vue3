<template>
  <Poptip placement="bottom" transfer>
    <!-- slot -->
    <div @click="doGetEmployeeInfoCard" class="cardStyle">
      <slot></slot>
    </div>
    <template #content>
      <div class="infoCardContainer">
        <div class="infoCardIconContainer">
          <!-- 頭像 -->
          <div class="infoCardIcon" :class="sex"></div>
        </div>
        <div class="infoCardContentContainer">
          <!-- 人員名稱 -->
          <div class="infoCardName">
            {{ userInfoCard.cname }} {{ userInfoCard.employeeNo }}
          </div>
          <!-- 人員處級單位 -->
          <div class="infoCardDivision">
            {{ userDivision }}
          </div>
          <!-- 人員部級以下單位 -->
          <div class="infoCardDept">
            {{ department }}
          </div>
          <!-- 人員職稱 -->
          <div class="infoCardPosition">{{ userInfoCard.jobTitleName }}</div>
          <!-- 人員電話號碼 -->
          <div class="infoCardTel">
            {{ telephone }}
          </div>
          <div class="infoCardBtnContainer">
            <!-- 撥號功能 -->
            <a @click.prevent="doAutoDial" v-if="dialable">
              <div class="infoCardBtn phone-img"></div>
            </a>
            <!-- EMAIL功能 -->
            <a v-if="userInfoCard.officeEmail" :href="emailLink">
              <div class="infoCardBtn mail-img"></div>
            </a>
          </div>
        </div>
      </div>
    </template>
  </Poptip>

  <!-- 系統撥號顯示 -->
  <esun-alert
    v-model:value="alertModal.loading"
    :title="alertModal.title"
    :content="alertModal.content"
  ></esun-alert>
</template>

<script setup lang="ts">
import isBlank from "is-blank";
import { split, head, drop, join } from "lodash-es";
import { onDeactivated, reactive, computed, ref } from "vue";
import infoCardApi from "@/core/api/info-card-api";
import type { NullableType } from "@/core/type/utils-types";

const props = defineProps({
  // 使用者AD帳號
  adAccount: {
    type: String,
    required: true,
  },
});
// 被查詢者AD帳號
const queriedAdAccount = ref("");
// 使用者卡片資訊
const userInfoCard = reactive({
  // 中文姓名
  cname: "",
  // 單位名稱
  deptName: "",
  // 公司電話
  deptPhoneNo: "",
  // 所屬單位科別代碼
  empDeptSectId: "",
  // 員工編號
  employeeNo: "",
  // 性別
  genderCode: "",
  // 性別名稱
  genderName: "",
  // 是否為卡處人員
  isCreditCardMember: "",
  // 是否允許撥號
  isDialable: "",
  // 職務代碼
  jobTitleCode: "",
  // 職務名稱
  jobTitleName: "",
  // 公司EMAIL
  officeEmail: "",
  // 分機
  officePhoneext: "",
  // 職務代碼
  positionCode: "",
  // 職務代碼名稱
  positionName: "",
  // 查詢者分機
  userExtension: null as NullableType<string>,
});
// 使用者處級單位名稱
const userDivision = ref("");
// 使用者部門層級以下名稱
const userDept = ref<string[]>([]);
// 系統撥號顯示
const alertModal = reactive({
  loading: false,
  title: "",
  content: "",
});

/** 信箱連結 */
const emailLink = computed(() => {
  return "mailto:" + userInfoCard.officeEmail;
});

/** 受話者電話號碼 */
const telephone = computed(() => {
  if (userInfoCard.deptPhoneNo && userInfoCard.officePhoneext) {
    return userInfoCard.deptPhoneNo + "#" + userInfoCard.officePhoneext;
  }
  return userInfoCard.deptPhoneNo;
});

/** 受話者部門層級以下單位 */
const department = computed(() => {
  if (userDept.value.length > 1) {
    return join(userDept.value, " / ");
  }
  return head(userDept.value);
});

/** 受話者性別 */
const sex = computed(() => {
  if (!userInfoCard.genderCode) return;
  return userInfoCard.genderCode === "1" ? "male" : "female";
});

/** 是否可進行撥號 */
const dialable = computed(() => {
  return userInfoCard.isDialable === "Y" || true; // Y: 可撥號
});

/**
 * 系統撥號
 */
async function doAutoDial() {
  alertModal.title = "通知";
  alertModal.content = "系統撥號中...";
  alertModal.loading = true;

  await infoCardApi.callAutoDial(userInfoCard);

  setTimeout(() => {
    alertModal.loading = false;
  }, 3000);
}

/**
 * 取得行內使用者資訊卡片資訊
 */
async function doGetEmployeeInfoCard() {
  // 1. AD帳號查詢檢核 -----------------------------------------------------------------------------------------------
  if (isBlank(props.adAccount)) {
    return;
  }

  if (queriedAdAccount.value === props.adAccount) {
    return;
  }

  // 2. 查詢資訊小卡片資訊 -------------------------------------------------------------------------------------------
  queriedAdAccount.value = props.adAccount;
  const result = await infoCardApi.doGetEmployeeInfoCard({
    adAccount: props.adAccount,
  });

  userInfoCard.cname = result.cname;
  userInfoCard.deptName = result.deptName;
  userInfoCard.deptPhoneNo = result.deptPhoneNo || "";
  userInfoCard.empDeptSectId = result.empDeptSectId;
  userInfoCard.employeeNo = result.employeeNo;
  userInfoCard.genderCode = result.genderCode || "";
  userInfoCard.genderName = result.genderName || "";
  userInfoCard.isCreditCardMember = result.isCreditCardMember;
  userInfoCard.isDialable = result.isDialable;
  userInfoCard.jobTitleCode = result.jobTitleCode;
  userInfoCard.jobTitleName = result.jobTitleName;
  userInfoCard.officeEmail = result.officeEmail || "";
  userInfoCard.officePhoneext = result.officePhoneext || "";
  userInfoCard.positionCode = result.positionCode || "";
  userInfoCard.positionName = result.positionName || "";
  userInfoCard.userExtension = result.userExtension;

  // 3. 取得被查詢者所屬單位清單 -------------------------------------------------------------------------------------
  const deptName = split(userInfoCard.deptName, " ");
  userDivision.value = head(deptName)!;
  userDept.value = drop(deptName);
}

onDeactivated(() => {
  alertModal.loading = false;
});
</script>
<style lang="less" scoped>
.cardStyle {
  font-weight: bold;
  color: #45b29d;
}
.cardStyle:hover {
  color: #3aa48f;
  text-decoration: underline;
  cursor: pointer;
}
.infoCardContainer {
  padding: 10px 5px 45px 5px;
  // min-width: 360px;
  // min-height: 180px;
  display: inline-block;
}
.infoCardIconContainer {
  margin-right: 20px;
}
.infoCardIcon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(167, 166, 166, 0.15);
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
  background-image: url("@/assets/images/ic_gray_user.svg");
}
.infoCardIcon.female {
  background-color: rgba(255, 165, 186, 0.15);
}
.infoCardIcon.male {
  background-color: rgba(134, 177, 225, 0.15);
}
.infoCardIconContainer,
.infoCardContentContainer {
  float: left;
}
.infoCardContentContainer {
  line-height: 1.5;
}
.infoCardName {
  font-size: 20px;
}
.infoCardPosition {
  color: #979797;
}
.infoCardBtnContainer {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.infoCardBtnContainer a {
  float: left;
  margin-right: 15px;
}
.infoCardBtn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #979797;
  background-repeat: no-repeat;
  background-size: 26px;
  background-position: center;
  opacity: 0.9;
}
.infoCardBtn:hover {
  background-color: #fbfbfb;
  opacity: 1;
}
.phone-img {
  background-image: url("@/assets/images/ic_gray_phone.svg");
}
.mail-img {
  background-image: url("@/assets/images/ic_gray_mail.svg");
}
</style>
