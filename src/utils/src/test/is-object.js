import type from '../test/type.js';
import isFunction from '../test/is-function.js';
import isNil from '../test/is-nil.js';

const isObject = val => {
  if (isNil(val)) {
    return false;
  }
  const ctor = val.constructor;
  if (!isFunction(ctor)) {
    return false;
  }
  const prot = ctor.prototype;
  if (type(prot) !== 'Object') {
    return false;
  }
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }
  return type(val) === 'Object';
};

export default isObject;
