"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/esnext.weak-map.delete-all");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("./is-object.js"));

var _isArray = _interopRequireDefault(require("./is-array.js"));

var _type = _interopRequireDefault(require("./type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var deepClone = function deepClone(val) {
  var map = new WeakMap();

  var clone = function clone(target) {
    var result = {};

    if ((0, _type["default"])(target) !== 'Object') {
      result = target;
    }

    if ((0, _isArray["default"])(target)) {
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

      if ((0, _isObject["default"])(temp)) {
        result[key] = clone(temp);
      } else {
        result[key] = temp;
      }
    }

    return result;
  };

  return clone(val);
};

var _default = deepClone;
exports["default"] = _default;