import isUndefined from "./is-undefined.js";

var removeStyle = function removeStyle(el, propKey) {
  if (isUndefined(propKey)) {
    el.removeAttribute('style');
  }

  'removeProperty' in el.style ? el.style.removeProperty(propKey) : el.style.removeAttribute(propKey);

  if (el.getAttribute('style') === '') {
    el.removeAttribute('style');
  }
};

export default removeStyle;