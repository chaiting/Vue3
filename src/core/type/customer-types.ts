/**
 * 顧客電話
 */
export type CustomerPhoneType = {
  // 電話分機
  extNumber?: string;
  // 電話號碼
  telNumber?: string;
  // 電話類別
  telType: string;
  // 電話類別名稱
  telTypeNm: string;
};

/**
 * 查詢顧客電話清單參數
 */
export type CustomerPhoneReqType = {
  // 顧客ID
  customerId: string;
  // 顧客類別
  customerType: string;
};

/**
 * 顧客電話清單
 */
export type CustomerPhoneResType = Promise<CustomerPhoneType[]>;

/**
 * 查詢顧客地址清單參數
 */
export type CustomerAddressReqType = {
  // 顧客ID
  customerId: string;
  // 顧客類別
  customerType: string;
  // 地址類別地址類別
  addressType?: string;
};

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
