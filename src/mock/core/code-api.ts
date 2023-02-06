import type MockAdapter from "axios-mock-adapter/types";

function getResponseBody(payload: any) {
  if (payload.ctId == 8) {
    return [
      { ctId: 8, typeNm: "縣市", cdId: "A", cdNm: "臺北市" },
      { ctId: 8, typeNm: "縣市", cdId: "C", cdNm: "基隆市" },
      { ctId: 8, typeNm: "縣市", cdId: "F", cdNm: "新北市" },
    ];
  } else if (payload.ctId == 9) {
    return [
      { ctId: 9, typeNm: "鄉鎮市區", cdId: "100", cdNm: "中正區", flag01: "A" },
      { ctId: 9, typeNm: "鄉鎮市區", cdId: "103", cdNm: "大同區", flag01: "A" },
      { ctId: 9, typeNm: "鄉鎮市區", cdId: "104", cdNm: "中山區", flag01: "A" },
    ];
  } else {
    // 預設
    return [
      {
        ctId: 2,
        typeNm: "是否",
        cdId: "Y",
        cdNm: "是",
      },
      {
        ctId: 2,
        typeNm: "是否",
        cdId: "N",
        cdNm: "否",
      },
    ];
  }
}

export default function (mock: MockAdapter) {
  mock.onPost("/code/01").reply((config) => {
    const payload = JSON.parse(config.data);
    // return an array in the form of [status, data, headers]
    return [
      200,
      {
        body: getResponseBody(payload),
      },
    ];
  });
}
