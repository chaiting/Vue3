export interface User {
  id: number;
  name: string;
  time: string;
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
