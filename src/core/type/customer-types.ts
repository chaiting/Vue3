/**
 * 顧客電話清單
 */
export type CustomerPhoneList = Array<{
  extNumber?: string;
  telNumber?: string;
  telType: string;
  telTypeNm: string;
}>;

/**
 * 查詢顧客電話清單參數
 */
export interface CustomerPhoneReqType {
  // 顧客ID
  customerId: string;
  // 顧客類別
  customerType: string;
}

/**
 * 顧客電話清單
 */
export type CustomerPhoneResType = Promise<CustomerPhoneList>;

/**
 * 查詢顧客地址清單參數
 */
export interface CustomerAddressReqType {
  // 顧客ID
  customerId: string;
  // 顧客類別
  customerType: string;
  // 地址類別地址類別
  addressType?: string;
}

/**
 * 顧客地址清單
 */
export type CustomerAddressResType = Promise<
  Array<{
    // 地址類別
    addrType: string;
    // 地址類別名稱
    addrTypeNm: string;
    // 地址
    address: string;
    // 縣市別名稱
    cityNm: string;
    // 鄉鎮市區名稱
    districtNm: string;
    // 地址郵區
    zipCd: string;
  }>
>;
