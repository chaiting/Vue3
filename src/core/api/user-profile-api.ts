import axios from "axios";
import { useProfileStore } from "@/core/store/profile";
import type {
  UserProfileResType,
  UserProfileType,
  AgentProfileReqType,
} from "@/core/type/user-profile-types";

export default {
  /**
   * 取得登入者基本資料
   * @returns 登入者基本資料
   */
  doFetchLoginUserProfile: async function (): UserProfileResType {
    const result = await axios.post("/user_profile/01");
    return result.data.body;
  },
  /**
   * 取得操作者基本資料
   * @returns 操作者基本資料
   */
  doFetchOptUserProfile: async function (): UserProfileResType {
    const result = await axios.post("/user_profile/02");
    return result.data.body;
  },
  /**
   * 代理人身份切換
   * @param payload 被代理人資料
   * @returns 被代理人基本資料
   */
  doSwitchIdentify: async function (
    payload: AgentProfileReqType
  ): UserProfileResType {
    const result = await axios.post("/user_profile/03", payload);
    const userProfile = result.data.body;

    const profileStore = useProfileStore();

    if (userProfile) {
      profileStore.doUpdateOptUserProfile(result.data.body as UserProfileType);
    }

    return userProfile;
  },
};
