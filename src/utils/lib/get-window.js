"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _isDocument = _interopRequireDefault(require("./is-document.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getWindow = function getWindow(el) {
  return el && (0, _isDocument["default"])(el) ? el.defaultView || el.parentWindow : getWindow((0, _getDocument["default"])(el));
};

var _default = getWindow;
exports["default"] = _default;