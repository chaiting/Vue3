export type CustomerPhoneList = Array<{
  extNumber?: string;
  telNumber?: string;
  telType: string;
  telTypeNm: string;
}>;

export interface CustomerPhoneReqType {
  customerId: string;
  customerType: string;
}

export type CustomerPhoneResType = Promise<CustomerPhoneList>;

export interface CustomerAddressReqType {
  customerId: string;
  customerType: string;
  addressType?: string;
}

export type CustomerAddressResType = Promise<
  Array<{
    addrType: string;
    addrTypeNm: string;
    address: string;
    cityNm: string;
    districtNm: string;
    zipCd: string;
  }>
>;
