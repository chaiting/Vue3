import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
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
    defaultUserProfile: cloneDeep(INIT_USER_PROFILE),
    userProfile: {
      optUserProfile: cloneDeep(INIT_USER_PROFILE),
      loginUserProfile: cloneDeep(INIT_USER_PROFILE),
    },
  }),
  getters: {
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
     * @param payload 使用者基本資料
     */
    doStoredUserProfile(payload: Profile) {
      this.userProfile.optUserProfile = payload;
      this.userProfile.loginUserProfile = payload;
    },
    /**
     * 更新操作使用者基本資料
     * @param payload 操作者基本資料
     */
    doUpdateOptUserProfile(payload: Profile) {
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
