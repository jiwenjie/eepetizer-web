"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getDocument = function getDocument(el) {
  return el && el.ownerDocument || (typeof window !== 'undefined' ? document : null);
};

var _default = getDocument;
exports["default"] = _default;