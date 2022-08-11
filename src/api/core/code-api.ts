import axios from "axios";

import { map, head } from "lodash-es";
import isBlank from "is-blank";

// 代碼對應快取暫存表
const CODES_CACHE_MAP = new Map();

export default {
  /**
   * 代碼清單查詢
   * @param payload {
   *    ctId: 類別代碼
   *    cdId: 明細代碼
   *    suspend: 是否停用
   *    flag01: 其它用途註記 01
   *    flag02: 其它用途註記 02
   *    flag03: 其它用途註記 03
   *    flag04: 其它用途註記 04
   *    flag05: 其它用途註記 05
   *    flag06: 其它用途註記 06
   *    flag07: 其它用途註記 07
   *    flag08: 其它用途註記 08
   *    flag09: 其它用途註記 09
   *    flag10: 其它用途註記 10
   * }
   */
  doQryCodeList: async function (payload: any) {
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
   * @param payload {
   *    ctId: 類別代碼
   *    cdId: 明細代碼
   *    suspend: 是否停用
   *    flag01: 其它用途註記 01
   *    flag02: 其它用途註記 02
   *    flag03: 其它用途註記 03
   *    flag04: 其它用途註記 04
   *    flag05: 其它用途註記 05
   *    flag06: 其它用途註記 06
   *    flag07: 其它用途註記 07
   *    flag08: 其它用途註記 08
   *    flag09: 其它用途註記 09
   *    flag10: 其它用途註記 10
   * }
   */
  doQryCodeLabelValueList: async function (payload: any) {
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
  doGetCodeName: async function (ctId: string, cdId: string) {
    if (isBlank(ctId) || isBlank(cdId)) {
      return "";
    }

    let result = await this.doQryCodeList({
      ctId: ctId,
      cdId: cdId,
    });

    return head(result.data.body)?.cdNm || "";
  },
};
