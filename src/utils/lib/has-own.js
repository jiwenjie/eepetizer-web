"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNil = _interopRequireDefault(require("./is-nil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hasOwn = function hasOwn(obj, key) {
  return !(0, _isNil["default"])(obj) && Object.prototype.hasOwnProperty.call(obj, key);
};

var _default = hasOwn;
exports["default"] = _default;