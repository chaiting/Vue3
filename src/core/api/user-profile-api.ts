import axios from "axios";
import { useProfileStore } from "@/core/store/profile";

export default {
  /**
   * 取得登入者基本資料
   */
  doFetchLoginUserProfile: async function () {
    let result = await axios.post("/user_profile/01");
    return result.data.body;
  },
  /**
   * 取得操作者基本資料
   */
  doFetchOptUserProfile: async function () {
    let result = await axios.post("/user_profile/02");
    return result.data.body;
  },
  /**
   * 代理人身份切換
   */
  doSwitchIdentify: async function (payload: { adAccount: string }) {
    let result = await axios.post("/user_profile/03", payload);
    let userProfile = result.data.body;

    const profileStore = useProfileStore();

    if (userProfile) {
      profileStore.doUpdateOptUserProfile(result.data.body);
    }

    return userProfile;
  },
};
