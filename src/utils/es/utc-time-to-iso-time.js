import moment from 'moment';
/**
 * @description: iso时间转化为utc时间（毫秒）
 * @param: isoTime {String} iso标准的时间字符串
 * @author: zhangxin14
 * @since: 2018-10-23 11:13:27
 */

var utcTimeToISOTime = function utcTimeToISOTime(utcTime) {
  return moment(utcTime).toISOString(true);
};

export default utcTimeToISOTime;