import type MockAdapter from "axios-mock-adapter/types";

export default function (mock: MockAdapter) {
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
}
