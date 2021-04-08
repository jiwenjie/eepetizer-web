"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array-buffer.slice");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.typed-array.uint8-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

require("core-js/modules/es.weak-map");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = _interopRequireDefault(require("./type.js"));

var _isFunction = _interopRequireDefault(require("./is-function.js"));

var _hasOwn = _interopRequireDefault(require("./has-own.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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


  if ((0, _type["default"])(a) !== (0, _type["default"])(b)) {
    return false;
  }

  if (_typeof(a) === 'object') {
    var exist = stack.has(a);
    stack.set(a, b);

    if (exist) {
      return stack.get(a) === b;
    }
  }

  switch ((0, _type["default"])(a)) {
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

        if (aCtor !== bCtor && !((0, _isFunction["default"])(aCtor) && aCtor instanceof aCtor && (0, _isFunction["default"])(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
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

          if (!((0, _hasOwn["default"])(b, key) && eq(a[key], b[key], stack))) {
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


  if (/Array$/.test((0, _type["default"])(a))) {
    return compareSystem(a, b);
  } // TODO: WeakMap、WeakSet?


  return false;
};

var isEqual = function isEqual(a, b) {
  return eq(a, b);
};

var _default = isEqual;
exports["default"] = _default;