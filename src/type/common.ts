export interface User {
  id: number;
  name: string;
  age: number;
  address: string;
}

export interface UserList {
  data: User[];
  total: number;
}

export type Pagination = {
  page: number;
  pageSize: number;
};
