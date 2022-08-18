<template>
  <div>
    <div class="formContainer">
      <header>Oops, 系統維護！</header>
      <div class="formContent formErrorPage">
        <div class="formContentFirst">
          <div class="errorPageIcon">
            <img src="@/assets/images/ic_big_red_alert.svg" />
          </div>
        </div>

        <div class="formContentSec">
          <div class="errorPageContent">
            <div class="mainContent">親愛的主管/同仁，您好：</div>
            <div class="mainContent">
              <p class="emp">目前系統暫時無法使用！造成不便，敬請見諒。</p>
            </div>
            <div class="errorNo">（錯誤碼：{{ spanId }}）</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/global";
import { computed } from "vue";

const globalStore = useGlobalStore();

const spanId = computed(() => {
  return globalStore.spanId;
});
</script>

<style lang="scss" scoped>
.contentContainer {
  width: 98%;
  max-width: 1200px;
  margin: 0 auto;
  letter-spacing: 0.03em;
}
.formContainer {
  background: #fff;
  border-radius: 5px;
  padding: 25px 5%;
}
header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
}
.fontContent {
  width: 100%;
  display: inline-block;
}
.formErrorPage .formContentFirst {
  width: 30%;
  margin-right: 0;
}
.formContentFirst {
  float: left;
  position: relative;
}
.errorPageIcon {
  width: 250px;
  height: 200px;
  margin: 0 auto 0 auto;
}
.errorPageIcon img {
  width: 180px;
  height: 180px;
}
.formErrorPage .formContentSec {
  width: 52%;
  margin-bottom: 40px;
}
.formContentSec {
  display: inline-block;
  position: relative;
}
.errorPageContent {
  margin-top: 40px;
  margin-bottom: 20px;
}
.errorPageContent .mainContent {
  font-size: 26px;
  line-height: 1.5;
  margin-bottom: 15px;
}
.errorPageContent .mainContent p.emp {
  color: #f94e4e;
}
.errorNo {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #0044bb;
}
</style>
