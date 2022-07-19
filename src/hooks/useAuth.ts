import messageBridgeApi from "@/api/core/message-bridge-api";
import sessionKeeperApi from "@/api/core/session-keeper-api";
import { useGlobalStore } from "@/stores/global";
import { getCurrentInstance } from "vue";

export function useAuth() {
  const app = getCurrentInstance();
  const globalStore = useGlobalStore();

  const doKeepSessionAlive = () => {
    sessionKeeperApi.doKeepSessionAlive();
  };

  const logout = () => {
    app?.appContext.config.globalProperties.$keycloak.logoutFn(); // todo
    messageBridgeApi.notifySingleLogout();
    globalStore.doUpdateShowLogoutSpinner({ isShowLogoutSpinner: true });
    sessionKeeperApi.doLogOut().then(() => {
      const epspHome = import.meta.env.VITE_APP_EPSP_HOME_URL;
      window.location.href =
        epspHome + "/logout_page.html?redirect_uri=" + epspHome;
    });
  };

  return { logout, doKeepSessionAlive };
}
