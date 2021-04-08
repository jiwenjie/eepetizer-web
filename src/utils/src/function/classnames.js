import isString from '../test/is-string.js';
import isNumber from '../test/is-number.js';
import isObject from '../test/is-object.js';
import isArray from '../test/is-array.js';
import hasOwn from '../test/has-own.js';

const classNames = function() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (!arg) {
      continue;
    }

    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    } else if (isArray(arg) && arg.length) {
      const inner = classNames.apply(null, arg);
      if (inner) {
        classes.push(inner);
      }
    } else if (isObject(arg)) {
      for (const key in arg) {
        if (hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
};

export default classNames;
