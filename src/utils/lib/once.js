"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _on = _interopRequireDefault(require("./on.js"));

var _off = _interopRequireDefault(require("./off.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this, arguments);
    }

    (0, _off["default"])(el, event, listener);
  };

  (0, _on["default"])(el, event, listener);
  return listener;
};

var _default = once;
exports["default"] = _default;