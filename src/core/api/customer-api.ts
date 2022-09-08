import axios from "axios";

export default {
  /**
   * 查詢顧客電話清單
   * @param {*} payload 查詢參數
   * @param {*} payload.customerId 顧客ID
   * @param {*} payload.customerType 顧客類別
   */
  doQryCustomerPhones: async function (payload: {
    customerId: string;
    customerType: string;
  }) {
    let result = await axios.post("/customer/01", payload);
    return result.data.body;
  },
  /**
   * 查詢顧客地址清單
   * @param {*} payload 查詢參數
   * @param {*} payload.customerId 顧客ID
   * @param {*} payload.customerType 顧客類別
   * @param {*} payload.addressType 地址類別
   */
  doQryCustomerAddresses: async function (payload: {
    customerId: string;
    customerType: string;
    addressType?: string;
  }) {
    let result = await axios.post("/customer/02", payload);
    return result.data.body;
  },
};
