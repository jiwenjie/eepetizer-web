import isNil from '../test/is-nil.js';
import isObject from '../test/is-object.js';
import isArray from '../test/is-array.js';
import isString from '../test/is-string.js';

const isEmpty = val => {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  } else if (isObject(val)) {
    return Object.keys(val).length === 0;
  } else {
    return isNil(val);
  }
};

export default isEmpty;
