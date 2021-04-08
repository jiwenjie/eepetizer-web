"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var hyphenate = function hyphenate(string) {
  var upperCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var val = string.replace(/([A-Z])/g, '-$1').toLowerCase();

  if (upperCase) {
    val = val.substring(1, val.length);
  }

  return val;
};

var _default = hyphenate;
exports["default"] = _default;