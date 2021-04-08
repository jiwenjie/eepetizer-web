"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isServer = typeof window !== 'undefined' ? (0, _isUndefined["default"])(window || document) : false;
var _default = isServer;
exports["default"] = _default;