import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/customer/01").reply(200, {
    body: [
      {
        telType: "C",
        telTypeNm: "現居電話",
        telNumber: "052775078",
        extNumber: null,
      },
      {
        telType: "H",
        telTypeNm: "戶籍電話",
        telNumber: "0020744475",
        extNumber: null,
      },
      {
        telType: "O",
        telTypeNm: "公司電話",
        telNumber: "0020744476",
        extNumber: null,
      },
      {
        telType: "M1",
        telTypeNm: "行動電話1",
        telNumber: "0910124080",
        extNumber: null,
      },
      {
        telType: "M2",
        telTypeNm: "行動電話2",
        telNumber: "0930124080",
        extNumber: null,
      },
      {
        telType: "M3",
        telTypeNm: "行動電話3",
        telNumber: "0960124080",
        extNumber: null,
      },
    ],
    msg: [],
    spanId: null,
  });

  mock.onPost("/customer/02").reply(200, {
    body: [
      {
        addrType: "H",
        addrTypeNm: "戶籍地址",
        zipCd: "220",
        cityNm: "新北市",
        districtNm: "板橋區",
        address: "連雲路３６段６０號６０樓",
      },
      {
        addrType: "C",
        addrTypeNm: "現居地址",
        zipCd: "114",
        cityNm: "臺北市",
        districtNm: "內湖區",
        address: "連雲路３６段５９號５９樓",
      },
      {
        addrType: "O",
        addrTypeNm: "公司地址",
        zipCd: "221",
        cityNm: "新北市",
        districtNm: "汐止區",
        address: "連雲路３６段６１號６１樓",
      },
      {
        addrType: "B",
        addrTypeNm: "帳單地址",
        zipCd: "221",
        cityNm: "新北市",
        districtNm: "汐止區",
        address: "連雲路３６段６１號６１樓",
      },
      {
        addrType: "S",
        addrTypeNm: "寄卡地址",
        zipCd: "114",
        cityNm: "臺北市",
        districtNm: "內湖區",
        address: "連雲路３６段５９號５９樓",
      },
    ],
    msg: [],
    spanId: null,
  });

  mock.onPost("/sys_dial/03").reply(200, {
    body: {},
  });
}
