"use strict";

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isNil = _interopRequireDefault(require("./is-nil.js"));

var _isObject = _interopRequireDefault(require("./is-object.js"));

var _isArray = _interopRequireDefault(require("./is-array.js"));

var _isString = _interopRequireDefault(require("./is-string.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isEmpty = function isEmpty(val) {
  if ((0, _isArray["default"])(val) || (0, _isString["default"])(val)) {
    return val.length === 0;
  } else if ((0, _isObject["default"])(val)) {
    return Object.keys(val).length === 0;
  } else {
    return (0, _isNil["default"])(val);
  }
};

var _default = isEmpty;
exports["default"] = _default;