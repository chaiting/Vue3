import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/sys_dial/01").reply(200, {
    body: { extension: "6393", isCreditCardMember: "N", isDialable: "Y" },
    msg: [],
    spanId: null,
  });

  mock.onPost("/sys_dial/02").reply(200, {
    body: {
      totalCount: 1,
      pageNo: 1,
      customerDialList: [
        {
          callStatus: "0",
          callStatusNm: "撥號中",
          callTime: "2020/09/05 00:01:59",
          sysId: "EPSP",
          funcId: "EPSP",
          funcNm: "交換機紀錄",
          refProckey: " ",
          callinNumber: "6260",
          calledNumber: "6187",
          userId: "ESB21105",
          userNm: "○○元",
          userNo: "21105",
          sysNm: "支付服務整合平台(測試環境)",
        },
      ],
    },
    msg: [],
    spanId: null,
  });

  mock.onPost("/sys_dial/03").reply(200);
}
