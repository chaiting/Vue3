import isBlank from "is-blank";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "@/conf/app-config";
import type { NullableType, TimeLabelType } from "@/core/type/utils-types";

const DEFAULT_UPPER_DATE_FORMAT = DEFAULT_DATE_FORMAT.toUpperCase();

/**
 * 限制特定起始日期
 * @param endDate 迄日日期(YYYY/MM/DD)
 * @param disableSDate 限制日期(YYYY/MM/DD)
 */
export const restrictSpecificSDate = (
  endDate: NullableType<string>,
  disableSDate?: NullableType<string>
) => {
  return {
    disabledDate: (date: Date) => {
      const startLimit = disableSDate || "1911/01/01";
      const endLimit = endDate || "9999/12/31";

      return (
        moment(date) < moment(startLimit, DEFAULT_UPPER_DATE_FORMAT) ||
        moment(date) > moment(endLimit, DEFAULT_UPPER_DATE_FORMAT)
      );
    },
  };
};

/**
 * 限制區間起始日期
 * @param endDate 迄日日期(YYYY/MM/DD)
 * @param timeLabel 時間標籤(years|y、quarters|Q、months|M、weeks|w、days|d)
 * @param duration Type: NUMBER，時間長度
 */
export const restrictPeriodSDate = (
  endDate: NullableType<string>,
  timeLabel: TimeLabelType,
  duration: number
) => {
  return {
    disabledDate: (date: Date) => {
      if (isBlank(endDate)) {
        return false;
      }

      const startLimit = moment(endDate, DEFAULT_UPPER_DATE_FORMAT).subtract(
        duration,
        timeLabel
      );
      const endLimit = moment(endDate, DEFAULT_UPPER_DATE_FORMAT);

      return moment(date) <= startLimit || moment(date) > endLimit;
    },
  };
};

/**
 * 限制特定結束日期
 * @param startDate 起日日期(YYYY/MM/DD)
 * @param disableEDate 限制日期(YYYY/MM/DD)
 */
export const restrictSpecificEDate = (
  startDate: NullableType<string>,
  disableEDate?: NullableType<string>
) => {
  return {
    disabledDate: (date: Date) => {
      const startLimit = startDate || "1911/01/01";
      const endLimit = disableEDate || "9999/12/31";

      return (
        moment(date) > moment(endLimit, DEFAULT_UPPER_DATE_FORMAT) ||
        moment(date) < moment(startLimit, DEFAULT_UPPER_DATE_FORMAT)
      );
    },
  };
};
/**
 *  限制區間結束日期
 * @param startDate 起日日期(YYYY/MM/DD)
 * @param timeLabel 時間標籤(years|y、quarters|Q、months|M、weeks|w、days|d)
 * @param duration Type: NUMBER，時間長度
 */
export const restrictPeriodEDate = (
  startDate: NullableType<string>,
  timeLabel: TimeLabelType,
  duration: number
) => {
  return {
    disabledDate: (date: Date) => {
      if (isBlank(startDate)) {
        return false;
      }

      const startLimit = moment(startDate, DEFAULT_UPPER_DATE_FORMAT);
      const endLimit = moment(startDate, DEFAULT_UPPER_DATE_FORMAT).add(
        duration,
        timeLabel
      );

      return moment(date) < startLimit || moment(date) >= endLimit;
    },
  };
};
