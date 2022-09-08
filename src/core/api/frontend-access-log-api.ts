import axios from "axios";

export default {
  /**
   * 儲存前端存取記錄log
   * @param {*} payload 前端存取記錄儲存參數
   * @param {*} payload.resourceUri 資源URI
   * @param {*} payload.resourceType 資源類型
   */
  doSaveFrontendAccessLog: async function (payload: {
    resourceUri: string;
    resourceType: string;
  }) {
    return await axios.post("/fronted_access_log/01", payload);
  },
};
