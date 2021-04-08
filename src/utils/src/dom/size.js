import isNull from '../test/is-null.js';
import style from '../dom/style.js';
import isWindow from '../test/is-window.js';
import isDocument from '../test/is-document.js';
import getWindow from '../dom/get-window.js';
import getDocument from '../dom/get-document.js';

const getSize = (el, attr, type) => {
  let size = 0;
  let cloneNode = null;
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
    size = getWindow(el)[`inner${attr}`];
  } else {
    let paddingSize =
      parseInt(style(el, 'padding-top')) +
      parseInt(style(el, 'padding-bottom'));
    if (isNaN(paddingSize)) {
      paddingSize = 0;
    }
    let marginSize =
      parseInt(style(el, 'margin-top')) + parseInt(style(el, 'margin-bottom'));
    if (isNaN(marginSize)) {
      marginSize = 0;
    }
    let borderSize =
      parseInt(style(el, 'border-top')) + parseInt(style(el, 'border-bottom'));
    if (isNaN(borderSize)) {
      borderSize = 0;
    }
    switch (type) {
      case 'inner':
        size = el[`offset${attr}`] - borderSize;
        break;
      case 'outer':
        size = el[`offset${attr}`];
        break;
      case 'box':
        size = el[`offset${attr}`] + marginSize;
        break;
      case 'scroll':
        size = el[`scroll${attr}`];
        break;
      default:
        size = el[`offset${attr}`] - paddingSize - borderSize;
    }
  }
  if (!isNull(cloneNode)) {
    getDocument(el).body.removeChild(cloneNode);
  }
  return size;
};

const width = (el, type) => getSize(el, 'Width', type);
const height = (el, type) => getSize(el, 'Height', type);

const size = (el, type) => {
  return {
    width: getSize(el, 'Width', type),
    height: getSize(el, 'Height', type)
  };
};

export { width, height };

export default size;
