"use strict";

require("core-js/modules/es.date.to-iso-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dstDateRange2 = _interopRequireDefault(require("./dst-date-range.js"));

var _computedDstShiftTime = _interopRequireDefault(require("./computed-dst-shift-time.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  if (!localTime) return (0, _moment["default"])().toISOString(true); // 如果当前时区不存在夏令时，则直接返回iso时间

  if (!(0, _dstDateRange2["default"])(localTime)) return (0, _moment["default"])(localTime).toISOString(true); // 时间盲区只有在出夏令时存在

  var _dstDateRange = (0, _dstDateRange2["default"])(localTime),
      dstEndTime = _dstDateRange.dstEndTime; // 时间盲区是出夏令时时的时间向前拔一定的偏移时间
  // 计算夏令时偏移的时间量，一般来说都是1个小时，但是也存在特殊情况


  var overlapTime = [dstEndTime - (0, _computedDstShiftTime["default"])(dstEndTime), dstEndTime];
  var localTimeMilliSeconds = (0, _moment["default"])(localTime).valueOf();

  if (localTimeMilliSeconds > overlapTime[0] && localTimeMilliSeconds <= overlapTime[1]) {
    // 如果选择的时间在时间盲区之间
    // 如果在dst内，时差偏移量需要矫正会标准时差
    var timeOffset = (0, _moment["default"])().utcOffset() + ((0, _moment["default"])().isDST() ? -60 : 0);
    return (0, _moment["default"])(localTime).utcOffset(timeOffset + (isForward ? (0, _computedDstShiftTime["default"])(dstEndTime) / 60 / 1000 : 0), true).toISOString(true);
  } else {
    return (0, _moment["default"])(localTime).toISOString(true);
  }
};

var _default = localTimeToISOTime;
exports["default"] = _default;