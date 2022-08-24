import axios from "axios";

export default {
  /**
   * 查詢顧客電話清單
   * @param {*} payload
   */
  doQryCustomerPhones: async function (payload: any) {
    let result = await axios.post("/customer/01", payload);
    return result.data.body;
  },
  /**
   * 查詢顧客地址清單
   * @param {*} payload
   */
  doQryCustomerAddresses: async function (payload: any) {
    let result = await axios.post("/customer/02", payload);
    return result.data.body;
  },
};