const fakeData: User[] = Array(100)
  .fill({})
  .map((e, idx) => ({
    id: idx + 1,
    name: "Joe",
    age: 10,
    address: "台北市中山區大馬路100號",
  }));

interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}

export interface UserList {
  data: User[];
  total: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export default {
  doFetchApi(payload: Pagination): {
    data: User[];
    total: number;
  } {
    console.log(payload);
    let start = (payload.page - 1) * payload.pageSize;
    let end = (payload.page - 1) * payload.pageSize + payload.pageSize;

    return {
      total: fakeData.length,
      data: [...fakeData].slice(start, end),
    };
  },
};
