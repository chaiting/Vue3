import axios from "axios";
import type {
  CustomerAddressReqType,
  CustomerAddressResType,
  CustomerPhoneReqType,
  CustomerPhoneResType,
} from "@/core/type/customer-api";

export default {
  /**
   * 查詢顧客電話清單
   * @param payload 查詢參數
   * @returns 顧客電話清單
   */
  doQryCustomerPhones: async function (
    payload: CustomerPhoneReqType
  ): CustomerPhoneResType {
    let result = await axios.post("/customer/01", payload);
    return result.data.body;
  },
  /**
   * 查詢顧客地址清單
   * @param payload 查詢參數
   * @returns 顧客地址清單
   */
  doQryCustomerAddresses: async function (
    payload: CustomerAddressReqType
  ): CustomerAddressResType {
    let result = await axios.post("/customer/02", payload);
    return result.data.body;
  },
};
