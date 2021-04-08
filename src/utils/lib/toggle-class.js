"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hasClass = _interopRequireDefault(require("./has-class.js"));

var _addClass = _interopRequireDefault(require("./add-class.js"));

var _removeClass = _interopRequireDefault(require("./remove-class.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var toggleClass = function toggleClass(el, cls) {
  if ((0, _hasClass["default"])(el, cls)) {
    (0, _removeClass["default"])(el, cls);
  } else {
    (0, _addClass["default"])(el, cls);
  }
};

var _default = toggleClass;
exports["default"] = _default;