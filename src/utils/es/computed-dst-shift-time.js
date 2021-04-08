/**
 * @description: 计算夏令时的时间偏移量
 * @author: zhangxin14
 * @since: 2018-12-03 15:23:13
 */
var computedDstShiftTime = function computedDstShiftTime(dstEndTime) {
  // 出夏令时的临界时间点，比如 1:59:59
  var outDstHours = new Date(dstEndTime).getHours();
  var outDstMinutes = new Date(dstEndTime).getMinutes(); // 在出夏令时的临界时间点加 1秒，得到是出夏令时后的标准时间（2:00:00这个时间点实际是不存在）

  var stdHours = new Date(dstEndTime + 1000).getHours();
  var stdMinutes = new Date(dstEndTime + 1000).getMinutes(); // 用夏令时临界时间点减去出夏令时后的标准时间，得到两者实际的时间偏移量
  // 额外加1分钟是因为零界点的时间是59分，防止少一分钟

  return (outDstHours * 60 + outDstMinutes + 1 - stdHours * 60 - stdMinutes) * 60 * 1000;
};

export default computedDstShiftTime;