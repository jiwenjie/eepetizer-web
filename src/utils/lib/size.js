"use strict";

require("core-js/modules/es.parse-int");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.height = exports.width = void 0;

var _isNull = _interopRequireDefault(require("./is-null.js"));

var _style = _interopRequireDefault(require("./style.js"));

var _isWindow = _interopRequireDefault(require("./is-window.js"));

var _isDocument = _interopRequireDefault(require("./is-document.js"));

var _getWindow = _interopRequireDefault(require("./get-window.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSize = function getSize(el, attr, type) {
  var size = 0;
  var cloneNode = null;

  if ((0, _style["default"])(el, 'display') === 'none') {
    cloneNode = el.cloneNode(true);
    cloneNode.style.display = 'block';
    cloneNode.style.position = 'absolute';
    cloneNode.style.top = '-99999px';
    cloneNode.style.opacity = 0;
    (0, _getDocument["default"])(el).body.appendChild(cloneNode);
    el = cloneNode;
  }

  if ((0, _isWindow["default"])(el) || (0, _isDocument["default"])(el)) {
    size = (0, _getWindow["default"])(el)["inner".concat(attr)];
  } else {
    var paddingSize = parseInt((0, _style["default"])(el, 'padding-top')) + parseInt((0, _style["default"])(el, 'padding-bottom'));

    if (isNaN(paddingSize)) {
      paddingSize = 0;
    }

    var marginSize = parseInt((0, _style["default"])(el, 'margin-top')) + parseInt((0, _style["default"])(el, 'margin-bottom'));

    if (isNaN(marginSize)) {
      marginSize = 0;
    }

    var borderSize = parseInt((0, _style["default"])(el, 'border-top')) + parseInt((0, _style["default"])(el, 'border-bottom'));

    if (isNaN(borderSize)) {
      borderSize = 0;
    }

    switch (type) {
      case 'inner':
        size = el["offset".concat(attr)] - borderSize;
        break;

      case 'outer':
        size = el["offset".concat(attr)];
        break;

      case 'box':
        size = el["offset".concat(attr)] + marginSize;
        break;

      case 'scroll':
        size = el["scroll".concat(attr)];
        break;

      default:
        size = el["offset".concat(attr)] - paddingSize - borderSize;
    }
  }

  if (!(0, _isNull["default"])(cloneNode)) {
    (0, _getDocument["default"])(el).body.removeChild(cloneNode);
  }

  return size;
};

var width = function width(el, type) {
  return getSize(el, 'Width', type);
};

exports.width = width;

var height = function height(el, type) {
  return getSize(el, 'Height', type);
};

exports.height = height;

var size = function size(el, type) {
  return {
    width: getSize(el, 'Width', type),
    height: getSize(el, 'Height', type)
  };
};

var _default = size;
exports["default"] = _default;