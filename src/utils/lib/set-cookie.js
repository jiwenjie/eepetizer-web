"use strict";

require("core-js/modules/es.date.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 设置cookie
 * @export
 * @param {string} name
 * @param {any} value
 * @param {any} expiredays
 */
var setCookie = function setCookie(name, value, expiredays) {
  var exdate = new Date();

  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
  }

  document.cookie = name + '=' + escape(value) + (expiredays === null ? '' : ';expires=' + exdate.toGMTString()) + ';path=/;';
};

var _default = setCookie;
exports["default"] = _default;