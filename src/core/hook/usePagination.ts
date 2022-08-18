import { reactive, watch } from "vue";
import { DEFAULT_PAGE_SIZE_LIST } from "@/conf/app-config";
import { camelCase2UnderscoreUppercase } from "@/core/utils/naming-converter";

export interface SortColumn {
  column: string;
  key: string;
  order: "asc" | "desc" | "normal";
}

export interface SortOption {
  sortColumn: string;
  sortType: "ASC" | "DESC";
}

interface PaginationOption {
  fetcher: () => void;
  defaultColumn?: string;
}

/**
 * 表格分頁hook
 * @param {*} opts - 表格分頁hook選項
 * @param {*} opts.fetcher - 更新時呼叫的API
 * @param {*} opts.department - 預設表格排序欄位
 */
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

  /** 切換分頁 */
  function onChangePage(value: number) {
    pagination.page = value;
  }

  /** 切換分頁大小 */
  function onChangePageSize(value: number) {
    pagination.pageSize = value;
  }

  /** 欄位排序事件 */
  function onSortChange(col: SortColumn) {
    if (pagination.total == 0) return;
    // 取消排序
    if (col.order === "normal") {
      sortOption.sortColumn = opts.defaultColumn || "";
      sortOption.sortType = "DESC";
    }
    // 排序
    if (col.order !== "normal") {
      sortOption.sortColumn = camelCase2UnderscoreUppercase(col.key);
      sortOption.sortType = col.order.toUpperCase() as "DESC" | "ASC";
    }
  }

  /** 監聽需觸發fetcher */
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
