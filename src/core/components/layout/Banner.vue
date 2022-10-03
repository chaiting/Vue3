<template>
  <div class="nav">
    <Row>
      <Col span="8">
        <div class="navPageLogo">
          <a :href="homeUrl" target="_blank">
            <img
              src="@/assets/images/logo_white_esun.svg"
              title="玉山銀行E.SUN Bank"
            />
          </a>
        </div>
        <div class="navPageTitle">| {{ systemTitle }}</div>
      </Col>
      <Col span="16">
        <div class="navBar">
          <div class="navFunction userContainer">
            {{ loginUserProfile.grpNm }}
            {{ loginUserProfile.empName }}
            {{ loginUserProfile.empNo }}
          </div>
          <!-- countdown -->
          <div class="navFunction">
            <countdown></countdown>
          </div>
          <!-- logout -->
          <div class="navFunction functionContainer">
            <button class="btnUiStyle btnNavImage" @click="logout"></button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProfileStore } from "@/core/store/profile";
import { useAuth } from "@/core/hook/useAuth";
import Countdown from "@/core/components/misc/Countdown.vue";

const { logout } = useAuth();
const profileStore = useProfileStore();
const homeUrl = import.meta.env.VITE_APP_EPSP_HOME_URL;

const systemTitle = computed(() => {
  return `${profileStore.loginUserProfile.system?.sysId} ${profileStore.loginUserProfile.system?.sysNm}`;
});

const loginUserProfile = computed(() => {
  return profileStore.loginUserProfile;
});
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
  background-repeat: no-repeat;
}
.navBar > div:last-child {
  margin-right: 0;
}
.userContainer {
  padding-left: 29px;
  background-size: 24px;
  background-position: left center;
  background-repeat: no-repeat;
  background-image: url("@/assets/images/ic_white_user.svg");
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
  background-image: url("@/assets/images/ic_white_log_out.svg");
}
.btnNavImage:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.functionContainer {
  margin-top: calc((60px - 36px) / 2);
}
</style>
