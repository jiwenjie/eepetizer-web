"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _once = _interopRequireDefault(require("./once.js"));

var _scrollTop = _interopRequireDefault(require("./scroll-top.js"));

var _height = _interopRequireDefault(require("./height.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _isDocument = _interopRequireDefault(require("./is-document.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scrollLoad = function scrollLoad(el, fn) {
  var opts = {
    isTop: true,
    isBottom: false
  };
  var isWin = (0, _isWindow["default"])(el);
  var isDoc = (0, _isDocument["default"])(el);

  if (isWin || isDoc) {
    el = (0, _getDocument["default"])(el).body;
  }

  (0, _once["default"])(el, 'scroll', function (e) {
    var scrollHeight = (0, _height["default"])(el, 'scroll');
    var elHeight = (0, _height["default"])(el);
    var st = (0, _scrollTop["default"])(el);
    opts.isTop = st === 0;
    opts.isBottom = st + elHeight >= scrollHeight;

    if (opts.isTop || opts.isBottom) {
      fn(opts, e);
    }
  });
};

var _default = scrollLoad;
exports["default"] = _default;