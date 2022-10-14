/**
 * 其他用途註記
 */
export interface Flag {
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
}

/**
 * 代碼清單查詢參數
 */
export interface CodeReqType extends Flag {
  // 類別代碼
  ctId: number;
  // 明細代碼
  cdId?: string;
  // 是否停用
  suspend?: string;
}

/**
 * 代碼{label,value}清單查詢參數
 */
export interface CodeLabelReqType extends CodeReqType {
  // 是否顯示代碼
  showCode: boolean;
}

/**
 * 代碼清單
 */
export type CodeResType = Promise<
  Array<
    {
      // 明細代碼
      cdId: string;
      // 明細名稱
      cdNm: string;
      // 類別代碼
      ctId: number;
      // 類別名稱
      typeNm: string;
    } & Flag
  >
>;

/**
 * 代碼{label,value}清單
 */
export type CodeLabelResType = Promise<
  Array<{
    // 明細代碼
    value: string;
    // 明細名稱
    label: string;
  }>
>;

export type CodeNameResType = Promise<string>;
