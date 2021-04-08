"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getPageY = exports.getPageX = void 0;

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _scroll = require("./scroll.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ?? 兼容性专用
var getPage = function getPage(e, type) {
  var pageX = e.pageX || e.clientX + (0, _scroll.scrollLeft)((0, _getDocument["default"])());
  var pageY = e.pageY || e.clientY + (0, _scroll.scrollTop)((0, _getDocument["default"])());

  if (type === 'x') {
    return pageX;
  } else if (type === 'y') {
    return pageY;
  } else {
    return {
      pageX: pageX,
      pageY: pageY
    };
  }
};

var getPageX = function getPageX(e) {
  return getPage(e, 'x');
};

exports.getPageX = getPageX;

var getPageY = function getPageY(e) {
  return getPage(e, 'y');
};

exports.getPageY = getPageY;
var _default = getPage;
exports["default"] = _default;