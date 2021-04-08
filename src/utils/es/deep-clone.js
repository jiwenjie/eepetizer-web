import isObject from "./is-object.js";
import isArray from "./is-array.js";
import type from "./type.js";

var deepClone = function deepClone(val) {
  var map = new WeakMap();

  var clone = function clone(target) {
    var result = {};

    if (type(target) !== 'Object') {
      result = target;
    }

    if (isArray(target)) {
      result = [];
    }

    var keys = Object.keys(target);
    var temp = null;
    var existTarget = map.has(target);
    map.set(target, result);

    if (existTarget) {
      return map.get(target);
    }

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var key = _keys[_i];
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