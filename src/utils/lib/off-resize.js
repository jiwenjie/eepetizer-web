"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.splice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @desc 移除监听元素大小变化
 * @author 陈冠彬
 * @param {Document} el 监听的元素
 * @param {Function} fn 回调函数
 */
var offResize = function offResize(el, fn) {
  if (!el || !el.__resizeListeners__) return;

  el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1);

  if (!el.__resizeListeners__.length) {
    el.__ro__.disconnect();
  }
};

var _default = offResize;
exports["default"] = _default;