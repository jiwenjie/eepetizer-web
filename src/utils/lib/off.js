"use strict";

require("core-js/modules/es.array.splice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isServer = _interopRequireDefault(require("./is-server.js"));

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _offResize = _interopRequireDefault(require("./off-resize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var polyfill = function polyfill(el, event, fn) {
  if (event === 'resize') {
    if (!(0, _isWindow["default"])(el)) {
      (0, _offResize["default"])(el, fn);
    }
  }
};

var off = function () {
  if (_isServer["default"] || typeof window === 'undefined') {
    return;
  }

  if (window.removeEventListener) {
    return function (el, event, fn) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      polyfill(el, event, fn);
      el.removeEventListener(event, fn, capture);
    };
  } else {
    return function (el, event, fn) {
      polyfill(el, event, fn);
      el.detachEvent("on".concat(event), fn.prototype["$$".concat(event)].$$function);

      if (fn.prototype["$$".concat(event)].$$el.length === 1) {
        delete fn.prototype["$$".concat(event)];
      } else {
        for (var i in fn.prototype["$$".concat(event)].$$el) {
          if (fn.prototype["$$".concat(event)].$$el[i] === el) {
            fn.prototype["$$".concat(event)].$$el.splice(i, 1);
            break;
          }
        }
      }
    };
  }
}();

var _default = off;
exports["default"] = _default;