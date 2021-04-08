import isWindow from "./is-window.js";
import isDocument from "./is-document.js";
import isNil from "./is-nil.js";

var isElement = function isElement(el) {
  if (isNil(el)) {
    return false;
  }

  var div = document.createElement('div');

  try {
    div.appendChild(el.cloneNode(true));
    return el.nodeType === 1;
  } catch (e) {
    return isWindow(el) || isDocument(el);
  }
};

export default isElement;