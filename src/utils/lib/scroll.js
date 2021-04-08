"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.scrollLeft = exports.scrollTop = void 0;

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _getWindow = _interopRequireDefault(require("./get-window.js"));

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scroll = function scroll(el, type, val) {
  var win = (0, _getWindow["default"])(el);
  var isWin = (0, _isWindow["default"])(el);
  var doc = (0, _getDocument["default"])(el);

  if ((0, _isUndefined["default"])(val)) {
    if (isWin) {
      return 'pageYOffset' in win ? win.pageYOffset : doc.documentElement[type] || doc.body[type];
    } else if (el === doc.documentElement || el === doc.body) {
      return doc.documentElement[type] || doc.body[type];
    } else {
      return el[type];
    }
  } else {
    type = type === 'scrollTop' ? 'scrollLeft' : 'scrollTop';
    var x = (0, _isObject["default"])(val) ? val.x : 0;
    var y = (0, _isObject["default"])(val) ? val.y : val;

    if (isWin || el === doc.documentElement || el === doc.body) {
      win.scrollTo(x, y);
    } else {
      el[type] = val;
    }

    return val;
  }
};

var scrollTop = function scrollTop(el, val) {
  return scroll(el, 'scrollTop', val);
};

exports.scrollTop = scrollTop;

var scrollLeft = function scrollLeft(el, val) {
  return scroll(el, 'scrollLeft', val);
};

exports.scrollLeft = scrollLeft;
var _default = scroll;
exports["default"] = _default;