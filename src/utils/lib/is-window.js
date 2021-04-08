"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNil = _interopRequireDefault(require("./is-nil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isWindow = function isWindow(el) {
  return !(0, _isNil["default"])(el) ? el === el.window : false;
};

var _default = isWindow;
exports["default"] = _default;