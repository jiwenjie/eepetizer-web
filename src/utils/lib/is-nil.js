"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

var _isNull = _interopRequireDefault(require("./is-null.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isNil = function isNil(val) {
  return (0, _isUndefined["default"])(val) || (0, _isNull["default"])(val);
};

var _default = isNil;
exports["default"] = _default;