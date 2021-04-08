function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import type from "./type.js";
import isFunction from "./is-function.js";
import hasOwn from "./has-own.js";

var convertArray = function convertArray(map) {
  var index = -1;
  var array = new Array(map.size);
  map.forEach(function (value, key) {
    array[++index] = [key, value];
  });
  return array;
};

var compareArray = function compareArray(a, b, stack) {
  var length = a.length;

  if (length !== b.length) {
    return false;
  } // Deep compare the contents, ignoring non-numeric properties.


  while (length--) {
    if (!eq(a[length], b[length], stack)) {
      return false;
    }
  }

  return true;
};

var compareSystem = function compareSystem(a, b) {
  if (a.byteLength !== b.byteLength || !compareArray(new Uint8Array(a), new Uint8Array(b))) {
    return false;
  }

  return true;
};

var eq = function eq(a, b) {
  var stack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new WeakMap();

  // +0,-0
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }

  if (a === b) {
    return true;
  } // NaN

  /* eslint-disable */


  if (a !== a) {
    return b !== b;
  }
  /* eslint-enable */


  if (type(a) !== type(b)) {
    return false;
  }

  if (_typeof(a) === 'object') {
    var exist = stack.has(a);
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
      return Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b);

    case 'Array':
      return compareArray(a, b, stack);

    case 'Object':
      {
        // Objects with different constructors
        var aCtor = a.constructor;
        var bCtor = b.constructor;

        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
          return false;
        } // deep compare


        var keys = Object.keys(a);
        var key;
        var length = keys.length;

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
  } // compare
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
  } // TODO: WeakMap、WeakSet?


  return false;
};

var isEqual = function isEqual(a, b) {
  return eq(a, b);
};

export default isEqual;