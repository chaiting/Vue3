/**
 * 查詢顧客列表參數
 */
export type CustomerListReqType = {
  // 顧客ID
  customerId: string;
  // 信用卡號
  creditCardNumber: string;
  // 統一編號
  taxId: string;
  // 排序欄位
  sortColumn: string;
  // 排序方式
  sortType: string;
  // 分頁
  page: number;
  // 分頁大小
  pageSize: number;
};

/**
 * 顧客列表
 */
export type CustomerListResType = Promise<{
  // 總數
  total: number;
  // 資料
  data: CustomerType[];
}>;

/**
 * 顧客列表
 */
export type CustomerType = {
  // ID
  id: number;
  // 姓名
  name: string;
  // 信箱
  email: string;
  // 時間
  time: string;
  // 地址
  address: string;
};
