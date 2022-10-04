export type UserList = Array<{
  accSts?: string;
  adAccount: string;
  empNm: string;
  empNo?: string;
  usedAccount: string;
  hireSts: "hired" | "left" | "";
}>;

export type doQryUserListResPayload = Promise<UserList>;
