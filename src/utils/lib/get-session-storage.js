"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getSessionStorage = function getSessionStorage(name) {
  return JSON.parse(sessionStorage.getItem(name)) || {};
};

var _default = getSessionStorage;
exports["default"] = _default;