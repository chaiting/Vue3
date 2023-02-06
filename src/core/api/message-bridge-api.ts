import { throttle } from "lodash-es";
import messageBridgeApi from "@/core/api/message-bridge-api";

/**
 * 倒數器重置通知者
 */
const countdownNtifier = throttle(() => {
  messageBridgeApi.postMessage(
    "countdown-reset",
    import.meta.env.VITE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

/**
 * 單點登出通知者
 */
const singleLogoutNtifier = throttle(() => {
  messageBridgeApi.postMessage(
    "single-logout",
    import.meta.env.VITE_APP_MSG_BRIDGE_POST_MSG_TARGET_ORIGIN
  );
}, 1000);

export default {
  /**
   * 以postMessage的方式，廣播訊息給各介接子系統
   * @param message 通知訊息
   * @param targetOrigin 指定哪些窗口能接收到消息事件
   */
  postMessage: function (message: string, targetOrigin: string) {
    window.frames["message_bridge_iframe"].postMessage(message, targetOrigin);
  },
  /**
   * 通知倒數計時器重置
   */
  notifyCountdownReset: function () {
    countdownNtifier();
  },
  /**
   * 通知進行單點登出
   */
  notifySingleLogout: function () {
    singleLogoutNtifier();
  },
};
