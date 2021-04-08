import type from "./type.js";
import isFunction from "./is-function.js";
import isNil from "./is-nil.js";

var isObject = function isObject(val) {
  if (isNil(val)) {
    return false;
  }

  var ctor = val.constructor;

  if (!isFunction(ctor)) {
    return false;
  }

  var prot = ctor.prototype;

  if (type(prot) !== 'Object') {
    return false;
  }

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  return type(val) === 'Object';
};

export default isObject;