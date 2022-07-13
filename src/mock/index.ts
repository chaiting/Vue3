import type MockAdapter from "axios-mock-adapter/types";
import f01Init from "@/mock/f01";

export default function (mock: MockAdapter) {
  f01Init(mock);
  // f02Init(mock);
  // f03Init(mock);
  mock.onPost("/fronted_access_log/01").reply(200);
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
        sysNm: "支付服務整合平台",
        leftMenuList: [
          {
            menuSeqNo: "1111",
            itemNm: "個人首頁",
            itemUri: "/f010101scn",
            iconText: "logo-angular",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "2222",
            itemNm: "公告事項",
            itemUri: "/f020101scn",
            iconText: "md-analytics",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "333",
            itemNm: "備忘錄",
            itemUri: "/f030101scn",
            iconText: "logo-android",
            redirectTypeCd: "P",
            subMenuList: [
              {
                menuSeqNo: "333",
                itemNm: "備忘錄一",
                itemUri: "/f030201scn",
                iconText: "logo-android",
                redirectTypeCd: "P",
              },
              {
                menuSeqNo: "333",
                itemNm: "備忘錄二",
                itemUri: "/f030301scn",
                iconText: "logo-android",
                redirectTypeCd: "P",
              },
            ],
          },
        ],
      },
    },
  });
}
