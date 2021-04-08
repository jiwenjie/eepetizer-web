"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var removeStyle = function removeStyle(el, propKey) {
  if ((0, _isUndefined["default"])(propKey)) {
    el.removeAttribute('style');
  }

  'removeProperty' in el.style ? el.style.removeProperty(propKey) : el.style.removeAttribute(propKey);

  if (el.getAttribute('style') === '') {
    el.removeAttribute('style');
  }
};

var _default = removeStyle;
exports["default"] = _default;