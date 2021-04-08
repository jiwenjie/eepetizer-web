"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNull = _interopRequireDefault(require("./is-null.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isVNode = function isVNode(node) {
  return !(0, _isNull["default"])(node) && (0, _isObject["default"])(node) && hasOwnProperty.call(node, 'render');
};

var _default = isVNode;
exports["default"] = _default;