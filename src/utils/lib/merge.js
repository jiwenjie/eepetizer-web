"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = _interopRequireDefault(require("./type.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

var _isArray = _interopRequireDefault(require("./is-array.js"));

var _isUndefined = _interopRequireDefault(require("./is-undefined.js"));

var _safeGet = _interopRequireDefault(require("./safe-get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var merge = function merge(target) {
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  var mergeObject = function mergeObject(to, from) {
    var symbols = Object.getOwnPropertySymbols(from);

    for (var _i = 0, _Object$keys = Object.keys(from); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var toItem = (0, _safeGet["default"])(to, key);
      var fromItem = (0, _safeGet["default"])(from, key);

      if ((0, _isObject["default"])(fromItem) && !(0, _isUndefined["default"])(toItem)) {
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
          to[_key] = (0, _safeGet["default"])(from, _key);
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

    if ((0, _type["default"])(to) === (0, _type["default"])(from)) {
      if ((0, _isArray["default"])(to)) {
        return mergeArray(to, from);
      }

      if ((0, _type["default"])(to) === 'Object') {
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

var _default = merge;
exports["default"] = _default;