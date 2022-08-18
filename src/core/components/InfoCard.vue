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
import { onDeactivated, reactive, computed, ref } from "vue";
import { split, head, drop, join } from "lodash-es";
import infoCardApi from "@/core/api/info-card-api";

const props = defineProps({
  // 使用者AD帳號
  adAccount: {
    type: String,
    required: true,
  },
});

// 顯示popTip
// const visible = ref(false);
// 是否為信用卡處人員
// const isCreditCardMember = ref(false);
// 被查詢者AD帳號
const queriedAdAccount = ref("");
// 使用者卡片資訊
const userInfoCard = ref({
  cname: "",
  deptName: "",
  deptPhoneNo: "",
  lempDeptSectId: "",
  employeeNo: "",
  genderCode: "",
  genderName: "",
  isCreditCardMember: "",
  isDialable: "",
  jobTitleCode: "",
  jobTitleName: "",
  officeEmail: "",
  officePhoneext: "",
  positionCode: "",
  positionName: "",
  userExtension: null,
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
  return "mailto:" + userInfoCard.value.officeEmail;
});

/** 受話者電話號碼 */
const telephone = computed(() => {
  if (userInfoCard.value.deptPhoneNo && userInfoCard.value.officePhoneext) {
    return (
      userInfoCard.value.deptPhoneNo + "#" + userInfoCard.value.officePhoneext
    );
  }
  return userInfoCard.value.deptPhoneNo;
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
  if (!userInfoCard.value.genderCode) return;
  return userInfoCard.value.genderCode === "1" ? "male" : "female";
});

/** 是否可進行撥號 */
const dialable = computed(() => {
  return userInfoCard.value.isDialable === "Y" || true; // Y: 可撥號
});

/**
 * 系統撥號
 */
async function doAutoDial() {
  alertModal.title = "通知";
  alertModal.content = "系統撥號中...";
  alertModal.loading = true;

  await infoCardApi.callAutoDial(userInfoCard.value);

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
  userInfoCard.value = await infoCardApi.doGetEmployeeInfoCard({
    adAccount: props.adAccount,
  });

  // 3. 取得被查詢者所屬單位清單 -------------------------------------------------------------------------------------
  let deptName = split(userInfoCard.value.deptName, " ");
  userDivision.value = head(deptName) as string;
  userDept.value = drop(deptName) as string[];
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
