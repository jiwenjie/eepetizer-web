import type from '../test/type.js';
import isObject from '../test/is-object.js';
import isArray from '../test/is-array.js';
import isUndefined from '../test/is-undefined.js';
import safeGet from '../function/safe-get.js';

const merge = function(target) {
  const propIsEnumerable = Object.prototype.propertyIsEnumerable;
  const mergeObject = (to, from) => {
    const symbols = Object.getOwnPropertySymbols(from);
    for (const key of Object.keys(from)) {
      const toItem = safeGet(to, key);
      const fromItem = safeGet(from, key);
      if (isObject(fromItem) && !isUndefined(toItem)) {
        mergeObject(toItem, fromItem);
      } else {
        to[key] = fromItem;
      }
    }
    for (const key of symbols) {
      if (propIsEnumerable.call(from, key)) {
        to[key] = safeGet(from, key);
      }
    }
  };
  const mergeArray = (to, from) => {
    from.forEach(item => to.push(item));
  };
  const mergeOne = (to, from) => {
    if (to === from) {
      return to;
    }
    if (type(to) === type(from)) {
      if (isArray(to)) {
        return mergeArray(to, from);
      }
      if (type(to) === 'Object') {
        return mergeObject(to, from);
      }
    } else {
      return to;
    }
  };
  for (let i = 1; i < arguments.length; i++) {
    mergeOne(target, arguments[i]);
  }
  return target;
};

export default merge;
