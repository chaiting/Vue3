/**
 * 數字去千分位
 * @example "1,000" -> "1000"
 */
export function numberParser(value: string) {
  return value.replace(/(,*)/g, "");
}

/**
 * 數字轉千分位
 * @example 1000 -> "1,000"
 */
export function numberFormat(value: number) {
  return new Intl.NumberFormat().format(value);
}
