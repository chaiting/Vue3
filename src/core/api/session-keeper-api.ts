import axios from "axios";
import { useProfileStore } from "@/core/store/profile";

export default {
  doKeepSessionAlive: async function () {
    let result = await axios.post("/session_keeper/01");
    return result;
  },
  doLogOut: async function () {
    const profileStore = useProfileStore();
    profileStore.doCleanUserProfile();
    let result = await axios.post("/session_keeper/02");
    return result;
  },
};
