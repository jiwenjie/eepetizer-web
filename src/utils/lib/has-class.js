"use strict";

require("core-js/modules/es.array.index-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var hasClass = function hasClass(el, cls) {
  if (!el || !cls || cls.indexOf(' ') !== -1) {
    return false;
  }

  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return " ".concat(el.className, " ").indexOf(" ".concat(cls, " ")) > -1;
  }
};

var _default = hasClass;
exports["default"] = _default;