import moment from 'moment';
import findDstDate from "./find-dst-date.js";
/**
 * @description: 根据传入月份，返回具体的dst时间变化点
 * @author: zhangxin14
 * @since: 2018-10-24 16:02:19
 */

var dstDateRange = function dstDateRange(time) {
  var year = new Date(moment(time).valueOf()).getFullYear();
  var dstStartMonth = 0;
  var dstEndMonth = 0;
  var lastOffset = 99;
  if (year < 1000) year += 1900;

  for (var i = 0; i < 12; i++) {
    var newDate = new Date(Date.UTC(year, i, 0, 0, 0, 0, 0));
    var tz = -1 * newDate.getTimezoneOffset() / 60;
    if (tz > lastOffset) dstStartMonth = i - 1;
    if (tz < lastOffset) dstEndMonth = i - 1;
    lastOffset = tz;
  }

  var dstStartTime = findDstDate(year, dstStartMonth);
  var dstEndTime = findDstDate(year, dstEndMonth);
  return !dstStartTime && !dstEndTime ? null : {
    dstStartTime: dstStartTime,
    dstEndTime: dstEndTime
  };
};

export default dstDateRange;