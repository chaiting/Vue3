import moment, { type Moment } from "moment";

/**
 * 日期格式化
 * @param date 來源日期
 * @param outType 輸出日期格式類型
 */
export function formatDate(date: string | Date | Moment, outType: string) {
  const outTypeMap = new Map([
    ["01", "YYYY/MM/DD"],
    ["02", "YYYY/MM"],
    ["03", "YYYY"],
    ["04", "MM"],
    ["05", "DD"],
    ["06", "YYYYMMDD"],
  ]);

  const patterns = [
    "YYYY-MM-DD",
    "YYYY/MM/DD",
    "YYYY MM DD",
    "YYYYMMDD",
    "YYYY-MM",
    "YYYY/MM",
    "YYYY MM",
    "YYYYMM",
  ];

  if (moment(date, patterns).isValid()) {
    return moment(date, patterns).format(outTypeMap.get(outType));
  }

  return date;
}

/**
 * 時間格式化
 * @param time 來源時間
 * @param outType 輸出時間格式類型
 */
export function formatTime(time: string, outType: string) {
  const outTypeMap = new Map([
    ["01", "HH:mm:ss"],
    ["02", "HH:mm"],
    ["03", "HH"],
    ["04", "mm"],
    ["05", "ss"],
  ]);

  const patterns = ["HH:mm:ss", "HH mm ss", "HHmmss", "HH:mm", "HH mm", "HHmm"];

  if (moment(time, patterns).isValid()) {
    return moment(time, patterns).format(outTypeMap.get(outType));
  }

  return time;
}

/**
 * 日期時間格式化
 * @param datetime 來源日期時間
 * @param outType 輸出日期時間格式類型
 */
export function formatDateTime(
  datetime: string | Date | Moment,
  outType: string
) {
  const outTypeMap = new Map([
    ["01", "YYYY/MM/DD HH:mm:ss"],
    ["02", "YYYY/MM/DD HH:mm"],
    ["03", "YYYY/MM/DD HH"],

    ["04", "YYYY/MM/DD"],
    ["05", "YYYY/MM"],
    ["06", "YYYY"],
    ["07", "MM"],
    ["08", "DD"],

    ["09", "HH:mm:ss"],
    ["10", "HH:mm"],
    ["11", "HH"],
    ["12", "mm"],
    ["13", "ss"],
  ]);

  const patterns = [
    "YYYY-MM-DD HH:mm:ss",
    "YYYY/MM/DD HH:mm:ss",
    "YYYYMMDD HHmmss",
    "YYYYMMDDHHmmss",
    "YYYY-MM-DD HH:mm",
    "YYYY/MM/DD HH:mm",
    "YYYYMMDD HHmm",
    "YYYYMMDDHHmm",
    "YYYY-MM-DD HH",
    "YYYY/MM/DD HH",
    "YYYYMMDD HH",
    "YYYYMMDDHH",
  ];

  if (moment(datetime, patterns).isValid()) {
    return moment(datetime, patterns).format(outTypeMap.get(outType));
  }

  return datetime;
}
