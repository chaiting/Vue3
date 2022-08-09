import { createApp } from "vue";
import EsunConfirm from "@/components/core/EsunConfirm.vue";
import { Button, Modal } from "view-ui-plus";

export function useConfirm() {
  function showConfirm(opts: { title: string; content: string }) {
    const container = document.createElement("div");
    container.setAttribute("id", "globalconfirm");
    document.body.appendChild(container);

    const Instance = createApp(EsunConfirm, {
      value: true,
      content: opts.content,
    });
    Instance.component("Modal", Modal);
    Instance.component("Button", Button);
    Instance.mount(container);
  }

  return { showConfirm };
}
