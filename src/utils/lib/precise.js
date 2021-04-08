"use strict";

require("core-js/modules/es.parse-int");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var precise = function precise(number) {
  var point = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var m = Math.pow(10, point);
  return parseInt(number * m, 10) / m;
};

var _default = precise;
exports["default"] = _default;