import isNull from "./is-null.js";
import style from "./style.js";
import isWindow from "./is-window.js";
import isDocument from "./is-document.js";
import getWindow from "./get-window.js";
import getDocument from "./get-document.js";

var getSize = function getSize(el, attr, type) {
  var size = 0;
  var cloneNode = null;

  if (style(el, 'display') === 'none') {
    cloneNode = el.cloneNode(true);
    cloneNode.style.display = 'block';
    cloneNode.style.position = 'absolute';
    cloneNode.style.top = '-99999px';
    cloneNode.style.opacity = 0;
    getDocument(el).body.appendChild(cloneNode);
    el = cloneNode;
  }

  if (isWindow(el) || isDocument(el)) {
    size = getWindow(el)["inner".concat(attr)];
  } else {
    var paddingSize = parseInt(style(el, 'padding-top')) + parseInt(style(el, 'padding-bottom'));

    if (isNaN(paddingSize)) {
      paddingSize = 0;
    }

    var marginSize = parseInt(style(el, 'margin-top')) + parseInt(style(el, 'margin-bottom'));

    if (isNaN(marginSize)) {
      marginSize = 0;
    }

    var borderSize = parseInt(style(el, 'border-top')) + parseInt(style(el, 'border-bottom'));

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

  if (!isNull(cloneNode)) {
    getDocument(el).body.removeChild(cloneNode);
  }

  return size;
};

var width = function width(el, type) {
  return getSize(el, 'Width', type);
};

var height = function height(el, type) {
  return getSize(el, 'Height', type);
};

var size = function size(el, type) {
  return {
    width: getSize(el, 'Width', type),
    height: getSize(el, 'Height', type)
  };
};

export { width, height };
export default size;