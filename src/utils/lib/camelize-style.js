"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _camelize = _interopRequireDefault(require("./camelize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var camelizeStyle = function camelizeStyle(string, upperCase) {
  var prefixReg = /^-(ms|webkit)-/;
  return (0, _camelize["default"])(prefixReg.test(string) ? string.substring(1, string.length) : string, upperCase);
};

var _default = camelizeStyle;
exports["default"] = _default;