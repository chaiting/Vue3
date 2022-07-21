import type { User } from "@/type/common";
import type MockAdapter from "axios-mock-adapter/types";

const fakeData: User[] = Array(50)
  .fill({})
  .map((e, idx) => ({
    id: idx + 1,
    name: "Joe",
    email: "esun123@gmail.com",
    time: "2020-10-10",
    address: "台北市中山區大馬路100號",
  }));

export default function (mock: MockAdapter) {
  mock.onPost("/f010101/01").reply((config) => {
    const payload = JSON.parse(config.data);
    const start = (payload.page - 1) * payload.pageSize;
    const end = (payload.page - 1) * payload.pageSize + payload.pageSize;
    // return an array in the form of [status, data, headers]
    return [
      200,
      {
        body: {
          total: fakeData.length,
          data: [...fakeData].slice(start, end),
        },
      },
    ];
  });
}
