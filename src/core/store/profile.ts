import { defineStore } from "pinia";

interface UserProfile {
  empName: string;
  empNo: string;
  grpNm: string;
  adAccount: null;
  system: {
    sysId: string;
    sysNm: string;
    grpNm: string;
    leftMenuList: never[];
  };
}

const INIT_USER_PROFILE = {
  empName: "",
  empNo: "",
  grpNm: "",
  adAccount: null, // 需添加 for ts
  system: {
    sysId: "",
    sysNm: "",
    grpNm: "",
    leftMenuList: [],
  },
};

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
      return state.userProfile.optUserProfile.system.leftMenuList;
    },
    loginUserProfile: (state) => {
      return state.userProfile.loginUserProfile;
    },
    optUserProfile: (state) => {
      return state.userProfile.optUserProfile;
    },
  },
  actions: {
    doStoredUserProfile(payload: UserProfile) {
      this.userProfile.optUserProfile = payload;
      this.userProfile.loginUserProfile = payload;
    },
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
