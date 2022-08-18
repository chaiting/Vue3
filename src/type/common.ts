// Form組件的ref
export interface FormRef {
  validate: (cb?: (valid: boolean) => void) => void | Promise<boolean>;
  resetFields: () => void;
}
