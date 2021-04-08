"use strict";

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isElement = _interopRequireDefault(require("./is-element.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scrollTo = function scrollTo(el, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var doc = (0, _getDocument["default"])(el);

  if (!(0, _isElement["default"])(el)) {
    duration = to || 0;
    to = el;
    el = doc.documentElement || doc.body;
  }

  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
    return setTimeout(arguments[0], 10);
  }; // jump to target if duration zero


  if (duration <= 0) {
    el.scrollTop = to;
    return;
  }

  var difference = to - el.scrollTop;
  var perTick = difference / duration * 10;
  requestAnimationFrame(function () {
    el.scrollTop += perTick;
    if (el.scrollTop === to) return;
    scrollTo(el, to, duration - 10);
  });
};

var _default = scrollTo;
exports["default"] = _default;