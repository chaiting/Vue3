import axios from "axios";

interface Payload {
  customerId: string;
  creditCardNumber: string;
  taxId: string;
  sortColumn: string;
  sortType: string;
  page: number;
  pageSize: number;
}

interface ApiResponse {
  total: number;
  data: any[];
}

export default {
  doQryCustomerList: async function (payload: Payload): Promise<ApiResponse> {
    let result = await axios.post("/f010101/01", payload);
    return result.data.body;
  },
};

// // Before
// export default {
//   doQryCustomerList: async function (payload: any) {
//     let result = await axios.post("/f010101/01", payload);
//     return result.data.body;
//   }
// };
