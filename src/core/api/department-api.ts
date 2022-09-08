import axios from "axios";

// 組織/群組清單對應快取暫存表
const DEPTS_CACHE_MAP = new Map();

// 上層組織/群組清單對應快取暫存表
const UPPER_DEPTS_CACHE_MAP = new Map();

export default {
  /**
   * 查詢組織/群組清單
   * @param {*} payload 查詢參數
   * @param {*} payload.activatedGrp 是否限啟用組織/群組(Y|N)
   * @param {*} payload.allSubordinate 是否包含所有子單位(Y|N)
   * @param {*} payload.dataSrc 組織/群組資料來源
   * @param {*} payload.grpUnitcode 單位層級代碼
   * @param {*} payload.upGrpIdList 上層組織/群組代碼清單
   */
  doQryDeptList: async function (payload: {
    activatedGrp?: string;
    allSubordinate?: string;
    dataSrc?: string;
    grpUnitcode?: string;
    upGrpIdList?: string[];
  }) {
    let cacheKey = JSON.stringify(payload);
    let result = DEPTS_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/department/01", payload);
      DEPTS_CACHE_MAP.set(cacheKey, result);
    }

    return result.data.body;
  },
  /**
   * 查詢上層組織/群組清單
   * @param {*} payload 查詢參數
   * @param {*} payload.grpId 組織/群組代碼
   * @param {*} payload.activatedGrp 是否限啟用組織/群組(Y|N)
   */
  doQryUpperUnits: async function (payload: {
    grpId: string;
    activatedGrp?: string;
  }) {
    let cacheKey = JSON.stringify(payload);
    let result = UPPER_DEPTS_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/department/02", payload);
      UPPER_DEPTS_CACHE_MAP.set(cacheKey, result);
    }

    return result.data.body;
  },
};
