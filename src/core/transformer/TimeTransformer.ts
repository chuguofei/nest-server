import { ValueTransformer } from 'typeorm';
import * as moment from 'moment';

export enum DateTimeFormat {
  DEFAULT = 'YYYY-MM-DD HH:mm:ss',
  YEAR = 'YYYY',
  MOUTH = 'YYYY-MM',
  DAY = 'YYYY-MM-DD',
  HOUR = 'YYYY-MM-DD HH',
  MINUTES = 'YYYY-MM-DD HH:mm',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
}

/**
 * 默认
 */
export const TimeTransformerDefault = (): ValueTransformer => ({
  to(value: string): string {
    return value;
  },

  from(value: string): string {
    return value && moment(value).format(DateTimeFormat.DEFAULT);
  },
});

/**
 * 格式化时间,自定义事件
 * @param format
 * @returns
 */
export const TimeTransformer = (
  format?: DateTimeFormat | string,
): ValueTransformer => ({
  to(value: string): string {
    return value;
  },

  from(value: string): string {
    return value && moment(value).format(format ?? DateTimeFormat.DEFAULT);
  },
});
