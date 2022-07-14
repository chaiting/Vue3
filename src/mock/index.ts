import type MockAdapter from "axios-mock-adapter/types";
import f01Init from "@/mock/f01";

export default function (mock: MockAdapter) {
  f01Init(mock);
  // f02Init(mock);
  // f03Init(mock);
  mock.onPost("/fronted_access_log/01").reply(200);
  mock.onPost("/session_keeper/01").reply(200);
  mock.onPost("/session_keeper/02").reply(200);

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
      grpNm: "其他",
      empName: "JOE",
      empNo: null,
      system: {
        sysId: "EPSP",
        sysNm: "支付服務整合平台",
        leftMenuList: [
          {
            menuSeqNo: "1-1",
            itemNm: "個人首頁",
            itemUri: "/f010101scn",
            // iconText: "logo-angular",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "2-1",
            itemNm: "公告事項",
            itemUri: "/f020101scn",
            // iconText: "md-analytics",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "3-1",
            itemNm: "備忘錄",
            itemUri: "/f030101scn",
            // iconText: "md-analytics",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [
              {
                menuSeqNo: "3-2-1",
                itemNm: "備忘錄一",
                itemUri: "/f030201scn",
                // iconText: "logo-android",
                iconText: "",
                redirectTypeCd: "P",
              },
              {
                menuSeqNo: "3-2-2",
                itemNm: "備忘錄二",
                itemUri: "/f030301scn",
                // iconText: "logo-android",
                iconText: "",
                redirectTypeCd: "P",
              },
            ],
            
          },
        ],
      },
    },
  });
}
