"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = _interopRequireDefault(require("./type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isRegexp = function isRegexp(val) {
  return (0, _type["default"])(val) === 'RegExp';
};

var _default = isRegexp;
exports["default"] = _default;