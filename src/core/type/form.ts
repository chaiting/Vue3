// Form組件的ref
export interface FormRef {
  validate: (cb?: (valid: boolean) => void) => void | Promise<boolean>;
  resetFields: () => void;
}

// 表單欄位自定義驗證
export type Validator<T> = (
  rule: any,
  value: T,
  cb: (message?: Error) => void
) => void;
