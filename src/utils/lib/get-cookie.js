"use strict";

require("core-js/modules/es.array.index-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 获取cookie
 * @export
 * @param {any} name
 * @returns
 */
var getCookie = function getCookie(name) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(name + '=');
    var end = 0;

    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }

  return '';
};

var _default = getCookie;
exports["default"] = _default;