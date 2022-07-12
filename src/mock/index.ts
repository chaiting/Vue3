import type MockAdapter from "axios-mock-adapter/types";
import f01Init from "@/mock/f01";

export default function (mock: MockAdapter) {
  f01Init(mock);
  // f02Init(mock);
  // f03Init(mock);

  mock.onPost("/users").reply(200, {
    body: {
      users: [
        { id: 1, name: "John Smith1" },
        { id: 2, name: "John Smith2" },
        { id: 3, name: "John Smith3" },
        { id: 4, name: "John Smith4" },
        { id: 5, name: "John Smith5" },
      ],
    },
  });

  mock.onPost("/user_profile/01").reply(200, {
    body: {
      adAccount: "PRO-019",
      email: "pro-019@testesunbank.com.tw",
      system: {
        sysId: "EPSP",
        leftMenuList: [
          {
            menuSeqNo: "1111",
            item: "個人首頁",
            itemUri: "/f010101scn",
          },
          {
            menuSeqNo: "2222",
            item: "公告事項",
            itemUri: "/f010201scn",
          },
        ],
      },
    },
  });
}
