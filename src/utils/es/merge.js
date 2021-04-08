function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import type from "./type.js";
import isObject from "./is-object.js";
import isArray from "./is-array.js";
import isUndefined from "./is-undefined.js";
import safeGet from "./safe-get.js";

var merge = function merge(target) {
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  var mergeObject = function mergeObject(to, from) {
    var symbols = Object.getOwnPropertySymbols(from);

    for (var _i = 0, _Object$keys = Object.keys(from); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var toItem = safeGet(to, key);
      var fromItem = safeGet(from, key);

      if (isObject(fromItem) && !isUndefined(toItem)) {
        mergeObject(toItem, fromItem);
      } else {
        to[key] = fromItem;
      }
    }

    var _iterator = _createForOfIteratorHelper(symbols),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _key = _step.value;

        if (propIsEnumerable.call(from, _key)) {
          to[_key] = safeGet(from, _key);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var mergeArray = function mergeArray(to, from) {
    from.forEach(function (item) {
      return to.push(item);
    });
  };

  var mergeOne = function mergeOne(to, from) {
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

  for (var i = 1; i < arguments.length; i++) {
    mergeOne(target, arguments[i]);
  }

  return target;
};

export default merge;