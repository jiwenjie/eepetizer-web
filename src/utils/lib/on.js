"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isServer = _interopRequireDefault(require("./is-server.js"));

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _onResize = _interopRequireDefault(require("./on-resize.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var polyfill = function polyfill(el, event, fn) {
  if (event === 'resize') {
    if (!(0, _isWindow["default"])(el)) {
      (0, _onResize["default"])(el, fn);
    }
  }
};

var on = function () {
  if (_isServer["default"] || typeof window === 'undefined') {
    return;
  }

  if (window.addEventListener) {
    return function (el, event, fn) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      polyfill(el, event, fn);
      el.addEventListener(event, fn, capture);
    };
  } else {
    return function (el, event, fn) {
      polyfill(el, event, fn);

      if (!fn.prototype["$$".concat(event)]) {
        fn.prototype["$$".concat(event)] = {
          $$function: function $$function(event) {
            fn.call(el, event);
          },
          $$el: [el]
        };
        el.attachEvent("on".concat(event), fn.prototype["$$".concat(event)].$$function);
      } else {
        var hasListener = true;

        for (var i in fn.prototype["$$".concat(event)].$$el) {
          if (fn.prototype["$$".concat(event)].$$el[i] === el) {
            hasListener = false;
            break;
          }
        }

        if (hasListener === true) {
          el.attachEvent("on".concat(event), fn.prototype["$$".concat(event)].$$function);
        } else {
          var _hasListener = true;

          for (var _i in fn.prototype["$$".concat(event)].$$el) {
            if (fn.prototype["$$".concat(event)].$$el[_i] === el) {
              _hasListener = false;
              break;
            }
          }

          if (_hasListener === true) {
            el.attachEvent("on".concat(event), fn.prototype["$$".concat(event)].$$function);
            fn.prototype["$$".concat(event)].$$el.push(el);
          }
        }
      }
    };
  }
}();

var _default = on;
exports["default"] = _default;