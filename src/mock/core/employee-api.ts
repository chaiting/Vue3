import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/employee/01").reply(200, {
    body: [
      {
        adAccount: "JEEJE",
        empNo: "00661",
        empNm: "oo福",
        accSts: "3",
      },
      {
        adAccount: "JONSS",
        empNo: "00619",
        empNm: "oo中",
        accSts: "3",
      },
    ],
    msg: [],
    spanId: null,
  });
}
