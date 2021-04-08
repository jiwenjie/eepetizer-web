import isWindow from '../test/is-window.js';
import getWindow from '../dom/get-window.js';
import isUndefined from '../test/is-undefined.js';
import getDocument from '../dom/get-document.js';
import isObject from '../test/is-object.js';

const scroll = (el, type, val) => {
  const win = getWindow(el);
  const isWin = isWindow(el);
  const doc = getDocument(el);
  if (isUndefined(val)) {
    if (isWin) {
      return 'pageYOffset' in win
        ? win.pageYOffset
        : doc.documentElement[type] || doc.body[type];
    } else if (el === doc.documentElement || el === doc.body) {
      return doc.documentElement[type] || doc.body[type];
    } else {
      return el[type];
    }
  } else {
    type = type === 'scrollTop' ? 'scrollLeft' : 'scrollTop';
    const x = isObject(val) ? val.x : 0;
    const y = isObject(val) ? val.y : val;
    if (isWin || el === doc.documentElement || el === doc.body) {
      win.scrollTo(x, y);
    } else {
      el[type] = val;
    }
    return val;
  }
};

const scrollTop = (el, val) => scroll(el, 'scrollTop', val);
const scrollLeft = (el, val) => scroll(el, 'scrollLeft', val);

export { scrollTop, scrollLeft };

export default scroll;
