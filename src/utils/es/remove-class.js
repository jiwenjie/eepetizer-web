import hasClass from "./has-class.js";
import trim from "./trim.js";

var removeClass = function removeClass(el, cls) {
  var classes = cls.split(' ');
  var curClass = " ".concat(el.className, " ");

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];

    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" ".concat(clsName, " "), ' ');
    }
  }

  if (!el.classList) {
    el.className = trim(curClass);
  }
};

export default removeClass;