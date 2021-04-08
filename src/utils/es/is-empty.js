import isNil from "./is-nil.js";
import isObject from "./is-object.js";
import isArray from "./is-array.js";
import isString from "./is-string.js";

var isEmpty = function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  } else if (isObject(val)) {
    return Object.keys(val).length === 0;
  } else {
    return isNil(val);
  }
};

export default isEmpty;