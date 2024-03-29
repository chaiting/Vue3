import { cloneDeep } from "lodash-es";
import { defineStore } from "pinia";
import type {
  MenuListType,
  UserProfileType,
} from "@/core/type/user-profile-types";

// 初始使用者資料
const INIT_USER_PROFILE = {
  // 員工姓名
  empName: "",
  // 員工編號
  empNo: "",
  // 系統資訊
  system: {
    // 系統名稱
    sysNm: "",
    // 左側選單清單
    leftMenuList: [] as MenuListType,
  },
} as Partial<UserProfileType>;

export const useProfileStore = defineStore("profile", {
  state: () => ({
    defaultUserProfile: cloneDeep(INIT_USER_PROFILE),
    userProfile: {
      optUserProfile: cloneDeep(INIT_USER_PROFILE),
      loginUserProfile: cloneDeep(INIT_USER_PROFILE),
    },
  }),
  getters: {
    /** 左側選單 */
    leftMenus: (state) => {
      return state.userProfile.optUserProfile.system!.leftMenuList;
    },
    /** 登入者基本資料 */
    loginUserProfile: (state) => {
      return state.userProfile.loginUserProfile;
    },
    /** 操作者基本資料 */
    optUserProfile: (state) => {
      return state.userProfile.optUserProfile;
    },
  },
  actions: {
    /**
     * 儲存使用者基本資料
     * @param payload 使用者基本資料
     */
    doStoredUserProfile(payload: UserProfileType) {
      this.userProfile.optUserProfile = payload;
      this.userProfile.loginUserProfile = payload;
    },
    /**
     * 更新操作使用者基本資料
     * @param payload 操作者基本資料
     */
    doUpdateOptUserProfile(payload: UserProfileType) {
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
