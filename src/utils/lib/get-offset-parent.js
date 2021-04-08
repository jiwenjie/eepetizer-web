"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _getNodeName = _interopRequireDefault(require("./get-node-name.js"));

var _style = _interopRequireDefault(require("./style.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getOffsetParent = function getOffsetParent(el) {
  var doc = (0, _getDocument["default"])(el);
  var offsetParent = el && el.offsetParent;

  while (offsetParent && (0, _getNodeName["default"])(el) !== 'html' && (0, _style["default"])(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
};

var _default = getOffsetParent;
exports["default"] = _default;