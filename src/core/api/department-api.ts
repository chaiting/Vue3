import axios from "axios";
import type {
  DepartmentReqType,
  DepartmentResType,
  DepartmentUnitReqType,
  DepartmentUnitResType,
} from "@/core/type/department-api";

// 組織/群組清單對應快取暫存表
const DEPTS_CACHE_MAP = new Map();

// 上層組織/群組清單對應快取暫存表
const UPPER_DEPTS_CACHE_MAP = new Map();

export default {
  /**
   * 查詢組織/群組清單
   * @param payload 查詢參數
   */
  doQryDeptList: async function (
    payload: DepartmentReqType
  ): DepartmentResType {
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
   * @param payload 查詢參數
   */
  doQryUpperUnits: async function (
    payload: DepartmentUnitReqType
  ): DepartmentUnitResType {
    let cacheKey = JSON.stringify(payload);
    let result = UPPER_DEPTS_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/department/02", payload);
      UPPER_DEPTS_CACHE_MAP.set(cacheKey, result);
    }

    return result.data.body;
  },
};
