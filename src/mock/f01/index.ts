import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
  mock.onPost("/").reply(200, {
    status: "200",
    msg: ["lalala"],
    body: [],
  });
}
