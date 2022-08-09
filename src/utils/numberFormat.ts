export function numberParser(value: string) {
  return value.replace(/(,*)/g, "");
}

export function numberFormat(value: number) {
  return new Intl.NumberFormat().format(value);
}
