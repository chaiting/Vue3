import type { User, Pagination } from "@/type/common";

const fakeData: User[] = Array(100)
  .fill({})
  .map((e, idx) => ({
    id: idx + 1,
    name: "Joe",
    age: 10,
    address: "台北市中山區大馬路100號",
  }));

export default {
  //  Before
  // ..
  // doFetchApi(payload) {
  //   console.log(payload);
  //   const start = (payload.page - 1) * payload.pageSize;
  //   const end = (payload.page - 1) * payload.pageSize + payload.pageSize;
  //   return {
  //     total: fakeData.length,
  //     data: [...fakeData].slice(start, end),
  //   };
  // },
  // 參數：參數類型
  // doFetchApi : 返回類型
  // {
  //   data: User[];
  //   total: number;
  // }
  // data [User,...]
  doFetchApi(payload: Pagination): {
    data: User[];
    total: number;
    age: number;
  } {
    console.log(payload);
    const start = (payload.page - 1) * payload.pageSize;
    const end = (payload.page - 1) * payload.pageSize + payload.pageSize;
    return {
      total: fakeData.length,
      data: [...fakeData].slice(start, end),
      age: 100,
    };
  },
};
