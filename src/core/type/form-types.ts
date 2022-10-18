/**
 * Form組件的Ref
 */
export type FormRefType = {
  // 驗證表單
  validate: (cb?: (valid: boolean) => void) => void | Promise<boolean>;
  // 清空表單
  resetFields: () => void;
  // 驗證單一欄位
  validateField: (field: string, cb?: () => void) => void;
};

/**
 * 表單欄位自定義驗證
 */
export type ValidatorType<T> = (
  // 表單規則
  rule: any,
  // 欄位值
  value: T,
  // 驗證結果回調
  cb: (message?: Error) => void
) => void;
