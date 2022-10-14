/**
 * 查詢顧客列表參數
 */
export interface CustomerListReqType {
  customerId: string;
  creditCardNumber: string;
  taxId: string;
  sortColumn: string;
  sortType: string;
  page: number;
  pageSize: number;
}

/**
 * 顧客列表
 */
export type CustomerListResType = Promise<{
  // 總數
  total: number;
  // 資料
  data: CustomerList;
}>;

export type CustomerList = Array<{
  id: number;
  name: string;
  email: string;
  time: string;
  address: string;
}>;
