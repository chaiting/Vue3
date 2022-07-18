import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mockInit from "@/mock";

export default () => {
  if ("Y" === import.meta.env.VITE_APP_ENABLE_MOCK) {
    const mock = new MockAdapter(axios, { delayResponse: 500 });
    mockInit(mock);
    mock.onAny().passThrough();
  }
};
