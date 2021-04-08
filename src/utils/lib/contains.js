"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isServer = _interopRequireDefault(require("./is-server.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contains = function (context, el) {
  if (_isServer["default"] || typeof window === 'undefined') {
    return;
  }

  var doc = (0, _getDocument["default"])(el);
  var docElem = doc.documentElement;
  var nativeReg = /^[^{]+\{\s*\[native \w/;
  var isNativeSupport = nativeReg.test(docElem.compareDocumentPosition) || nativeReg.test(docElem.contains);
  return isNativeSupport ? function (context, el) {
    var ele = context.nodeType === 9 ? context.documentElement : context;
    var parentNode = el && el.parentNode;
    return context === parentNode || !!(parentNode && parentNode.nodeType === 1 && (ele.contains ? ele.contains(parentNode) : context.compareDocumentPosition && context.compareDocumentPosition(parentNode) & 16));
  } : function (context, el) {
    if (el) {
      while (el = el.parentNode) {
        if (el === context) {
          return true;
        }
      }

      return false;
    }
  };
}();

var _default = contains;
exports["default"] = _default;