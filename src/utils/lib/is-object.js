"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _type = _interopRequireDefault(require("./type.js"));

var _isFunction = _interopRequireDefault(require("./is-function.js"));

var _isNil = _interopRequireDefault(require("./is-nil.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isObject = function isObject(val) {
  if ((0, _isNil["default"])(val)) {
    return false;
  }

  var ctor = val.constructor;

  if (!(0, _isFunction["default"])(ctor)) {
    return false;
  }

  var prot = ctor.prototype;

  if ((0, _type["default"])(prot) !== 'Object') {
    return false;
  }

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  return (0, _type["default"])(val) === 'Object';
};

var _default = isObject;
exports["default"] = _default;