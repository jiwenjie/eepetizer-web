import isUndefined from '../test/is-undefined.js';

const removeStyle = (el, propKey) => {
  if (isUndefined(propKey)) {
    el.removeAttribute('style');
  }
  'removeProperty' in el.style
    ? el.style.removeProperty(propKey)
    : el.style.removeAttribute(propKey);
  if (el.getAttribute('style') === '') {
    el.removeAttribute('style');
  }
};

export default removeStyle;
