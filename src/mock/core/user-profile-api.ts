import type MockAdapter from "axios-mock-adapter/types";

const LEFT_MENU_LIST = [
  {
    menuSeqNo: "01",
    itemNm: "基本範例",
    itemUri: "/f010101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
  {
    menuSeqNo: "02",
    itemNm: "路由配置",
    itemUri: "/f020101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
  {
    menuSeqNo: "03",
    itemNm: "第三方套件",
    itemUri: "",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [
      {
        menuSeqNo: "0301",
        itemNm: "js-file-download",
        itemUri: "/f030101scn",
        iconText: "",
        redirectTypeCd: "P",
      },
      {
        menuSeqNo: "0302",
        itemNm: "i18n",
        itemUri: "/f030201scn",
        iconText: "",
        redirectTypeCd: "P",
      },
      {
        menuSeqNo: "0303",
        itemNm: "html2pdf.js",
        itemUri: "/f030301scn",
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
  {
    menuSeqNo: "5-1",
    itemNm: "撥號元件",
    itemUri: "/f050101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
  {
    menuSeqNo: "6-1",
    itemNm: "日期選擇器",
    itemUri: "/f060101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
  {
    menuSeqNo: "7-1",
    itemNm: "表單驗證",
    itemUri: "/f070101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
  {
    menuSeqNo: "8-1",
    itemNm: "Test",
    itemUri: "/f080101scn",
    iconText: "",
    redirectTypeCd: "P",
    subMenuList: [],
  },
];

export default function (mock: MockAdapter) {
  mock.onPost("/user_profile/01").reply(200, {
    msg: "",
    body: {
      adAccount: "PRO-019",
      email: "pro-019@testesunbank.com.tw",
      grpNm: "其他",
      empName: "JOE",
      empNo: null,
      system: {
        sysId: "EPSP",
        sysNm: "支付服務整合平台",
        leftMenuList: LEFT_MENU_LIST,
      },
    },
  });

  mock.onPost("/user_profile/03").reply(200, {
    msg: "",
    body: {
      adAccount: "AGENT-PRO-019",
      email: "agent-pro-019@testesunbank.com.tw",
      grpNm: "其他",
      empName: "AGENT_JOE",
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
          {
            menuSeqNo: "5-1",
            itemNm: "撥號元件",
            itemUri: "/f050101scn",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [],
          },
        ],
      },
    },
  });
}
