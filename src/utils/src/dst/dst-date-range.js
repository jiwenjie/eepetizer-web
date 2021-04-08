import moment from 'moment';
import findDstDate from '../dst/find-dst-date.js';

/**
 * @description: 根据传入月份，返回具体的dst时间变化点
 * @author: zhangxin14
 * @since: 2018-10-24 16:02:19
 */
const dstDateRange = time => {
  let year = new Date(moment(time).valueOf()).getFullYear();
  let dstStartMonth = 0;
  let dstEndMonth = 0;
  let lastOffset = 99;
  if (year < 1000) year += 1900;
  for (let i = 0; i < 12; i++) {
    const newDate = new Date(Date.UTC(year, i, 0, 0, 0, 0, 0));
    const tz = (-1 * newDate.getTimezoneOffset()) / 60;
    if (tz > lastOffset) dstStartMonth = i - 1;
    if (tz < lastOffset) dstEndMonth = i - 1;
    lastOffset = tz;
  }
  const dstStartTime = findDstDate(year, dstStartMonth);
  const dstEndTime = findDstDate(year, dstEndMonth);
  return !dstStartTime && !dstEndTime ? null : { dstStartTime, dstEndTime };
};

export default dstDateRange;
