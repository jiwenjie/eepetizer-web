import hyphenate from '../string/hyphenate.js';
import camelizeStyle from '../string/camelize-style.js';
import isUndefined from '../test/is-undefined.js';
import isString from '../test/is-string.js';
import isNumber from '../test/is-number.js';
import isNil from '../test/is-nil.js';
import isObject from '../test/is-object.js';
import isNull from '../test/is-null.js';
import getDocument from '../dom/get-document.js';
import removeStyle from '../dom/remove-style.js';
import getBrowserPrefix from '../function/get-browser-prefix.js';

const isCssPropSupported = (prop, prefix) => {
  if (prefix) {
    prop = `${getBrowserPrefix()}${prop}`;
  }
  return prop in document.body.style;
};

const isTransform = prop => {
  const transformReg = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
  return !!(prop && transformReg.test(prop));
};

const style = (el, props, val) => {
  if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style) {
    return null;
  }
  const $divEl = document.createElement('div');
  const doc = getDocument(el);
  const getPropertyValue = props => {
    const positionReg = /^(top|right|bottom|left)$/;
    const numnonpxReg = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
    const style = el.style;
    let styles = el.currentStyle[props] || null;
    props = camelizeStyle(props);
    if (props === 'float') {
      props = 'styleFloat';
    }
    if (isNull(styles) && style && style[props]) {
      styles = style[props];
    }
    if (numnonpxReg.test(styles) && !positionReg.test(props)) {
      const left = style.left;
      const runStyle = el.runtimeStyle;
      const rsLeft = runStyle && runStyle.left;
      if (rsLeft) {
        runStyle.left = el.currentStyle.left;
      }
      style.left = props === 'fontSize' ? '1em' : styles;
      styles = `${style.pixelLeft}px`;
      style.left = left;
      if (rsLeft) {
        runStyle.left = rsLeft;
      }
    }
    return styles;
  };
  const getStyle = () => {
    return 'defaultView' in doc
      ? doc.defaultView.opener
        ? doc.defaultView.getComputedStyle(el, null)
        : window.getComputedStyle(el, null)
      : el.currentStyle;
  };
  if (!isUndefined(val)) {
    props = {
      [props]: val
    };
  }

  if (isUndefined(props)) {
    return getStyle();
  }

  if (isString(props)) {
    return 'defaultView' in doc
      ? doc.defaultView.opener
        ? doc.defaultView
            .getComputedStyle(el, null)
            .getPropertyValue(hyphenate(props))
        : window.getComputedStyle(el, null).getPropertyValue(hyphenate(props))
      : getPropertyValue(props);
  }

  if (isObject(props)) {
    let transforms = '';
    let css = '';
    Object.keys(props).map(key => {
      const value = props[key];
      const propKey = isCssPropSupported(key, true)
        ? `${getBrowserPrefix()}${hyphenate(key)}`
        : hyphenate(key);
      if (isNil(value)) {
        removeStyle(el, propKey);
      } else {
        if (isTransform(key)) {
          transforms += `${key}(${value}) `;
        } else {
          let styleItem = `${propKey}: ${value};`;
          $divEl.style.cssText = styleItem;
          if ($divEl.style[key] === '' && isNumber(value)) {
            styleItem = `${propKey}: ${value}px;`;
          }
          css += styleItem;
        }
      }
    });
    if (transforms !== '') {
      css += `${getBrowserPrefix()}transform: ${transforms};`;
    }
    if (css !== '') {
      el.style.cssText += `;${css}`;
    }
    return getStyle();
  }
};

export default style;
