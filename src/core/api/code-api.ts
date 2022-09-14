import axios from "axios";
import isBlank from "is-blank";
import { map, head } from "lodash-es";

/**
 * 代碼清單查詢參數
 */
interface CodePayload {
  // 類別代碼
  ctId: number;
  // 明細代碼
  cdId?: string;
  // 其它用途註記 01
  flag01?: string;
  // 其它用途註記 02
  flag02?: string;
  // 其它用途註記 03
  flag03?: string;
  // 其它用途註記 04
  flag04?: string;
  // 其它用途註記 05
  flag05?: string;
  // 其它用途註記 06
  flag06?: string;
  // 其它用途註記 07
  flag07?: string;
  // 其它用途註記 08
  flag08?: string;
  // 其它用途註記 09
  flag09?: string;
  // 其它用途註記 10
  flag10?: string;
  // 是否停用
  suspend?: string;
}

/**
 * 代碼{label,value}清單查詢參數
 */
interface CodeLabelPayload extends CodePayload {
  // 是否顯示代碼
  showCode: boolean;
}

// 代碼對應快取暫存表
const CODES_CACHE_MAP = new Map();

export default {
  /**
   * 代碼清單查詢
   * @param payload 代碼清單查詢參數
   */
  doQryCodeList: async function (payload: CodePayload) {
    let cacheKey = JSON.stringify(payload);
    let result = CODES_CACHE_MAP.get(cacheKey);

    if (!result) {
      result = await axios.post("/code/01", payload);
      CODES_CACHE_MAP.set(cacheKey, result);
    }

    return result;
  },
  /**
   * 代碼{label,value}清單查詢
   * @param payload 代碼{label,value}清單查詢參數
   */
  doQryCodeLabelValueList: async function (payload: CodeLabelPayload) {
    let result = await this.doQryCodeList(payload);
    return map(
      result.data.body,
      function (row: { cdId: string; cdNm: string }) {
        return {
          value: row.cdId,
          label: payload.showCode ? `${row.cdId} ${row.cdNm}` : row.cdNm,
        };
      }
    );
  },
  /**
   * 代碼名稱查詢
   * @param {*} ctId 類別代碼
   * @param {*} cdId 明細代碼
   */
  doGetCodeName: async function (ctId: number, cdId: string) {
    if (isBlank(ctId) || isBlank(cdId)) {
      return "";
    }

    let result = await this.doQryCodeList({
      ctId: ctId,
      cdId: cdId,
    });

    return head(result.data.body as any[])?.cdNm || "";
  },
};
