"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var removeNode = function removeNode(el) {
  el.parentNode.removeChild(el);
};

var _default = removeNode;
exports["default"] = _default;