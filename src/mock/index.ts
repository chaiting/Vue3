import type MockAdapter from "axios-mock-adapter/types";
import coreInit from "@/mock/core";
import bpmFormInit from "@/mock/core/bpm-form-api";
import codeInit from "@/mock/core/code-api";
import f01Init from "@/mock/f01";

export default function (mock: MockAdapter) {
  coreInit(mock);
  f01Init(mock);
  codeInit(mock);
  bpmFormInit(mock);
  // f02Init(mock);
  // f03Init(mock);
  mock.onPost("/fronted_access_log/01").reply(200);
  mock.onPost("/session_keeper/01").reply(200);
  mock.onPost("/session_keeper/02").reply(200);

  mock.onPost("/error401").reply(401);
  mock.onPost("/error403").reply(403);
  mock.onPost("/error404").reply(404, {
    status: "404",
    msg: [],
    spanId: "123456",
  });
  mock.onPost("/error412").reply(412, {
    status: "412",
    msg: ["這是錯誤訊息1", "這是錯誤訊息2"],
    body: [],
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
            itemUri: "",
            // iconText: "md-analytics",
            iconText: "",
            redirectTypeCd: "P",
            subMenuList: [
              {
                menuSeqNo: "3-2-1",
                itemNm: "備忘錄一",
                itemUri: "/f030101scn",
                // iconText: "logo-android",
                iconText: "",
                redirectTypeCd: "P",
              },
              {
                menuSeqNo: "3-2-2",
                itemNm: "備忘錄二",
                itemUri: "/f030201scn",
                // iconText: "logo-android",
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
