import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
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
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "2-1",
            itemNm: "公告事項",
            itemUri: "/f020101scn",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
          {
            menuSeqNo: "3-1",
            itemNm: "備忘錄",
            itemUri: "",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [
              {
                menuSeqNo: "3-2-1",
                itemNm: "備忘錄一",
                itemUri: "/f030101scn",
                iconText: "",
                redirectTypeCd: "P",
              },
              {
                menuSeqNo: "3-2-2",
                itemNm: "備忘錄二",
                itemUri: "/f030201scn",
                iconText: "",
                redirectTypeCd: "P",
              },
            ],
          },
          {
            menuSeqNo: "4-1",
            itemNm: "公共元件",
            itemUri: "/f040101scn",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
        ],
      },
    },
  });
}
