<template>
  <div>
    <iframe
      name="message_bridge_iframe"
      :src="notifyUrl"
      width="0"
      height="0"
      hidden="true"
    ></iframe>
    <Modal
      title="閒置時間逾時提醒!!"
      :value="showReminder"
      :closable="false"
      :mask-closable="false"
      @on-ok="doKeepSessionAlive"
      @on-cancel="logout"
      ok-text="繼續使用"
      cancel-text="登出系統"
    >
      <p>
        您的閒置時間過長，系統即將於{{ remainingMinutes }}:
        {{ remainingSeconds }}後自動登出，請問是否繼續使用?
      </p>
    </Modal>

    <!-- <BlockUI :message="logoutMsg" v-show="isShowSpinner">
      <font-awesome-icon icon="cog" size="3x" spin fixed-width> </font-awesome-icon>
    </BlockUI> -->

    <font-awesome-icon
      v-show="remainingMinutes >= 8"
      icon="hourglass-start"
      class="countDownIconStyle"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>

    <font-awesome-icon
      v-show="remainingMinutes >= 1 && remainingMinutes < 8"
      icon="hourglass-half"
      class="countDownIconStyle"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>

    <font-awesome-icon
      v-show="remainingMinutes < 1"
      icon="hourglass-end"
      class="countDownIconStyle"
      fixed-width
      @click="doKeepSessionAlive"
    ></font-awesome-icon>
    {{ remainingTime }}
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import moment from "moment";
import { computed } from "@vue/reactivity";
import { useGlobalStore } from "@/stores/global";
import _ from "lodash";
import sessionKeeperApi from "@/api/core/session-keeper-api";
import messageBridgeApi from "@/api/core/message-bridge-api";

const globalStore = useGlobalStore();
// const notifyUrl = import.meta.env.VITE_APP_EPSP_HOME_URL + "/message_bridge.html";
const notifyUrl = "http://localhost:8888" + "/message_bridge.html";

const logoutMsg = "系統登出中，請稍候!!";
const now = ref(moment());
const isShowSpinner = ref(false);

/** Session timeout時間 */
const sessionExpiredTime = computed(() => {
  return globalStore.axios.sessionExpiredTime;
});
/** 彈出提醒視窗時間 */
const warningDateTime = computed(() => {
  return moment(sessionExpiredTime.value).subtract(1, "minutes");
});

/** 剩餘時間(分) */
const remainingMinutes = computed(() => {
  let distance = (moment(sessionExpiredTime.value).toDate() as any) - (now.value.toDate() as any);
  return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
});

/** 剩餘時間(秒) */
const remainingSeconds = computed(() => {
  let distance = (moment(sessionExpiredTime.value).toDate() as any) - (now.value.toDate() as any);
  return Math.floor((distance % (1000 * 60)) / 1000);
});

/** 剩餘時間 */
const remainingTime = computed(() => {
  return `${formatRemaining(remainingMinutes.value)}:${formatRemaining(remainingSeconds.value)}`;
});

/** 是否彈出提醒視窗 */
const showReminder = computed(() => {
  return now.value.isAfter(warningDateTime.value);
});

/** 格式化時間(若小於0，則回傳00，若為個位數，則前面補0) */
function formatRemaining(time: any) {
  if (time < 1) {
    return "00";
  }
  return _.padStart(time, 2, "0");
}

function doKeepSessionAlive() {
  sessionKeeperApi.doKeepSessionAlive();
}


onMounted(() => {
  sessionKeeperApi.doKeepSessionAlive();

  /** 廣播訊息監聽器 */
  window.addEventListener("message", (e) => {
    console.log(e);
    // 倒數計時重置 ----------------------------------------------------------------------------------------------------
    if (
      "countdown-reset" === e.data.toString() &&
      import.meta.env.VITE_APP_EPSP_HOME_URL === e.origin
    ) {
      globalStore.doResetSessionExpiredTime();
    }

    // 單點登出(SLO) ---------------------------------------------------------------------------------------------------
    if (
      "single-logout" === e.data.toString() &&
      import.meta.env.VITE_APP_EPSP_HOME_URL === e.origin
    ) {
      // this.$Modal.warning({
      //   title: "登出通知",
      //   content: "<p>您已於其他系統登出，請重新操作!!</p>",
      //   onOk: () => {
      //     location.reload();
      //   },
      // });
    }
  });

  window.setInterval(() => {
    now.value = moment();
  }, 1 * 1000);
});
</script>

<style scoped>
.countDownIconStyle {
  cursor: pointer;
}
</style>
