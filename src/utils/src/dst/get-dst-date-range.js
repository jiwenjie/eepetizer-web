import moment from 'moment';
import dstDateRange from '../dst/dst-date-range.js';
import computedDstShiftTime from '../dst/computed-dst-shift-time.js';

/**
 * @description: 获取dst开始时间和结束时间
 * @param localtime 本地时间
 * @returns {
 *    dstStartTime {utcTime} 夏令时开始时间
 *    dstEndTime {utcTime} 夏令时结束时间
 *    timezoneShift {number} 本地时区标准时差
 *    dstShift {number} 夏令时时间偏移量
 * }
 * @author: zhangxin14
 * @since: 2018-11-23 12:00:05
 */
const getDstDateRange = localTime => {
  const dstTime = dstDateRange(localTime);
  return !dstTime
    ? dstTime
    : {
        dstStartTime: dstTime.dstStartTime,
        dstEndTime: dstTime.dstEndTime,
        timezoneShift: moment().utcOffset() + (moment().isDST() ? -60 : 0),
        dstShift: computedDstShiftTime(dstTime.dstEndTime) / 60 / 1000
      };
};

export default getDstDateRange;
