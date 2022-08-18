import { createApp, ref, h } from "vue";
import { Button, Modal } from "view-ui-plus";
import EsunConfirm from "@/core/components//EsunConfirm.vue";

interface ConfirmOptions {
  title: string;
  content: string;
  type?: "success" | "error" | "info";
  ok?: () => void;
  cancel?: () => void;
}

/**
 * 全局確認彈窗hook
 */
export function useConfirm() {
  const isShow = ref(false);

  /** 顯示確認彈窗 */
  function showConfirm(opts: ConfirmOptions) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const Instance = createApp({
      render() {
        return h(EsunConfirm, {
          value: isShow.value,
          title: opts.title,
          type: opts.type,
          content: opts.content,
          "onUpdate:value": (val) => {
            isShow.value = val;
          },
          "onOn-ok": () => {
            opts.ok && opts.ok();
            this.remove();
          },
          "onOn-cancel": () => {
            opts.cancel && opts.cancel();
            this.remove();
          },
        });
      },
      methods: {
        remove() {
          setTimeout(() => {
            Instance.unmount();
            document.body.removeChild(container);
          }, 300);
        },
      },
    });

    Instance.component("Modal", Modal);
    Instance.component("Button", Button);
    Instance.mount(container);
    isShow.value = true;
  }

  return { showConfirm };
}

// https://github.com/view-design/ViewUIPlus/blob/master/src/components/modal/confirm.js
