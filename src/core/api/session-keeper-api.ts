import axios from "axios";
import { useProfileStore } from "@/core/store/profile";

export default {
  /**
   * 保持Session不要timeout
   */
  doKeepSessionAlive: async function (): Promise<string> {
    let result = await axios.post("/session_keeper/01");
    return result.data.body;
  },
  /**
   * 登出
   */
  doLogOut: async function (): Promise<string> {
    const profileStore = useProfileStore();
    profileStore.doCleanUserProfile();
    let result = await axios.post("/session_keeper/02");
    return result.data.body;
  },
};
