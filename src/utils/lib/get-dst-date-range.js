"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _dstDateRange = _interopRequireDefault(require("./dst-date-range.js"));

var _computedDstShiftTime = _interopRequireDefault(require("./computed-dst-shift-time.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var getDstDateRange = function getDstDateRange(localTime) {
  var dstTime = (0, _dstDateRange["default"])(localTime);
  return !dstTime ? dstTime : {
    dstStartTime: dstTime.dstStartTime,
    dstEndTime: dstTime.dstEndTime,
    timezoneShift: (0, _moment["default"])().utcOffset() + ((0, _moment["default"])().isDST() ? -60 : 0),
    dstShift: (0, _computedDstShiftTime["default"])(dstTime.dstEndTime) / 60 / 1000
  };
};

var _default = getDstDateRange;
exports["default"] = _default;