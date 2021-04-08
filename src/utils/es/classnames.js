import isString from "./is-string.js";
import isNumber from "./is-number.js";
import isObject from "./is-object.js";
import isArray from "./is-array.js";
import hasOwn from "./has-own.js";

var classNames = function classNames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (!arg) {
      continue;
    }

    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    } else if (isArray(arg) && arg.length) {
      var inner = classNames.apply(null, arg);

      if (inner) {
        classes.push(inner);
      }
    } else if (isObject(arg)) {
      for (var key in arg) {
        if (hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

export default classNames;