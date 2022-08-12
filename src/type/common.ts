export interface FormRef {
  validate: (cb?: (valid: boolean) => void) => void | Promise<boolean>;
  resetFields: () => void;
}

export interface SortColumn {
  column: string;
  key: string;
  order: "acs" | "desc" | "normal";
}

export interface SortOption {
  sortColumn: string;
  sortType: "ASC" | "DESC" | "NORMAL";
}
