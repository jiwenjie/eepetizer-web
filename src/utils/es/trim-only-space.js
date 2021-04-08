function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import isObject from "./is-object.js";
import isString from "./is-string.js";
/**
 * @desc 将对象格式的字符串转成对象
 * @author chenguanbin
 * @param {String} string 对象格式的字符串
 * @return 转换后的对象
 */

var _string2object = function _string2object(string) {
  // 传入的不是字符串则直接返回
  if (!isString(string)) return string;
  var object = {};
  var array = string.split('&');

  var _iterator = _createForOfIteratorHelper(array),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var arr = item.split('='); // 过滤掉第一个等号前的值，那是key，后面的都是参数值

      var value = arr.slice(1).join('=');
      object[arr[0]] = value ? decodeURIComponent(value) : '';
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return object;
};
/**
 * @desc 将对象转成对象格式的字符串
 * @author chenguanbin
 * @param {Object} object 对象
 * @return 转换后的字符串
 */


var _object2string = function _object2string(object) {
  // 传入的不是对象则直接返回
  if (!isObject(object)) return object;
  var array = [];

  for (var _i = 0, _Object$keys = Object.keys(object); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    array.push("".concat(key, "=").concat(encodeURIComponent(object[key])));
  }

  return array.join('&');
};
/**
 * @desc 参数只有空格时，将其替换成空字符串
 * @author chenguanbin
 * @param {Object} params 请求参数
 * @return 处理有的参数
 */


var _trimOnlySpace = function _trimOnlySpace(params) {
  for (var _i2 = 0, _Object$keys2 = Object.keys(params); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    var value = params[key];
    if (!value || !isString(value)) continue;
    if (value.trim() === '') params[key] = '';
  }

  return params;
};
/**
 * @desc 当 axios 请求参数中只有空格时，将其替换成空字符串
 * @author chenguanbin
 * @param {Object} config axios 请求拦截器的 config 对象
 * @return 处理后的请求参数
 */


var trimOnlySpace = function trimOnlySpace(config) {
  if (config.method === 'get' && config.params) {
    config.params = _trimOnlySpace(config.params);
  }

  if (config.method === 'post' && config.data) {
    var data = config.data; // 是对象则直接处理，否则转成对象再处理

    if (isObject(data)) {
      config.data = _trimOnlySpace(data);
    } else {
      var params = _string2object(config.data);

      params = _trimOnlySpace(params);
      config.data = _object2string(params);
    }
  }

  return config;
};

export default trimOnlySpace;