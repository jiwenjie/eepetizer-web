"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNumber = _interopRequireDefault(require("./is-number.js"));

var _isFunction = _interopRequireDefault(require("./is-function.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var includesWith = function includesWith(arr, item, fromIndex, comparator) {
  var length = arr.length;
  var startIndex = -1;

  var compare = function compare(a, b) {
    return a === b;
  };

  if ((0, _isFunction["default"])(fromIndex)) {
    compare = fromIndex;
  } else if ((0, _isNumber["default"])(fromIndex)) {
    startIndex = Math.max(fromIndex + length, 0);
    compare = comparator || compare;
  }

  while (++startIndex < length) {
    if (compare(item, arr[startIndex])) {
      return true;
    }
  }

  return false;
};

var _default = includesWith;
exports["default"] = _default;