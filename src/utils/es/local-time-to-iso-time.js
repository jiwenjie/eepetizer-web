import moment from 'moment';
import dstDateRange from "./dst-date-range.js";
import computedDstShiftTime from "./computed-dst-shift-time.js";
/**
 * @description: 本地时间转化为iso时间
 * @param: localTime {String | Date | Number} 本地时间
 * @param: isForward {Boolean} 尽量靠前后标记，布尔类型，true表示向前，false表示向后,仅在本地时间处于离开夏令时的重叠区间时有效
 * @returns iso时间
 * @author: zhangxin14
 * @since: 2018-10-23 11:13:27
 */

var localTimeToISOTime = function localTimeToISOTime(localTime) {
  var isForward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!localTime) return moment().toISOString(true); // 如果当前时区不存在夏令时，则直接返回iso时间

  if (!dstDateRange(localTime)) return moment(localTime).toISOString(true); // 时间盲区只有在出夏令时存在

  var _dstDateRange = dstDateRange(localTime),
      dstEndTime = _dstDateRange.dstEndTime; // 时间盲区是出夏令时时的时间向前拔一定的偏移时间
  // 计算夏令时偏移的时间量，一般来说都是1个小时，但是也存在特殊情况


  var overlapTime = [dstEndTime - computedDstShiftTime(dstEndTime), dstEndTime];
  var localTimeMilliSeconds = moment(localTime).valueOf();

  if (localTimeMilliSeconds > overlapTime[0] && localTimeMilliSeconds <= overlapTime[1]) {
    // 如果选择的时间在时间盲区之间
    // 如果在dst内，时差偏移量需要矫正会标准时差
    var timeOffset = moment().utcOffset() + (moment().isDST() ? -60 : 0);
    return moment(localTime).utcOffset(timeOffset + (isForward ? computedDstShiftTime(dstEndTime) / 60 / 1000 : 0), true).toISOString(true);
  } else {
    return moment(localTime).toISOString(true);
  }
};

export default localTimeToISOTime;