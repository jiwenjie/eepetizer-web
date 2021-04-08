"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getSessionStorage = _interopRequireDefault(require("./get-session-storage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setSessionStorage = function setSessionStorage(name, data) {
  var storageData = (0, _getSessionStorage["default"])(name) || {};
  sessionStorage.setItem(name, JSON.stringify(Object.assign({}, storageData, data)));
};

var _default = setSessionStorage;
exports["default"] = _default;