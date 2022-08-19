import { defineStore } from "pinia";

interface ConfirmOptions {
  title: string;
  content: string;
  type?: "success" | "error" | "info";
  ok?: () => void;
  cancel?: () => void;
}

export const useConfirmStore = defineStore({
  id: "confirm",
  state: () => ({
    isShowConfirm: false,
    confirmOptions: {
      title: "",
      content: "",
      type: "info",
      ok: () => {},
      cancel: () => {},
    } as ConfirmOptions,
  }),
  actions: {
    doShowConfirm(opts: ConfirmOptions) {
      this.confirmOptions = opts;
      this.isShowConfirm = true;
    },
  },
});
