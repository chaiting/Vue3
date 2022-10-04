import axios from "axios";
import { useProfileStore } from "@/core/store/profile";

export default {
  /**
   * 保持Session不要timeout
   */
  doKeepSessionAlive: async function () {
    let result = await axios.post("/session_keeper/01");
    return result;
  },
  /**
   * 登出
   */
  doLogOut: async function () {
    const profileStore = useProfileStore();
    profileStore.doCleanUserProfile();
    let result = await axios.post("/session_keeper/02");
    return result;
  },
};
