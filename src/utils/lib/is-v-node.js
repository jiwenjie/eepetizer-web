"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNull = _interopRequireDefault(require("./is-null.js"));

var _type = _interopRequireDefault(require("./type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isVNode = function isVNode(node) {
  return !(0, _isNull["default"])(node) && (0, _type["default"])(node) === 'Object' && hasOwnProperty.call(node, 'componentOptions');
};

var _default = isVNode;
exports["default"] = _default;