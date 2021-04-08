"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @description: 格式化时间
 * @param isoTime {String} ISO时间字符串
 * @param isEnableDST {Boolean} 是否显示时区差,如果不传则从`localStorage`中取，如果传了以传入值为准
 * @author: zhangxin14
 * @since: 2018-11-01 12:10:26
 */
var formatTime = function formatTime(isoTime, isEnableDST) {
  if (!isoTime) return '';
  /* eslint-disable */

  isEnableDST = arguments.length === 1 ? window.localStorage.getItem('isEnableDST') : isEnableDST;
  var momentTime = (0, _moment["default"])(isoTime);
  return momentTime.utcOffset(momentTime._tzm).format(isEnableDST ? 'YYYY/MM/DD HH:mm:ss Z' : 'YYYY/MM/DD HH:mm:ss');
};

var _default = formatTime;
exports["default"] = _default;