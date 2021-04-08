import isWindow from "./is-window.js";
import getWindow from "./get-window.js";
import isUndefined from "./is-undefined.js";
import getDocument from "./get-document.js";
import isObject from "./is-object.js";

var scroll = function scroll(el, type, val) {
  var win = getWindow(el);
  var isWin = isWindow(el);
  var doc = getDocument(el);

  if (isUndefined(val)) {
    if (isWin) {
      return 'pageYOffset' in win ? win.pageYOffset : doc.documentElement[type] || doc.body[type];
    } else if (el === doc.documentElement || el === doc.body) {
      return doc.documentElement[type] || doc.body[type];
    } else {
      return el[type];
    }
  } else {
    type = type === 'scrollTop' ? 'scrollLeft' : 'scrollTop';
    var x = isObject(val) ? val.x : 0;
    var y = isObject(val) ? val.y : val;

    if (isWin || el === doc.documentElement || el === doc.body) {
      win.scrollTo(x, y);
    } else {
      el[type] = val;
    }

    return val;
  }
};

var scrollTop = function scrollTop(el, val) {
  return scroll(el, 'scrollTop', val);
};

var scrollLeft = function scrollLeft(el, val) {
  return scroll(el, 'scrollLeft', val);
};

export { scrollTop, scrollLeft };
export default scroll;