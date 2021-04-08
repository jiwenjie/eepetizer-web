import hasClass from "./has-class.js";
import addClass from "./add-class.js";
import removeClass from "./remove-class.js";

var toggleClass = function toggleClass(el, cls) {
  if (hasClass(el, cls)) {
    removeClass(el, cls);
  } else {
    addClass(el, cls);
  }
};

export default toggleClass;