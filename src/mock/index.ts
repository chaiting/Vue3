import type MockAdapter from "axios-mock-adapter/types";
// core
import codeInit from "@/mock/core/code-api";
import bpmFormInit from "@/mock/core/bpm-form-api";
import employeeInit from "@/mock/core/employee-api";
import infoCardInit from "@/mock/core/info-card-api";
import departmentInit from "@/mock/core/department-api";
import userProfileInit from "@/mock/core/user-profile-api";

// view
import f01Init from "@/mock/f01";

export default function (mock: MockAdapter) {
  codeInit(mock);
  bpmFormInit(mock);
  infoCardInit(mock);
  employeeInit(mock);
  departmentInit(mock);
  userProfileInit(mock);

  f01Init(mock);
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
}
