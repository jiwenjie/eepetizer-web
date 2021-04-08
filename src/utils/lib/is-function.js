"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = _interopRequireDefault(require("./type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isFunction = function isFunction(val) {
  return (0, _type["default"])(val) === 'Function';
};

var _default = isFunction;
exports["default"] = _default;