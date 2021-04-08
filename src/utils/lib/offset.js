"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _scrollLeft = _interopRequireDefault(require("./scroll-left.js"));

var _scrollTop = _interopRequireDefault(require("./scroll-top.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var offset = function offset(el, container) {
  var doc = (0, _getDocument["default"])(el);
  container = container || doc.documentElement || doc.body;
  var rect = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  if (!(0, _contains["default"])(container, el)) {
    return rect;
  }

  if (el.getBoundingClientRect) {
    rect = el.getBoundingClientRect();
  }

  var clientTop = container.clientTop || 0;
  var clientLeft = container.clientLeft || 0;
  var top, left; // 存在容器时，获取元素到容器左上角的相对位置

  if (container === doc.documentElement || container === doc.body) {
    top = (0, _scrollTop["default"])(container);
    left = (0, _scrollLeft["default"])(container);
  } else {
    var containerRect = container.getBoundingClientRect();
    top = (0, _scrollTop["default"])(container) - containerRect.top;
    left = (0, _scrollLeft["default"])(container) - containerRect.left;
  }

  rect = {
    top: rect.top + top - clientTop,
    left: rect.left + left - clientLeft,
    right: rect.right + left - clientLeft,
    bottom: rect.bottom + top - clientTop
  };
  return rect;
};

var _default = offset;
exports["default"] = _default;