"use strict";

require("core-js/modules/es.date.to-iso-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @description: iso时间转化为utc时间（毫秒）
 * @param: isoTime {String} iso标准的时间字符串
 * @author: zhangxin14
 * @since: 2018-10-23 11:13:27
 */
var utcTimeToISOTime = function utcTimeToISOTime(utcTime) {
  return (0, _moment["default"])(utcTime).toISOString(true);
};

var _default = utcTimeToISOTime;
exports["default"] = _default;