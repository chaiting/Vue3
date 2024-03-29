import { ref } from "vue";
import type { FormRefType } from "@/core/type/form-types";
import type { Ref } from "vue";

/**
 * 驗證表單錯誤欄位
 * @param formRef 表單Ref
 */
export function useFormValidate(formRef: Ref<FormRefType | undefined>) {
  // 蒐集錯誤欄位
  const erorrFields = ref(new Set<string>());

  /**
   * 捕捉錯誤欄位
   */
  function validateHandle(prop: string, status: boolean) {
    if (!status) {
      erorrFields.value.add(prop);
    }
  }

  /**
   * 重新校驗錯誤欄位
   */
  function flushErrorFields() {
    setTimeout(() => {
      [...erorrFields.value].forEach((field) => {
        formRef.value!.validateField(field, (error) => {
          if (!error) {
            erorrFields.value.delete(field);
          }
        });
      });
    });
  }

  return { validateHandle, flushErrorFields };
}
