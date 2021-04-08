"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getLocalStorage = _interopRequireDefault(require("./get-local-storage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setLocalStorage = function setLocalStorage(name, data) {
  var storageData = (0, _getLocalStorage["default"])(name) || {};
  localStorage.setItem(name, JSON.stringify(Object.assign({}, storageData, data)));
};

var _default = setLocalStorage;
exports["default"] = _default;