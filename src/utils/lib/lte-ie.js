"use strict";

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getBrowserInfo = _interopRequireDefault(require("./get-browser-info.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var lteIe = function lteIe(v) {
  var info = (0, _getBrowserInfo["default"])();
  return info.name === 'Internet Explorer' && info.version <= v;
};

var _default = lteIe;
exports["default"] = _default;