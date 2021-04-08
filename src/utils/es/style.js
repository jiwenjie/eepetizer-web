function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import hyphenate from "./hyphenate.js";
import camelizeStyle from "./camelize-style.js";
import isUndefined from "./is-undefined.js";
import isString from "./is-string.js";
import isNumber from "./is-number.js";
import isNil from "./is-nil.js";
import isObject from "./is-object.js";
import isNull from "./is-null.js";
import getDocument from "./get-document.js";
import removeStyle from "./remove-style.js";
import getBrowserPrefix from "./get-browser-prefix.js";

var isCssPropSupported = function isCssPropSupported(prop, prefix) {
  if (prefix) {
    prop = "".concat(getBrowserPrefix()).concat(prop);
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
  var doc = getDocument(el);

  var getPropertyValue = function getPropertyValue(props) {
    var positionReg = /^(top|right|bottom|left)$/;
    var numnonpxReg = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
    var style = el.style;
    var styles = el.currentStyle[props] || null;
    props = camelizeStyle(props);

    if (props === 'float') {
      props = 'styleFloat';
    }

    if (isNull(styles) && style && style[props]) {
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

  if (!isUndefined(val)) {
    props = _defineProperty({}, props, val);
  }

  if (isUndefined(props)) {
    return getStyle();
  }

  if (isString(props)) {
    return 'defaultView' in doc ? doc.defaultView.opener ? doc.defaultView.getComputedStyle(el, null).getPropertyValue(hyphenate(props)) : window.getComputedStyle(el, null).getPropertyValue(hyphenate(props)) : getPropertyValue(props);
  }

  if (isObject(props)) {
    var transforms = '';
    var css = '';
    Object.keys(props).map(function (key) {
      var value = props[key];
      var propKey = isCssPropSupported(key, true) ? "".concat(getBrowserPrefix()).concat(hyphenate(key)) : hyphenate(key);

      if (isNil(value)) {
        removeStyle(el, propKey);
      } else {
        if (isTransform(key)) {
          transforms += "".concat(key, "(").concat(value, ") ");
        } else {
          var styleItem = "".concat(propKey, ": ").concat(value, ";");
          $divEl.style.cssText = styleItem;

          if ($divEl.style[key] === '' && isNumber(value)) {
            styleItem = "".concat(propKey, ": ").concat(value, "px;");
          }

          css += styleItem;
        }
      }
    });

    if (transforms !== '') {
      css += "".concat(getBrowserPrefix(), "transform: ").concat(transforms, ";");
    }

    if (css !== '') {
      el.style.cssText += ";".concat(css);
    }

    return getStyle();
  }
};

export default style;