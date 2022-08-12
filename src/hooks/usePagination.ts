import type { SortColumn, SortOption } from "@/type/common";
import { reactive, watch } from "vue";
import { DEFAULT_PAGE_SIZE_LIST } from "@/conf/app-config";
import { camelCase2UnderscoreUppercase } from "@/utils/naming-converter";

interface PaginationOption {
  fetcher: (sortOption?: SortOption) => void;
  defaultCol: string;
}

export function usePagination(opts: PaginationOption) {
  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0,
    pageSizeOpts: DEFAULT_PAGE_SIZE_LIST,
  });

  function onChangePage(value: number) {
    pagination.page = value;
  }

  function onChangePageSize(val: number) {
    pagination.pageSize = val;
  }

  function onSortChange(col: SortColumn) {
    if (pagination.total == 0) return;

    const sortOption: SortOption = {
      sortColumn:
        col.order === "normal"
          ? opts.defaultCol
          : camelCase2UnderscoreUppercase(col.key),
      sortType:
        col.order === "normal"
          ? "DESC"
          : (col.order.toUpperCase() as "DESC" | "ASC"),
    };

    opts.fetcher(sortOption);
  }

  watch([() => pagination.page, () => pagination.pageSize], () => {
    opts.fetcher();
  });

  return { pagination, onChangePage, onChangePageSize, onSortChange };
}
