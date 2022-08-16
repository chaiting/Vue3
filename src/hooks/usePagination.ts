import type { SortColumn, SortOption } from "@/type/common";
import { reactive, watch } from "vue";
import { DEFAULT_PAGE_SIZE_LIST } from "@/conf/app-config";
import { camelCase2UnderscoreUppercase } from "@/utils/naming-converter";

/**
 * @param opts.fetcher 呼叫api
 * @param opts.defaultColumn 預設排序欄位
 */
interface PaginationOption {
  fetcher: () => void;
  defaultColumn?: string;
}

export function usePagination(opts: PaginationOption) {
  const sortOption = reactive<SortOption>({
    sortColumn: opts.defaultColumn || "",
    sortType: "DESC",
  });

  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0,
    pageSizeOpts: DEFAULT_PAGE_SIZE_LIST,
  });

  // 切換分頁
  function onChangePage(value: number) {
    pagination.page = value;
  }

  // 切換分頁大小
  function onChangePageSize(val: number) {
    pagination.pageSize = val;
  }

  // 欄位排序事件
  function onSortChange(col: SortColumn) {
    if (pagination.total == 0) return;
    /** 取消排序 */
    if (col.order === "normal") {
      sortOption.sortColumn = opts.defaultColumn || "";
      sortOption.sortType = "DESC";
    }
    /** 排序 */
    if (col.order !== "normal") {
      sortOption.sortColumn = camelCase2UnderscoreUppercase(col.key);
      sortOption.sortType = col.order.toUpperCase() as "DESC" | "ASC";
    }
  }

  watch([() => pagination.page, () => pagination.pageSize, sortOption], () => {
    opts.fetcher();
  });

  return {
    pagination,
    sortOption,
    onChangePage,
    onChangePageSize,
    onSortChange,
  };
}
