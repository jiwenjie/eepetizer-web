"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _isDocument = _interopRequireDefault(require("./is-document.js"));

var _isNil = _interopRequireDefault(require("./is-nil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isElement = function isElement(el) {
  if ((0, _isNil["default"])(el)) {
    return false;
  }

  var div = document.createElement('div');

  try {
    div.appendChild(el.cloneNode(true));
    return el.nodeType === 1;
  } catch (e) {
    return (0, _isWindow["default"])(el) || (0, _isDocument["default"])(el);
  }
};

var _default = isElement;
exports["default"] = _default;