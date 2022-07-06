import axios from "axios";

export default {
  doQrySomething: async function (payload: { customerId: string }) {
    let result = await axios.post("/something", payload);
    return result.data.body;
  },
};
