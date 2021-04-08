import hasClass from '../test/has-class.js';
import addClass from '../dom/add-class.js';
import removeClass from '../dom/remove-class.js';

const toggleClass = (el, cls) => {
  if (hasClass(el, cls)) {
    removeClass(el, cls);
  } else {
    addClass(el, cls);
  }
};

export default toggleClass;
