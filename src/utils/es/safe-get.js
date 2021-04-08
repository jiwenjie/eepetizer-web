function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import isFunction from "./is-function.js";

var safeGet = function safeGet(object, key) {
  if (key === 'constructor' && _typeof(isFunction(object[key]))) {
    return;
  }

  if (key === '__proto__') {
    return;
  }

  return object[key];
};

export default safeGet;