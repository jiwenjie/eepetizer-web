import moment from 'moment';

/**
 * @description: 格式化时间
 * @param isoTime {String} ISO时间字符串
 * @param isEnableDST {Boolean} 是否显示时区差,如果不传则从`localStorage`中取，如果传了以传入值为准
 * @author: zhangxin14
 * @since: 2018-11-01 12:10:26
 */
const formatTime = function(isoTime, isEnableDST) {
  if (!isoTime) return '';
  /* eslint-disable */
  isEnableDST =
    arguments.length === 1
      ? window.localStorage.getItem('isEnableDST')
      : isEnableDST; 
  const momentTime = moment(isoTime);
  return momentTime
    .utcOffset(momentTime._tzm)
    .format(isEnableDST ? 'YYYY/MM/DD HH:mm:ss Z' : 'YYYY/MM/DD HH:mm:ss');
};

export default formatTime;
