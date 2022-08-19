import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  // mock.onPost("/code/01").reply(200, {
  //   body: [
  //     {
  //       ctId: 2,
  //       typeNm: "是否",
  //       cdId: "Y",
  //       cdNm: "是",
  //     },
  //     {
  //       ctId: 2,
  //       typeNm: "是否",
  //       cdId: "N",
  //       cdNm: "否",
  //     },
  //   ],
  //   msg: [],
  //   spanId: null,
  // });

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
