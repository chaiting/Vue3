import { reactive, watch } from "vue";
import { DEFAULT_PAGE_SIZE_LIST } from "@/conf/app-config";
import { camelCase2UnderscoreUppercase } from "@/core/utils/naming-converter-utils";

/**
 * 表格分頁hook
 * @param opts - 表格分頁hook選項
 * @param opts.fetcher - 更新時呼叫的API
 * @param opts.defaultSortColumn - 預設表格排序欄位
 */
export function usePagination(opts: {
  fetcher: () => void;
  defaultSortColumn?: string;
}) {
  const sortOption = reactive({
    sortColumn: opts.defaultSortColumn || "",
    sortType: "DESC",
  });

  const pagination = reactive({
    page: 1,
    pageSize: 20,
    total: 0,
    pageSizeOpts: DEFAULT_PAGE_SIZE_LIST,
  });

  /**
   * 切換分頁
   * @param value 分頁
   */
  function onChangePage(value: number) {
    pagination.page = value;
  }

  /**
   * 切換分頁大小
   * @param value 分頁大小
   */
  function onChangePageSize(value: number) {
    pagination.pageSize = value;
  }

  /**
   * 欄位排序事件
   * @param col 欄位
   * @param col.key 欄位key
   * @param col.order 排序方式
   */
  function onSortChange(col: {
    key: string;
    order: "asc" | "desc" | "normal";
  }) {
    if (pagination.total == 0) return;

    // 取消排序
    if (col.order === "normal") {
      sortOption.sortColumn = opts.defaultSortColumn || "";
      sortOption.sortType = "DESC";
    }

    // 排序
    if (col.order !== "normal") {
      sortOption.sortColumn = camelCase2UnderscoreUppercase(col.key);
      sortOption.sortType = col.order.toUpperCase();
    }
  }

  /**
   * 監聽更新，觸發fetcher
   */
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
