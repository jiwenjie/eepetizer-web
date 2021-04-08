"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getLocalStorage = function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name)) || {};
};

var _default = getLocalStorage;
exports["default"] = _default;