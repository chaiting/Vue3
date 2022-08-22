import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/department/01").reply(200, {
    body: [
      {
        grpId: "C251AA",
        grpNm: "客服中心",
      },
      {
        grpId: "C212AA",
        grpNm: "企劃管理部",
      },
    ],
    msg: [],
    spanId: null,
  });

  mock.onPost("/department/02").reply(200, {
    body: [
      {
        grpId: "C810AA",
        grpNm: "信用卡事業處",
        grpUnitCode: "L50",
        grpSts: "A",
      },
      {
        grpId: "C004AA",
        grpNm: "總經理室",
        grpUnitCode: "L40",
        grpSts: "A",
      },
    ],
    msg: [],
    spanId: null,
  });
}
