import axios from "axios";
import isBlank from "is-blank";
import { map, head } from "lodash-es";
import type {
  CodePayload,
  CodeLabelPayload,
  doQryCodeListResPayload,
  doGetCodeNameResPayload,
  doQryCodeLabelValueListResPayload,
} from "@/core/type/code-api";

// 代碼對應快取暫存表
const CODES_CACHE_MAP = new Map();

export default {
  /**
   * 代碼清單查詢
   * @param payload 代碼清單查詢參數
   */
  doQryCodeList: async function (
    payload: CodePayload
  ): doQryCodeListResPayload {
    let cacheKey = JSON.stringify(payload);
    let result = CODES_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/code/01", payload);
      CODES_CACHE_MAP.set(cacheKey, result);
    }

    return result.data.body;
  },
  /**
   * 代碼{label,value}清單查詢
   * @param payload 代碼{label,value}清單查詢參數
   */
  doQryCodeLabelValueList: async function (
    payload: CodeLabelPayload
  ): doQryCodeLabelValueListResPayload {
    const result = await this.doQryCodeList(payload);
    return map(result, (row) => {
      return {
        value: row.cdId,
        label: payload.showCode ? `${row.cdId} ${row.cdNm}` : row.cdNm,
      };
    });
  },
  /**
   * 代碼名稱查詢
   * @param ctId 類別代碼
   * @param cdId 明細代碼
   */
  doGetCodeName: async function (
    ctId: number,
    cdId: string
  ): doGetCodeNameResPayload {
    if (isBlank(ctId) || isBlank(cdId)) {
      return "";
    }

    const result = await this.doQryCodeList({
      ctId: ctId,
      cdId: cdId,
    });

    return head(result)?.cdNm || "";
  },
};
