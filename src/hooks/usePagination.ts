import { reactive, watch } from "vue";
import { DEFAULT_PAGE_SIZE_LIST } from "@/conf/app-config";

export function usePagination(opts: { fetcher: () => void }) {
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

  watch([() => pagination.page, () => pagination.pageSize], () => {
    opts.fetcher();
  });

  return { pagination, onChangePage, onChangePageSize };
}
