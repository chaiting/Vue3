import { throttle } from "lodash";
import messageBridgeApi from "@/api/core/message-bridge-api";

const countdownNtifier = throttle(() => {
  messageBridgeApi.postMessage(
    "countdown-reset",
    import.meta.env.VITE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

const singleLogoutNtifier = throttle(() => {
  messageBridgeApi.postMessage(
    "single-logout",
    import.meta.env.VITE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

export default {
  postMessage: function (message: string, targetOrigin: string) {
    window.frames["message_bridge_iframe" as any].postMessage(message, targetOrigin);
  },
  notifyCountdownReset: function () {
    countdownNtifier();
  },
  notifySingleLogout: function () {
    singleLogoutNtifier();
  },
};
