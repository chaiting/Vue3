<template>
  <Row>
    <Col span="8">
      <div class="navPageLogo">
        <a :href="homeUrl" target="_blank">
          <img src="@/assets/images/logo_white_esun.svg" title="玉山銀行E.SUN Bank" />
        </a>
      </div>
      <div class="navPageTitle">| {{ systemTitle }}</div>
    </Col>
    <Col span="16">
      <div class="navBar">
        <Button type="error" @click="logout">logout</Button>
      </div>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { getCurrentInstance } from "vue";
import { useGlobalStore } from "@/stores/global";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
const app = getCurrentInstance();

function logout() {
  app?.appContext.config.globalProperties.$keycloak.logoutFn();
}

const systemTitle = computed(() => {
  return `${profileStore.loginUserProfile.system.sysId} ${profileStore.loginUserProfile.system.sysNm}`;
});

const homeUrl = "";
</script>

<style lang="scss" scoped>
.nav {
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.06em;
}
.navPageLogo {
  margin-top: calc((60px - 36px) / 2);
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.navPageTitle {
  color: white;
  margin-top: calc((60px - 54px) / 2);
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  float: left;
}
.navBar {
  float: right;
}
.navFunction {
  margin-right: 15px;
  float: left;
}
.navBar > div:last-child {
  margin-right: 0;
}
.userContainer {
  padding-left: 29px;
  background-size: 24px;
  background-position: left center;
  background-repeat: no-repeat;
}
.btnUiStyle {
  height: 36px;
  line-height: 36px;
  border-radius: 18px;
  font-size: 16px;
  padding: 0 15px;
  border: 0;
  outline: none;
  cursor: pointer;
}
.btnNavImage {
  width: 36px;
  background-color: transparent;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
}
.btnNavImage:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.functionContainer {
  margin-top: calc((60px - 36px) / 2);
}
</style>
