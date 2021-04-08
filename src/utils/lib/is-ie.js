"use strict";

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getBrowserInfo = _interopRequireDefault(require("./get-browser-info.js"));

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isIe = function isIe(v) {
  var browserInfo = (0, _getBrowserInfo["default"])();
  var isIeVal = browserInfo.name === 'Internet Explorer';

  if ((0, _isUndefined["default"])(v)) {
    return isIeVal;
  } else {
    return isIeVal && browserInfo.version === v;
  }
};

var _default = isIe;
exports["default"] = _default;