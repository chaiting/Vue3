import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/info_card/01").reply(200, {
    body: {
      cname: "Mr.Mock",
      deptName: "資訊處 數據暨金融科技中心 G51- CBP2支援",
      deptPhoneNo: "02-25981313",
      lempDeptSectId: "B32G51 ",
      employeeNo: "20882",
      genderCode: "1",
      genderName: "男",
      isCreditCardMember: "y",
      isDisable: "N",
      jobTitleCode: "0760",
      jobTitleName: "工程師",
      officeEmail: "OAService-Test@testesunbank.com.tw",
      officePhoneext: "350",
      positionCode: "C25T10",
      positionName: "應用系統工程師(PI)",
      userExtension: null,
    },
    msg: [],
    spanId: null,
  });

  mock.onPost("/info_card/02").reply(200);
}
