import { onActivated, onDeactivated, ref } from "vue";

/**
 * 確認Keep-alive組件是否activated
 */
export function useActivated() {
  const isComponentActivated = ref(false);

  onActivated(() => {
    isComponentActivated.value = true;
  });

  onDeactivated(() => {
    isComponentActivated.value = false;
  });

  return { isComponentActivated };
}