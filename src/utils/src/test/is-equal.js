import type from '../test/type.js';
import isFunction from '../test/is-function.js';
import hasOwn from '../test/has-own.js';

const convertArray = map => {
  let index = -1;
  const array = new Array(map.size);
  map.forEach(function(value, key) {
    array[++index] = [key, value];
  });
  return array;
};

const compareArray = (a, b, stack) => {
  let length = a.length;
  if (length !== b.length) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (length--) {
    if (!eq(a[length], b[length], stack)) {
      return false;
    }
  }
  return true;
};

const compareSystem = (a, b) => {
  if (
    a.byteLength !== b.byteLength ||
    !compareArray(new Uint8Array(a), new Uint8Array(b))
  ) {
    return false;
  }
  return true;
};

const eq = (a, b, stack = new WeakMap()) => {
  // +0,-0
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  if (a === b) {
    return true;
  }
  // NaN
  /* eslint-disable */
  if (a !== a) {
    return b !== b;
  }
  /* eslint-enable */
  if (type(a) !== type(b)) {
    return false;
  }
  if (typeof a === 'object') {
    const exist = stack.has(a);
    stack.set(a, b);
    if (exist) {
      return stack.get(a) === b;
    }
  }
  switch (type(a)) {
    case 'RegExp':
    case 'String':
      return '' + a === '' + b;
    case 'Integer':
    case 'Float':
      // Number NaN
      /* eslint-disable */
      if (+a !== +a) {
        return +b !== +b;
      }
      /* eslint-enable */
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case 'Date':
    case 'Boolean':
      return +a === +b;
    case 'Symbol':
      return (
        Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b)
      );
    case 'Array':
      return compareArray(a, b, stack);
    case 'Object': {
      // Objects with different constructors
      const aCtor = a.constructor;
      const bCtor = b.constructor;
      if (
        aCtor !== bCtor &&
        !(
          isFunction(aCtor) &&
          aCtor instanceof aCtor &&
          isFunction(bCtor) &&
          bCtor instanceof bCtor
        ) &&
        'constructor' in a &&
        'constructor' in b
      ) {
        return false;
      }
      // deep compare
      const keys = Object.keys(a);
      let key;
      let length = keys.length;
      if (Object.keys(b).length !== length) {
        return false;
      }
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(hasOwn(b, key) && eq(a[key], b[key], stack))) {
          return false;
        }
      }
      return true;
    }
    case 'Set':
    case 'Map':
      return compareArray(convertArray(a), convertArray(b), stack);
    case 'ArrayBuffer':
      return compareSystem(a, b);
    case 'DataView':
      if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) {
        return false;
      }
      return compareSystem(a.buffer, b.buffer);
  }
  // compare
  // 'Float32Array'
  // 'Float64Array'
  // 'Int8Array'
  // 'Int16Array'
  // 'Int32Array'
  // 'Uint8Array'
  // 'Uint8ClampedArray'
  // 'Uint16Array'
  // 'Uint32Array'
  if (/Array$/.test(type(a))) {
    return compareSystem(a, b);
  }
  // TODO: WeakMap、WeakSet?
  return false;
};

const isEqual = (a, b) => eq(a, b);

export default isEqual;
