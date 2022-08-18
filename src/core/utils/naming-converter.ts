export function camelCase2UnderscoreUppercase(str: string) {
  return str.replace(/([A-Z])+/g, "_$1").toUpperCase();
}
