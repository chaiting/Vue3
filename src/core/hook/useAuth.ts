// import { getCurrentInstance } from "vue";
import sessionKeeperApi from "@/core/api//session-keeper-api";
import messageBridgeApi from "@/core/api/message-bridge-api";
import { useGlobalStore } from "@/core/store/global";

/**
 * 登入相關操作hook
 */
export function useAuth() {
  // const app = getCurrentInstance();
  const globalStore = useGlobalStore();

  /** 保持session不過期 */
  const doKeepSessionAlive = () => {
    sessionKeeperApi.doKeepSessionAlive();
  };

  /** 登出 */
  const logout = () => {
    // app?.appContext.config.globalProperties.$keycloak.logoutFn(); // todo
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
