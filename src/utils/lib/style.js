"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hyphenate = _interopRequireDefault(require("./hyphenate.js"));

var _camelizeStyle = _interopRequireDefault(require("./camelize-style.js"));

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

var _isString = _interopRequireDefault(require("./is-string.js"));

var _isNumber = _interopRequireDefault(require("./is-number.js"));

var _isNil = _interopRequireDefault(require("./is-nil.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

var _isNull = _interopRequireDefault(require("./is-null.js"));

var _getDocument = _interopRequireDefault(require("./get-document.js"));

var _removeStyle = _interopRequireDefault(require("./remove-style.js"));

var _getBrowserPrefix = _interopRequireDefault(require("./get-browser-prefix.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isCssPropSupported = function isCssPropSupported(prop, prefix) {
  if (prefix) {
    prop = "".concat((0, _getBrowserPrefix["default"])()).concat(prop);
  }

  return prop in document.body.style;
};

var isTransform = function isTransform(prop) {
  var transformReg = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
  return !!(prop && transformReg.test(prop));
};

var style = function style(el, props, val) {
  if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style) {
    return null;
  }

  var $divEl = document.createElement('div');
  var doc = (0, _getDocument["default"])(el);

  var getPropertyValue = function getPropertyValue(props) {
    var positionReg = /^(top|right|bottom|left)$/;
    var numnonpxReg = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
    var style = el.style;
    var styles = el.currentStyle[props] || null;
    props = (0, _camelizeStyle["default"])(props);

    if (props === 'float') {
      props = 'styleFloat';
    }

    if ((0, _isNull["default"])(styles) && style && style[props]) {
      styles = style[props];
    }

    if (numnonpxReg.test(styles) && !positionReg.test(props)) {
      var left = style.left;
      var runStyle = el.runtimeStyle;
      var rsLeft = runStyle && runStyle.left;

      if (rsLeft) {
        runStyle.left = el.currentStyle.left;
      }

      style.left = props === 'fontSize' ? '1em' : styles;
      styles = "".concat(style.pixelLeft, "px");
      style.left = left;

      if (rsLeft) {
        runStyle.left = rsLeft;
      }
    }

    return styles;
  };

  var getStyle = function getStyle() {
    return 'defaultView' in doc ? doc.defaultView.opener ? doc.defaultView.getComputedStyle(el, null) : window.getComputedStyle(el, null) : el.currentStyle;
  };

  if (!(0, _isUndefined["default"])(val)) {
    props = _defineProperty({}, props, val);
  }

  if ((0, _isUndefined["default"])(props)) {
    return getStyle();
  }

  if ((0, _isString["default"])(props)) {
    return 'defaultView' in doc ? doc.defaultView.opener ? doc.defaultView.getComputedStyle(el, null).getPropertyValue((0, _hyphenate["default"])(props)) : window.getComputedStyle(el, null).getPropertyValue((0, _hyphenate["default"])(props)) : getPropertyValue(props);
  }

  if ((0, _isObject["default"])(props)) {
    var transforms = '';
    var css = '';
    Object.keys(props).map(function (key) {
      var value = props[key];
      var propKey = isCssPropSupported(key, true) ? "".concat((0, _getBrowserPrefix["default"])()).concat((0, _hyphenate["default"])(key)) : (0, _hyphenate["default"])(key);

      if ((0, _isNil["default"])(value)) {
        (0, _removeStyle["default"])(el, propKey);
      } else {
        if (isTransform(key)) {
          transforms += "".concat(key, "(").concat(value, ") ");
        } else {
          var styleItem = "".concat(propKey, ": ").concat(value, ";");
          $divEl.style.cssText = styleItem;

          if ($divEl.style[key] === '' && (0, _isNumber["default"])(value)) {
            styleItem = "".concat(propKey, ": ").concat(value, "px;");
          }

          css += styleItem;
        }
      }
    });

    if (transforms !== '') {
      css += "".concat((0, _getBrowserPrefix["default"])(), "transform: ").concat(transforms, ";");
    }

    if (css !== '') {
      el.style.cssText += ";".concat(css);
    }

    return getStyle();
  }
};

var _default = style;
exports["default"] = _default;