import { defineStore } from "pinia";
import type { LeftMenuList, Profile } from "@/core/type/user-profile-api";

const INIT_USER_PROFILE = {
  empName: "",
  empNo: "",
  system: {
    sysNm: "",
    leftMenuList: [] as LeftMenuList,
  },
} as Partial<Profile>;

export const useProfileStore = defineStore({
  id: "profile",
  state: () => ({
    defaultUserProfile: INIT_USER_PROFILE,
    userProfile: {
      optUserProfile: INIT_USER_PROFILE,
      loginUserProfile: INIT_USER_PROFILE,
    },
  }),
  getters: {
    isLogin: (state) => {
      return state.userProfile.optUserProfile.adAccount !== null;
    },
    leftMenus: (state) => {
      return state.userProfile.optUserProfile.system!.leftMenuList;
    },
    loginUserProfile: (state) => {
      return state.userProfile.loginUserProfile;
    },
    optUserProfile: (state) => {
      return state.userProfile.optUserProfile;
    },
  },
  actions: {
    /**
     * 儲存使用者基本資料
     * @param {*} payload 使用者基本資料
     */
    doStoredUserProfile(payload: Profile) {
      this.userProfile.optUserProfile = payload;
      this.userProfile.loginUserProfile = payload;
    },
    /**
     * 更新操作使用者基本資料
     * @param {*} payload 操作者基本資料
     */
    doUpdateOptUserProfile(payload: any) {
      this.userProfile.optUserProfile = payload;
    },
    /**
     * 清除使用者基本資料
     */
    doCleanUserProfile() {
      this.userProfile.optUserProfile = INIT_USER_PROFILE;
      this.userProfile.loginUserProfile = INIT_USER_PROFILE;
    },
  },
  persist: {
    key: "profile",
    storage: window.sessionStorage,
    paths: ["userProfile"],
  },
});
