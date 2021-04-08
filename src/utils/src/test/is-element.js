import isWindow from '../test/is-window.js';
import isDocument from '../test/is-document.js';
import isNil from '../test/is-nil.js';

const isElement = el => {
  if (isNil(el)) {
    return false;
  }
  const div = document.createElement('div');
  try {
    div.appendChild(el.cloneNode(true));
    return el.nodeType === 1;
  } catch (e) {
    return isWindow(el) || isDocument(el);
  }
};

export default isElement;
