"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hyphenate = _interopRequireDefault(require("./hyphenate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hyphenateStyle = function hyphenateStyle(string, upperCase) {
  var prefixReg = /^(ms|webkit)-/;
  string = (0, _hyphenate["default"])(string, upperCase);
  return prefixReg.test(string) ? "-".concat(string) : string;
};

var _default = hyphenateStyle;
exports["default"] = _default;