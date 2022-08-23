<template>
  <div>
    <div @click="doGetDialInfo" class="slotStyle">
      <slot></slot>
    </div>

    <Modal
      v-model="isVisible"
      width="60vh"
      class="esun-modal"
      :title="'系統撥號 ' + sysName"
    >
      <!-- 顧客資訊 -->
      <Row>
        <Col span="16">
          名稱：
          <Tooltip
            max-width="200"
            :content="customerName"
            placement="top"
            transfer
          >
            <span>{{ customerInfo }}</span>
          </Tooltip>
          {{ customerId }}
        </Col>
        <Col span="8">業務編號：{{ businessId }}</Col>
      </Row>

      <!-- 顧客電話頁籤 -->
      <Tabs type="card" v-model="tabsNm" class="margin-row">
        <!-- 基本資料 -->
        <TabPane label="基本資料" name="基本資料">
          <Row>
            <Col span="19" offset="5">
              <customer-phone-list
                :callingNumber="extension"
                :isDialable="isDialable"
                :phoneList="customerPhoneList"
                :customerId="customerId"
                :customerName="customerName"
                :customerSex="customerSex"
                :businessId="businessId"
                :srcFuncCode="srcFuncCode"
                :srcFuncName="funcNameInfo"
              ></customer-phone-list>
            </Col>
          </Row>
        </TabPane>

        <!-- 周邊系統 -->
        <TabPane :label="sysName" :name="sysName" v-if="isShowSysTab">
          <Row>
            <Col span="19" offset="5">
              <customer-phone-list
                :callingNumber="extension"
                :isDialable="isDialable"
                :phoneList="customerTelList"
                :customerId="customerId"
                :customerName="customerName"
                :customerSex="customerSex"
                :businessId="businessId"
                :srcFuncCode="srcFuncCode"
                :srcFuncName="funcNameInfo"
              ></customer-phone-list>
            </Col>
          </Row>
        </TabPane>

        <!-- 快速撥號 -->
        <TabPane label="快速撥號" name="快速撥號" v-if="isDialable">
          <Row>
            <Col span="10" offset="8" class="dialler-content">
              <dialler
                :callingNumber="extension"
                :calledId="customerId"
                :calledInfo="customerName"
                :srcFuncCode="srcFuncCode"
                :srcFuncName="funcNameInfo"
                :businessId="businessId"
              ></dialler>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Row class="margin-row">
        <Col span="24">
          <!-- 顧客通話紀錄 -->
          <Table :columns="columns" :data="dialRecordList">
            <template v-slot:user="{ row }">
              <info-card :adAccount="row.userId">
                {{ row.userNm + "(" + row.userNo + ")" }}
              </info-card>
            </template>
          </Table>
        </Col>
      </Row>

      <!-- Button -->
      <template #footer>
        <Button type="text" size="large" @click="closeModal">關閉 </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import isBlank from "is-blank";
import { ref, computed, watch } from "vue";
import codeApi from "@/core/api/code-api";
import sysDialApi from "@/core/api/sys-dial-api";
import customerApi from "@/core/api/customer-api";
import Dialler from "@/core/components/dial/Dialler.vue";
import CustomerPhoneList from "@/core/components/dial/CustomerPhoneList.vue";
import { useProfileStore } from "@/core/store/profile";
import { truncate } from "lodash-es";

const profileStore = useProfileStore();

const props = defineProps({
  // 是否顯示系統頁籤
  isShowSysTab: {
    type: Boolean,
    required: false,
    default: false,
  },
  // 顧客撥號清單, isShowSysTab = true 才有效
  customerTelList: {
    type: Array,
    required: false,
    default: () => [],
  },
  // 顧客ID
  customerId: {
    type: String,
    required: true,
  },
  // 顧客類別, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=157
  customerType: {
    type: String,
    required: true,
  },
  // 顧客姓名
  customerName: {
    type: String,
    required: false,
  },
  // 顧客性別, Ref DATASHARE.TB_SYS_CD.CD_ID, CT_ID=159
  customerSex: {
    type: String,
    required: false,
  },
  // 功能代碼
  srcFuncCode: {
    type: String,
    required: true,
  },
  // 功能代碼名稱
  srcFuncName: {
    type: String,
    required: true,
  },
  // 業務編號
  businessId: {
    type: String,
    required: false,
    default: "",
  },
});

// 是否顯示周邊系統撥號modal
const isVisible = ref(false);
// tabs name
const tabsNm = ref("基本資料");
// 使用者分機
const extension = ref("");
// 是否允許使用者撥號
const isDialable = ref(false);
// 顧客性別名稱
const sexName = ref("");
// 顧客電話清單
const customerPhoneList = ref([]);
// table header
const columns = ref([
  {
    title: "系統名稱",
    key: "sysNm",
  },
  {
    title: "撥號業務項目",
    key: "funcNm",
  },
  {
    title: "業務編號",
    key: "refProckey",
  },
  {
    title: "受話號碼",
    key: "calledNumber",
    maxWidth: 130,
  },
  {
    title: "通話狀態",
    key: "callStatusNm",
    maxWidth: 100,
  },
  {
    title: "通話時間",
    key: "callTime",
    maxWidth: 190,
  },
  {
    title: "發話人員",
    slot: "user",
    maxWidth: 150,
  },
]);
// 顧客撥號記錄清單
const dialRecordList = ref([]);

const optUserProfile = computed(() => {
  return profileStore.optUserProfile;
});
// ...mapGetters(["optUserProfile"]),
/**
 * 系統名稱
 */
const sysName = computed(() => {
  return optUserProfile.value.system.sysNm || "";
});
/**
 * 功能名稱資訊
 */
const funcNameInfo = computed(() => {
  return props.srcFuncName + "(" + tabsNm.value + ")";
});
/**
 * 顧客短名稱
 */
const shortNm = computed(() => {
  return truncate(props.customerName, { length: 20, separator: " " });
});
/**
 * 顧客性別名稱
 */
const sexInfo = computed(() => {
  return isBlank(sexName.value) ? "" : "(" + sexName.value + ")";
});
/**
 * 顧客資訊
 */
const customerInfo = computed(() => {
  return shortNm.value + sexInfo.value;
});

/**
 * 取得撥號相關資訊
 */
async function doGetDialInfo() {
  isVisible.value = true;

  if (isBlank(props.customerId)) {
    return;
  }

  // 1. 查詢顧客電話清單 -----------------------------------------------------------------------------------------------
  customerPhoneList.value = await customerApi.doQryCustomerPhones({
    customerId: props.customerId,
    customerType: props.customerType,
  });

  // 2. 查詢行內使用者撥號資訊 -----------------------------------------------------------------------------------------
  let dialInfo = await sysDialApi.doGetEmployeeDialInfo();

  extension.value = dialInfo.extension || "****";
  isDialable.value = "Y" == dialInfo.isCreditCardMember; // Y: 是信用卡處人員

  // 3. 查詢顧客撥號紀錄 -----------------------------------------------------------------------------------------------
  let result = await sysDialApi.doQryCustomerDialHistory(props.customerId);
  dialRecordList.value = result.customerDialList;
}
/**
 * 關閉視窗
 */
function closeModal() {
  isVisible.value = false;
}

/**
 * 監聽顧客性別
 */
watch(
  () => props.customerSex,
  async () => {
    if (!isBlank(props.customerSex)) {
      sexName.value = await codeApi.doGetCodeName(
        "159",
        props.customerSex as string
      );
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.slotStyle {
  font-weight: bold;
  color: #45b29d;
}
.margin-row {
  margin-top: 15px;
}
.dialler-content {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
