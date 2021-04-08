import isObject from '../test/is-object.js';
import isArray from '../test/is-array.js';
import type from '../test/type.js';

const deepClone = val => {
  const map = new WeakMap();
  const clone = target => {
    let result = {};
    if (type(target) !== 'Object') {
      result = target;
    }
    if (isArray(target)) {
      result = [];
    }
    const keys = Object.keys(target);
    let temp = null;
    const existTarget = map.has(target);
    map.set(target, result);
    if (existTarget) {
      return map.get(target);
    }
    for (const key of keys) {
      temp = target[key];
      if (isObject(temp)) {
        result[key] = clone(temp);
      } else {
        result[key] = temp;
      }
    }
    return result;
  };
  return clone(val);
};

export default deepClone;
