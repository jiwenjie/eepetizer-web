"use strict";

require("core-js/modules/es.parse-int");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getOffsetParent = _interopRequireDefault(require("./get-offset-parent.js"));

var _getNodeName = _interopRequireDefault(require("./get-node-name.js"));

var _offset = _interopRequireDefault(require("./offset"));

var _style = _interopRequireDefault(require("./style.js"));

var _scroll = require("./scroll.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var position = function position(el, offsetParent) {
  var parentOffset = {
    top: 0,
    left: 0
  };
  var nodeOffset;

  if ((0, _style["default"])(el, 'position') === 'fixed') {
    nodeOffset = el.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || (0, _getOffsetParent["default"])(el);
    nodeOffset = (0, _offset["default"])(el);

    if ((0, _getNodeName["default"])(offsetParent) !== 'html') {
      parentOffset = (0, _offset["default"])(offsetParent);
    }

    parentOffset.top += parseInt((0, _style["default"])(offsetParent, 'borderTopWidth')) - (0, _scroll.scrollTop)(offsetParent) || 0;
    parentOffset.left += parseInt((0, _style["default"])(offsetParent, 'borderLeftWidth')) - (0, _scroll.scrollLeft)(offsetParent) || 0;
  }

  return {
    top: nodeOffset.top - parentOffset.top - (parseInt((0, _style["default"])(el, 'marginTop')) || 0),
    left: nodeOffset.left - parentOffset.left - (parseInt((0, _style["default"])(el, 'marginLeft')) || 0)
  };
};

var _default = position;
exports["default"] = _default;