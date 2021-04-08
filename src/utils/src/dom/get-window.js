import getDocument from '../dom/get-document.js';
import isDocument from '../test/is-document.js';

const getWindow = el => {
  return el && isDocument(el)
    ? el.defaultView || el.parentWindow
    : getWindow(getDocument(el));
};

export default getWindow;
