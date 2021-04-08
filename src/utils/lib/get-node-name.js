"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getNodeName = function getNodeName(el) {
  return el.nodeName && el.nodeName.toLowerCase();
};

var _default = getNodeName;
exports["default"] = _default;