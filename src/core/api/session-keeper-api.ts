import axios from "axios";
import { useProfileStore } from "@/core/store/profile";

export default {
  /**
   * 保持Session不要timeout
   * @returns 執行結果
   */
  doKeepSessionAlive: async function () {
    const result = await axios.post("/session_keeper/01");
    return result;
  },
  /**
   * 登出
   * @returns 執行結果
   */
  doLogOut: async function () {
    const profileStore = useProfileStore();
    profileStore.doCleanUserProfile();
    const result = await axios.post("/session_keeper/02");
    return result;
  },
};
