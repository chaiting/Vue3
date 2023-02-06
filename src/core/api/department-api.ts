import axios from "axios";
import type {
  DepartmentReqType,
  DepartmentResType,
  DepartmentUnitReqType,
  DepartmentUnitResType,
} from "@/core/type/department-types";

// 組織/群組清單對應快取暫存表
const DEPTS_CACHE_MAP = new Map();

// 上層組織/群組清單對應快取暫存表
const UPPER_DEPTS_CACHE_MAP = new Map();

export default {
  /**
   * 查詢組織/群組清單
   * @param payload 查詢參數
   * @returns 組織/群組清單
   */
  doQryDeptList: async function (
    payload: DepartmentReqType
  ): DepartmentResType {
    const cacheKey = JSON.stringify(payload);
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
   * @returns 上層組織/群組清單
   */
  doQryUpperUnits: async function (
    payload: DepartmentUnitReqType
  ): DepartmentUnitResType {
    const cacheKey = JSON.stringify(payload);
    let result = UPPER_DEPTS_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/department/02", payload);
      UPPER_DEPTS_CACHE_MAP.set(cacheKey, result);
    }

    return result.data.body;
  },
};
