"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var closest = function closest(el, filter) {
  if (!el || !filter) return null;

  var traverse = function traverse(el) {
    if (el === document || !el.parentNode) {
      return null;
    }

    var nodes = el.parentNode.querySelectorAll(filter);

    if (nodes && nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] === el) return el;
      }
    }

    return traverse(el.parentNode);
  };

  return traverse(el);
};

var _default = closest;
exports["default"] = _default;