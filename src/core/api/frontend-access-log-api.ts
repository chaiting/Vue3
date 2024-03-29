import axios from "axios";
import type { AccessLogReqType } from "@/core/type/frontend-access-log-types";

export default {
  /**
   * 儲存前端存取記錄log
   * @param payload 前端存取記錄儲存參數
   * @returns 執行結果
   */
  doSaveFrontendAccessLog: async function (
    payload: AccessLogReqType
  ): Promise<number> {
    return await axios.post("/frontend_access_log/01", payload);
  },
};
