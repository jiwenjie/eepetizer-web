/**
 * @description: 根据传入月份，返回具体的dst时间变化点
 * @author: zhangxin14
 * @since: 2018-10-24 16:02:19
 */
var findDstDate = function findDstDate(year, month) {
  var baseDate = new Date(Date.UTC(year, month, 0, 0, 0, 0, 0));
  var changeMinute = -1;
  var baseOffset = -1 * baseDate.getTimezoneOffset() / 60;

  for (var day = 0; day < 32; day++) {
    var tmpDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    var tmpOffset = -1 * tmpDate.getTimezoneOffset() / 60;

    if (tmpOffset !== baseOffset) {
      var minutes = 0;
      tmpDate = new Date(Date.UTC(year, month, day - 1, 0, 0, 0, 0));
      tmpOffset = -1 * tmpDate.getTimezoneOffset() / 60;

      while (changeMinute === -1) {
        tmpDate = new Date(Date.UTC(year, month, day - 1, 0, minutes, 0, 0));
        tmpOffset = -1 * tmpDate.getTimezoneOffset() / 60;

        if (tmpOffset !== baseOffset) {
          changeMinute = minutes;
          break;
        } else {
          minutes++;
        }
      }

      return new Date(Date.UTC(year, month, day - 1, 0, minutes - 1, 59, 0)).getTime();
    }
  }
};

export default findDstDate;